<template>
  <div>
    <h1>Job List</h1>
    <div class="row">
      <div v-for="job in joblist.jobs" :key="job.id" class="col-md-4">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">{{ job.title }}</h5>
            <p class="card-text">{{ job.description }}</p>
            <button class="btn btn-primary">View Details</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import the JobStore
import { JobStore } from '../../store/modules/JobStore';

export default {
  name: 'JobList',
  
  data: () => ({
    joblist: JobStore(),
  }),

  async created() {
    // Call the getJobs action with pagination parameters
    await this.joblist.getJobs({ page: 1, limit: 6 });
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
