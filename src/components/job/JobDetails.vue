<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card">
          <div class="card-body">
            <img :src="job.logo" alt="Company Logo" class="img-fluid mb-3">
            <h2>{{ job.title }}</h2>
            <p><strong>Description:</strong> {{ job.description }}</p>
            <p><strong>Responsibilities:</strong> {{ job.responsibilities }}</p>
            <p><strong>Skills:</strong> {{ job.skills }}</p>
            <p><strong>Qualifications:</strong> {{ job.qualifications }}</p>
            <p><strong>Salary Range:</strong> {{ job.salary_range }}</p>
            <p><strong>Benefits:</strong> {{ job.benefits }}</p>
            <p><strong>Location:</strong> {{ job.location }}</p>
            <p><strong>Work Type:</strong> {{ job.work_type }}</p>
            <p><strong>Application Deadline:</strong> {{ job.application_deadline }}</p>
            <p><strong>Status:</strong> {{ job.status }}</p>
            <p><strong>Created At:</strong> {{ job.created_at }}</p>
            <p><strong>Updated At:</strong> {{ job.updated_at }}</p>
            <button class="btn btn-primary" @click="goBack">Back to Job List</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <script>
export default {
  name: 'JobDetails',
  props: {
    job: {
      type: Object,
      required: true
    }
  },
  methods: {
    goBack() {
      this.$router.push('/job-list');
    }
  }
};
</script> -->
<!-- <script>
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
</script> -->
<script>
import { JobStore } from '../../store/modules/JobStore';

export default {
  name: 'JobDetails',
  data() {
    return {
      job: null
    };
  },
  methods: {
    async getJobDetails() {
      // Get the id parameter from the route
      const id = this.$route.params.id;
      // Call the getJob action with the id parameter
      this.job = await JobStore().getJob(id);
    },
    goBack() {
      // Navigate back to the job list page
      this.$router.push({ path: '/jobs' });
    }
  },
  created() {
    // Call the getJobDetails method when the component is created
    this.getJobDetails();
  }
};
</script>

<style scoped>
.card {
  margin-top: 20px;
}
</style>
