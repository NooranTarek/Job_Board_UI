<template>
  <div>
    <div v-if="!loading" class="container mt-5">
      <div class="col-md-12">
        <div
          v-if="filteredApplications && filteredApplications.length > 0"
          class="panel panel-default"
        >
          <div class="panel-body">
            <table class="table table-condensed table-striped">
              <thead>
                <tr>
                  <th>Logo</th>
                  <th>Title</th>
                  <th>View Application</th>
                  <th>Deadline</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(application, index) in filteredApplications" :key="application.id">
                  <td>
                    <img
                      :src="application.job_listings.logo"
                      :style="{ width: '100px', height: 'auto' }"
                      alt
                    />
                  </td>
                  <td>{{ application.job_listings.title }}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      @click="openResume(application.resume)"
                    >View Resume</button>
                  </td>
                  <td>{{ application.job_listings.application_deadline }}</td>
                  <td>
                    <button
                      class="btn btn-success mx-1"
                      @click="approveResume('approved',application.id)"
                    >Approve</button>
                    <button
                      class="btn btn-danger"
                      @click="rejectResume('rejected',application.id)"
                    >Reject</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else class="text-center mt-5">
          <p class="text-muted">There are currently no applications to monitor.</p>
        </div>
      </div>
    </div>
    <div v-else class="d-flex justify-content-center align-items-center" style="height: 100vh;">
      <div class="spinner-grow text-primary" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useUserStore } from "../../store/modules/UserProfilePinia";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  data() {
    return {
      loading: true,
      data: {
        applications: []
      }
    };
  },
  methods: {
    async getEmployerApplications() {
      try {
        const id = this.$route.params.id;
        const response = await useUserStore().getEmployerApplications(id);
        this.data = response.data;
        this.loading = false;
        console.log(this.data);
      } catch (error) {
        console.error("Error fetching employer applications", error);
        this.loading = false;
      }
    },
    async approveResume(status, application_id) {
      try {
        await useUserStore().modifyApplicationStatus(status, application_id);
        toast.success("Application approved");
        const index = this.data.applications.findIndex(
          application => application.id === application_id
        );
        if (index !== -1) {
          this.data.applications.splice(index, 1);
        }
      } catch (error) {
        console.error("Error while accepting the resume", error);
        toast.error("Error while accepting the application");
      }
    },
    async rejectResume(status, application_id) {
      try {
        await useUserStore().modifyApplicationStatus(status, application_id);
        toast.info("Application rejected");
        const index = this.data.applications.findIndex(
          application => application.id === application_id
        );
        if (index !== -1) {
          this.data.applications.splice(index, 1);
        }
      } catch (error) {
        console.error("Error while rejecting the resume", error);
        toast.error("Error while rejecting the application");
      }
    },
    openResume(resumeUrl) {
      window.open(resumeUrl, "_blank");
    }
  },
  computed: {
    filteredApplications() {
      return this.data.applications.filter(
        application => application.status === "pending"
      );
    }
  },
  created() {
    this.getEmployerApplications();
  }
};
</script>

<style scoped>
</style>
