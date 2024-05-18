<template>
  <div>
    <ul>
      <div class="jobbox" v-for="job in joblist.jobs" :key="job.id">
        <div class="job-card">
          <div class="job-header">{{ job.title }}</div>
          <div class="job-details">
            <p><strong>Description:</strong> {{ job.description }}</p>
            <p><strong>Application Deadline:</strong> {{ job.application_deadline }}</p>
            
            <p class="readmore" @click="job.showDetails = !job.showDetails">
              {{ job.showDetails ? 'Show Less' : 'Read More' }}
            </p>
            
            <div v-if="job.showDetails">
              <p><strong>Responsibilities:</strong> {{ job.responsibilities }}</p>
              <p><strong>Skills:</strong> {{ job.skills }}</p>
              <p><strong>Qualifications:</strong> {{ job.qualifications }}</p>
              <p><strong>Salary Range:</strong> ${{ job.salary_range }}</p>
              <p><strong>Benefits:</strong> {{ job.benefits }}</p>
              <p><strong>Location:</strong> {{ job.location }}</p>
              <p><strong>Work Type:</strong> {{ job.work_type }}</p>
            </div>

            <div v-if="job.status === 'pending'">
              <button class="btn btn-success mx-2" @click="approveJob(job)">Approve</button>
              <button class="btn btn-danger mx-2" @click="removeJob(job)">Reject</button>
            </div>
            <div v-else-if="job.status === 'approved'">
              <h6 class="text-success">
                <font-awesome-icon :icon="['fas', 'check']" />
                Approved
              </h6>
            </div>
            <div v-else-if="job.status === 'rejected'">
              <h6 class="text-danger">
                <font-awesome-icon :icon="['fas', 'xmark']" />
                Rejected
              </h6>
            </div>
          </div>
        </div>
      </div>
    </ul>
    <div v-if="totalCount > 0">
            <Pagination :currentPage="currentPage" :totalPages="totalPages" :totalCount="totalCount"
              @page-changed="handlePageChange" />
          </div>
  </div>
</template>

  
<script>
import { JobStore } from '../../../store/modules/JobStore';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck ,faXmark} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Pagination from '../../reusable/Pagination.vue';

library.add(faCheck,faXmark);

export default {
  components: {
    FontAwesomeIcon,
    Pagination
},
  data: () => ({
    joblist: JobStore(),
    limit: 10,
      currentPage: 1,
      totalPages: 0,
      totalCount: 0,
      loading:false
  }),
  async beforeMount() {
    await this.searchJobs();
  },
  methods: {
    async approveJob(job) {
      try {
        job.status = 'approved';
        await this.joblist.changeJobStatus(job.id, job); 
        await this.searchJobs();
      } catch (error) {
        console.error('Error approving job:', error);
      }
    },

    async removeJob(job) {
      try {
        job.status = 'rejected';
        await this.joblist.changeJobStatus(job.id, job); 
        await this.searchJobs();
      } catch (error) {
        console.error('Error rejecting job:', error);
      }
    },
    async handlePageChange(page) {
      this.currentPage = page;
      await this.searchJobs();
    },
    async searchJobs() {
      this.loading = true;
      try {
        let params = { page: this.currentPage, limit: this.limit };
        params.filters = {};

        const token = localStorage.getItem("token");
          await this.joblist.getJobs(params);

        this.currentPage = this.joblist.currentPage;
        this.totalPages = this.joblist.totalPages;
        this.totalCount = this.joblist.totalCount;
      } catch (error) {
        console.error("Error searching for jobs:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
  
  <style scoped>

  .jobbox{
    margin: 30px;
    box-shadow: 3px 3px 10px 10px rgb(247, 247, 247);
    padding: 20px;
    border-radius: 15px;
  }

  .readmore{
    cursor: pointer;
    color: rgb(0, 146, 214);
  }

  
  </style>
  
  