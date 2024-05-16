<template>
  <div class="container-fluid">
    <div class="row pt-3 px-5">
      <!-- Input fields -->
      <div class="inputFields col-lg-6 col-xl-3 ps-5">
        <div class="p-5 bg-body-emphasis border rounded-3 shadow-sm my-2">
          <div class="gx-5 gy-3">
            <h4 class="text-info-emphasis">Search</h4>
            <div class="searchArea p-5 border rounded-3">
              <input type="text" class="form-control mb-3" placeholder="Search term" v-model="searchTerm"
                @input="searchJobs" />
              <span class="d-block mb-2">Search by:</span>
              <select class="form-select" v-model="searchBy" @change="searchJobs">
                <option v-for="field in searchFields" :value="field">
                  {{ field }}
                </option>
              </select>
              <!-- Add more content here if needed -->
            </div>
          </div>

          <div class="gx-5 gy-3 pt-5">
            <h4 class="text-info-emphasis">Filters</h4>
            <div class="searchArea p-5 border rounded-3">
              <span class="d-block mb-2">Work Place:</span>
              <select class="form-select" v-model="workPlace" @change="searchJobs">
                <option value="" selected>Unselected</option>
                <option value="remote">Remote</option>
                <option value="on-site">On-site</option>
                <option value="hybrid">Hybrid</option>
              </select>
              <!-- Add more content here if needed -->
            </div>
          </div>
        </div>
      </div>

      <!-- Display job list or loading indicator -->
      <div v-if="loading">Loading...</div>
      <div v-else class="col-lg-6 col-xl-9">
        <div class="row g-3">
          <div v-for="job in joblist.jobs" :key="job.id" class="col-md-12 mt-3 overflow-hidden">
            <div class="card mb-4 px-5" style="
                height: 100%;
                width: 90%;
                margin: 10px auto;
                box-shadow: 3px 3px 3px 5px #f3f3f3;
              ">
              <div class="card-body d-flex flex-column">
                <div v-show="specifyRole('candidate')" class="row align-items-center my-0">
                  <div class="col-10">
                    <!-- Wrap the title within the same router-link -->
                    <router-link :to="{
                      name: 'CandidateJobDetails',
                      params: { id: job.id },
                    }" class="text-decoration-none text-black">
                      <h2 class="card-title text-primary" style="font-size: 25px">
                        {{ job.title }}
                      </h2>
                    </router-link>
                  </div>
                  <div class="col-2 overflow-hidden" style="text-align: center">
                    <!-- Wrap the logo within the router-link -->
                    <router-link :to="{
                      name: 'CandidateJobDetails',
                      params: { id: job.id },
                    }"
                    class=""
                    >
                      <img :src="job.logo" alt="Company Logo" style="width: 150px; height: 150px"
                        class="rounded-circle pe-5" />
                    </router-link>
                  </div>
                </div>
                <div v-show="specifyRole('employer')" class="row align-items-center my-0">
                  <div class="col-10">
                    <!-- Wrap the title within the same router-link -->
                    <router-link :to="{
                      name: 'EmployerJobDetails',
                      params: { id: job.id },
                    }" class="text-decoration-none text-black">
                      <h5 class="card-title text-primary" style="font-size: 25px">
                        {{ job.title }}
                      </h5>
                    </router-link>
                  </div>
                  <div class="col-2 overflow-hidden">
                    <!-- Wrap the logo within the router-link -->
                    <router-link :to="{
                      name: 'EmployerJobDetails',
                      params: { id: job.id },
                    }"
                    class=""
                    >
                      <img :src="job.logo" alt="Company Logo" style="width: 150px; height: 150px"
                        class="rounded-circle pe-5" />
                    </router-link>
                  </div>
                </div>
                <div class="flex-grow-1 my-0">
                  <!-- <p class="card-text"><strong>Description:</strong> {{ job.description }}</p> -->
                  <!-- <p class="card-text"><strong>Responsibilities:</strong> {{ job.responsibilities }}</p> -->
                  <p class="card-text">
                    <strong>Skills:</strong> {{ job.skills }}
                  </p>
                  <!-- <p class="card-text"><strong>Qualifications:</strong> {{ job.qualifications }}</p> -->
                  <p class="card-text">
                    <strong>Salary Range:</strong> {{ job.salary_range }} $
                  </p>
                  <!-- <p class="card-text"><strong>Benefits:</strong> {{ job.benefits }}</p> -->
                  <p class="card-text">
                    <strong>Location:</strong> {{ job.location }}
                  </p>
                  <p class="card-text">
                    <strong>Work Type:</strong> {{ job.work_type }}
                  </p>
                  <div style="
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                    ">
                    <div>
                      <p class="card-text mb-0">
                        <strong>Application Deadline:</strong>
                        {{ job.application_deadline.slice(0, 10) }}
                      </p>
                    </div>

                    <div>
                      <div>
                        <router-link v-show="specifyRole('candidate')" style="width: 150px" :to="{
                          name: 'CandidateJobDetails',
                          params: { id: job.id },
                        }" class="btn btn-primary mt-auto mb-1">View Details</router-link>
                      </div>
                      <div class="d-flex justify-content-between" style="width: 220px">
                        <div class="col-6 pe-1">
                          <router-link v-show="specifyRole('employer')"
                            :to="{ name: 'updateJob', params: { id: job.id } }"
                            class="w-100 btn btn-info mt-auto mb-1">Update</router-link>
                        </div>
                        <div class="col-6 ps-1">
                          <button v-show="specifyRole('employer')" class="w-100 btn btn-danger mt-auto mb-1"
                            @click="deleteJob(job.id)">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <p class="card-text"><strong>Status:</strong> {{ job.status }}</p> -->
                  <!-- <p class="card-text"><strong>Created At:</strong> {{ job.created_at.slice(0, 10) }}</p>
                <p class="card-text"><strong>Updated At:</strong> {{ job.updated_at.slice(0, 10) }}</p>                     -->
                </div>
                <!-- <button class="btn btn-primary mt-auto">View Details</button> -->

                <!-- <router-link v-show="specifyRole('employer')" :to="{ name: 'EmployerJobDetails', params: { id: job.id } }" class="btn btn-primary mt-auto mb-1">View Details</router-link> -->
              </div>
            </div>
          </div>

          <div v-if="totalCount > 0">
            <Pagination :currentPage="currentPage" :totalPages="totalPages" :totalCount="totalCount"
              @page-changed="handlePageChange" />
          </div>
          <div v-else class="row py-3">
            <div class="col-md-12">
              <div class="alert alert-warning" role="alert">
                No results found.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { JobStore } from "../../store/modules/JobStore";
import Pagination from "../reusable/Pagination.vue";
import { useUserStore } from "../../store/modules/UserProfilePinia";

export default {
  name: "JobSearch",

  components: {
    Pagination,
  },

  data() {
    return {
      loggedUser: null,
      joblist: JobStore(),
      searchTerm: "",
      searchBy: "title",
      loading: false,
      searchFields: [],
      workPlace: "",
      limit: 8,
      currentPage: 1,
      totalPages: 0,
      totalCount: 0,
    };
  },

  methods: {
    specifyRole(role) {
      if (role === localStorage.getItem("role")) return true;
      else if (role === "any" && localStorage.getItem("token")) return true;
      return false;
    },
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
          const excludedFields = ["id", "logo", "user_id", "work_type"];
          this.searchFields = allFields.filter(
            (field) => !excludedFields.includes(field)
          );
        }
      } catch (error) {
        console.error("Error fetching searchFields:", error);
      }
    },

    async searchJobs() {
      this.loading = true;
      try {
        let params = { page: this.currentPage, limit: this.limit };
        params.filters = {};

        const token = localStorage.getItem("token");

        if (this.specifyRole("employer") && token) {
          // console.log(`Employer: ${token}`);
          const loggedUser = await useUserStore().fetchUser();
          if (loggedUser) {
            params.filters.user_id = loggedUser.id;
          }
        }

        if (this.specifyRole("candidate") && token) {
          params.filters.status = "approved";
        }

        if (this.searchTerm.trim() === "") {
          // If searchTerm is empty, fetch all jobs
          // console.log(`params.filters:`, params.filters);

          if (this.workPlace !== "") {
            params.filters.work_type = this.workPlace;
          }

          await this.joblist.getJobs(params);
        } else {
          // If searchTerm is not empty, perform search based on searchTerm and searchBy
          // console.log(`Searching = '${this.searchTerm}' by '${this.searchBy}'`);

          if (this.workPlace !== "") {
            params.filters.work_type = this.workPlace;
          }

          await this.joblist.getJobs({
            ...params,
            searchField: this.searchBy,
            search: this.searchTerm,
          });
        }

        this.currentPage = this.joblist.currentPage;
        this.totalPages = this.joblist.totalPages;
        this.totalCount = this.joblist.totalCount;
      } catch (error) {
        console.error("Error searching for jobs:", error);
      } finally {
        this.loading = false;
      }
    },

    async deleteJob(jobId) {
      try {
        const confirmed = confirm("Are you sure you want to delete this job?");
        if (!confirmed) {
          return;
        }

        await this.joblist.deleteJob(jobId);
        this.searchJobs();
      } catch (error) {
        console.error("Error deleting job:", error);
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

  async created() {
    this.searchJobs();
    this.fetchSearchFields();
    this.loggedUser = await useUserStore().fetchUser();
    // console.log(`loggedUser: ${this.loggedUser}`);
    // console.log(`user_id: ${this.loggedUser.id}`);
  },
};
</script>

<style scoped>
.card {
  border-radius: 5px;
  border: 0px;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.card-text {
  margin-bottom: 0.5rem;
}
</style>
