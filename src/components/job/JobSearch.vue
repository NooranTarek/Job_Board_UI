<template>
  <div class="container-fluid">
    <h1>Job Search</h1>

    <div class="row">
      <div class="col-md-6">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search term" v-model="searchTerm" @input="searchJobs">
          <div class="input-group-append rounded-0">
            <span class="input-group-text rounded-0">Search by:</span>
          </div>
          <select class="form-select" v-model="searchBy" @change="searchJobs">
            <option v-for="field in searchFields" :value="field">{{ field }}</option>
          </select>
        </div>
      </div>
    </div>
    <!-- Display job list or loading indicator -->
    <div v-if="loading">Loading...</div>
    <div v-else>
      <!-- <JobList :jobs="jobs" /> -->
      <div class="row g-3 ">
        <div v-for="job in joblist.jobs" :key="job.id" class="col-md-4">
          <div class="card mb-4" style="height: 100%;">
            <div class="card-body d-flex flex-column">
              <div class="row align-items-center">
                <div class="col-2">
                  <img :src="job.logo" alt="Company Logo" style="width: 70px; height: 70px;" class="rounded-circle">
                </div>
                <div class="col-10">
                  <h5 class="card-title">{{ job.title }}</h5>
                </div>
              </div>
              <div class="flex-grow-1">
                <p class="card-text"><strong>Description:</strong> {{ job.description }}</p>
                <p class="card-text"><strong>Responsibilities:</strong> {{ job.responsibilities }}</p>
                <p class="card-text"><strong>Skills:</strong> {{ job.skills }}</p>
                <p class="card-text"><strong>Qualifications:</strong> {{ job.qualifications }}</p>
                <p class="card-text"><strong>Salary Range:</strong> {{ job.salary_range }}</p>
                <p class="card-text"><strong>Benefits:</strong> {{ job.benefits }}</p>
                <p class="card-text"><strong>Location:</strong> {{ job.location }}</p>
                <p class="card-text"><strong>Work Type:</strong> {{ job.work_type }}</p>
                <p class="card-text"><strong>Application Deadline:</strong> {{ job.application_deadline }}</p>
                <!-- <p class="card-text"><strong>Status:</strong> {{ job.status }}</p> -->
                <p class="card-text"><strong>Created At:</strong> {{ job.created_at.slice(0, 10) }}</p>
                <p class="card-text"><strong>Updated At:</strong> {{ job.updated_at.slice(0, 10) }}</p>                    
              </div>
              <!-- <button class="btn btn-primary mt-auto">View Details</button> -->
              <router-link :to="{ name: 'JobDetails', params: { id: job.id } }" class="btn btn-primary mt-auto">View Details</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="totalCount>0">
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        :totalCount="totalCount"
        @page-changed="handlePageChange"
      />
    </div>
    <div v-else class="row py-3">
      <div class="col-md-12">
        <div class="alert alert-warning" role="alert">
          No results found.
        </div>
      </div>
    </div>

  </div>
</template>
    

    <script>
    import { ref } from 'vue';
    import { JobStore } from '../../store/modules/JobStore';
    import Pagination from '../reusable/Pagination.vue';
    
    export default {
      name: 'JobSearch',

      components: {
        Pagination
      },

      data() {
        return {
          joblist: JobStore(),
          searchTerm: '',
          searchBy: 'title',
          loading: false,
          searchFields: [],
          limit: 3,
          currentPage: 1,
          totalPages: 0,
          totalCount: 0
        };
      },
    
      methods: {
        async handlePageChange(page) {
          this.currentPage = page;
          await this.searchJobs();
        },
        async fetchSearchFields() {
          try {
            // Fetch the jobs data to get searchFields
            await this.joblist.getFirstJob();
            const firstJob = this.joblist.firstJob;
            if (firstJob) {
              const allFields = Object.keys(firstJob); // Extract all fields from the first job object
              // Exclude specific fields like "id"
              const excludedFields = ['id', 'logo', 'user_id'];
              this.searchFields = allFields.filter(field => !excludedFields.includes(field));
            }
          } catch (error) {
            console.error('Error fetching searchFields:', error);
          }
        },
      
        async searchJobs() {
          this.loading = true;
          try {

            if (this.searchTerm.trim() === '') {
              // If searchTerm is empty, fetch all jobs
              await this.joblist.getJobs({ page: this.currentPage, limit: this.limit });
            } else {
              // If searchTerm is not empty, perform search based on searchTerm and searchBy
              console.log(`Searching = '${this.searchTerm}' by '${this.searchBy}'`);
              await this.joblist.getJobs({ page: this.currentPage, limit: this.limit, searchField: this.searchBy, search: this.searchTerm });
            }

            this.currentPage = this.joblist.currentPage;
            this.totalPages = this.joblist.totalPages;
            this.totalCount = this.joblist.totalCount;
            // console.log(`totalPages==========================: ${this.totalPages}`);

          } catch (error) {
            console.error('Error searching for jobs:', error);
          } finally {
            this.loading = false;
          }
        },

      },
    
      // watch: {
      //   searchTerm: 'searchJobs',
      //   searchBy: 'searchJobs',
      // },
      watch: {
        searchTerm(newValue, oldValue) {
          if (newValue !== oldValue) {
            this.currentPage = 1;
            this.searchJobs();
          }
        },
        searchBy(newValue, oldValue) {
          if (newValue !== oldValue) {
            this.currentPage = 1;
            this.searchJobs();
          }
        },
      },
    
      created() {
        this.searchJobs();
        this.fetchSearchFields();
      },
    };
    </script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 5px;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.card-text {
  margin-bottom: 1rem;
}
</style>
