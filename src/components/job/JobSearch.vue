<template>
  <div class="container-fluid">
    <h1>Job Search</h1>
    <input type="text" v-model="searchTerm" @input="searchJobs">
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
                <p class="card-text"><strong>Status:</strong> {{ job.status }}</p>
                <p class="card-text"><strong>Created At:</strong> {{ job.created_at }}</p>
                <p class="card-text"><strong>Updated At:</strong> {{ job.updated_at }}</p>
              </div>
              <!-- <button class="btn btn-primary mt-auto">View Details</button> -->
              <router-link :to="{ name: 'JobDetails', params: { id: job.id } }" class="btn btn-primary mt-auto">View Details</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { JobStore } from '../../store/modules/JobStore';
import JobList from "../job/JobList.vue";

export default {
  name: 'JobSearch',
  components: {
    JobList
  },
  setup() {
    const searchTerm = ref('');
    const loading = ref(false);
    const joblist = JobStore();

    const searchJobs = async () => {
      loading.value = true;
      try {
        await joblist.getJobs({ page: 1, limit: 6, search: searchTerm.value });
      } catch (error) {
        console.error('Error searching for jobs:', error);
      } finally {
        loading.value = false;
      }
    };

    return {
      searchTerm,
      loading,
      searchJobs
    };
  }
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
