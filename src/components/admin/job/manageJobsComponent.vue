<template>
    <div>
      <h2>Manage Jobs</h2>
      <ul>
        <li v-for="job in joblist.jobs" :key="job.id">
          <div class="job-card">
            <div class="job-header">{{ job.title }}</div>
            <div class="job-details">
              <p><strong>Description:</strong> {{ job.description }}</p>
              <p><strong>Description:</strong> {{ job.description }}</p>
              <p><strong>Responsibilities:</strong> {{ job.responsibilities }}</p>
              <p><strong>Skills:</strong> {{ job.skills }}</p>
              <p><strong>Qualifications:</strong> {{ job.qualifications }}</p>
              <p><strong>Salary Range:</strong> ${{ job.salary_range }}</p>
              <p><strong>Benefits:</strong> {{ job.benefits }}</p>
              <p><strong>Location:</strong> {{ job.location }}</p>
              <p><strong>Work Type:</strong> {{ job.work_type }}</p>
              <p><strong>Application Deadline:</strong> {{ job.application_deadline }}</p>
              <div v-if="job.status=== 'pending'">
                <button class="btn btn-success mx-2" @click="approveJob(job)">Approve</button>
                <button class="btn btn-danger mx-2" @click="removeJob(job)">Reject</button>
              </div>
              <div v-else-if="job.status=== 'approved'">
                <h6 class="text-success">
                    <font-awesome-icon :icon="['fas', 'check']" />
                    Approved
                </h6>
              </div>
              <div v-else="job.status=== 'rejected'">
                <h6 class="text-danger">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                    Rejected
                </h6>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
import { JobStore } from '../../../store/modules/JobStore';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck ,faXmark} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCheck,faXmark);

export default {
  components: {
    FontAwesomeIcon,
  },
  data: () => ({
    joblist: JobStore(),
  }),
  async beforeMount() {
    await this.joblist.getAllJobs();
  },
  methods: {
    async approveJob(job) {
      try {
        job.status = 'approved';
        await this.joblist.changeJobStatus(job.id, job); 
        await this.joblist.getAllJobs();
      } catch (error) {
        console.error('Error approving job:', error);
      }
    },

    async removeJob(job) {
      try {
        job.status = 'rejected';
        await this.joblist.changeJobStatus(job.id, job); 
        await this.joblist.getAllJobs();
      } catch (error) {
        console.error('Error rejecting job:', error);
      }
    },
  },
};
</script>
  
  <style scoped>
  .job-card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .job-header {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .job-details p {
    margin: 5px 0;
  }
  
  </style>
  
  