<template>
  <div class="container">
  <div v-if="loaded==false" style="text-align: center;">
    <button style="margin: 30px auto;" class="btn btn-primary" type="button" disabled>
        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            Loading...
        </button>
  </div>
    <div class="row" v-else>
      <div v-if="job" class="col-md-8">
        <div class="card">
          <div class="card-body">
            <img :src="job.logo" alt="Company Logo" class="img-fluid mb-3" />
            <h2>{{ job.title }}</h2>
            <p><strong>Description:</strong> {{ job.description }}</p>
            <p><strong>Responsibilities:</strong> {{ job.responsibilities }}</p>
            <p><strong>Skills:</strong> {{ job.skills }}</p>
            <p><strong>Qualifications:</strong> {{ job.qualifications }}</p>
            <p><strong>Salary Range:</strong> {{ job.salary_range }}</p>
            <p><strong>Benefits:</strong> {{ job.benefits }}</p>
            <p><strong>Location:</strong> {{ job.location }}</p>
            <p><strong>Work Type:</strong> {{ job.work_type }}</p>
            <p class="card-text">
              <strong>Application Deadline:</strong>
              {{ job.application_deadline.slice(0, 10) }}
            </p>
            <!-- <p><strong>Status:</strong> {{ job.status }}</p> -->
            <p class="card-text">
              <strong>Created At:</strong> {{ job.created_at.slice(0, 10) }}
            </p>
            <p class="card-text">
              <strong>Updated At:</strong> {{ job.updated_at.slice(0, 10) }}
            </p>
            <div class="d-flex justify-content-between">
              <button
                v-show="specifyRole('employer')"
                class="btn btn-danger mt-auto mb-1 mx-2"
                @click="deleteJobById(job.id)"
              >
                Delete Job
              </button>
              <button class="btn btn-primary mx-2" @click="goBack">
                Back to Job List
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        v-show="specifyRole('candidate')"
        v-if="!userApplied"
        class="col-md-4 applyform"
      >
        <h3>Apply for the job</h3>
        <form @submit.prevent="createApllication">
          <label for="email">Email</label>
          <input
            type="email"
            v-model="email"
            required
            id="email"
            class="form-control mt-2"
            name="email"
            placeholder="Enter your email"
          />

          <label for="phoneNumber">Phone Number</label>
          <input
            type="text"
            v-model="phoneNumber"
            required
            id="phoneNumber"
            class="form-control mt-2"
            name="phoneNumber"
            placeholder="Enter your phone number"
          />

          <label for="resume">Upload your resume</label>
          <div class="custom-file mt-2">
            <input
              required
              @change="handleFileChange"
              type="file"
              id="resume"
              name="resume"
              class="custom-file-input"
            />
            <label class="custom-file-label" for="resume">{{
              resumeName || "Choose file"
            }}</label>
          </div>
          <button class="btn btn-dark mt-3 w-100">Apply</button>
        </form>
      </div>

      <div v-else class="col-md-4">
        <div class="alert alert-secondary" style="margin-top: 20px">
          you have applied for this job &nbsp;
          <font-awesome-icon :icon="['fas', 'check']" style="color: green" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { JobStore } from "../../store/modules/JobStore";
import { useUserStore } from "../../store/modules/UserProfilePinia";
import axiosInstance from "../../axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { toast } from "vue3-toastify";

export default {
  name: "JobDetails",
  setup() {
    const userStore = useUserStore();
    userStore.fetchUser();
    // Return userStore, user, and Vuelidate instance
    return { userStore, user: userStore.user };
  },
  data() {
    return {
      job: null,
      userApplied: false,
      email: "",
      phoneNumber: "",
      resume: null,
      resumeName: "",
      loaded:false
    };
  },
  methods: {
    specifyRole(role) {
      if (role === localStorage.getItem("role")) return true;
      else if (role === "any" && localStorage.getItem("token")) return true;
      return false;
    },
    async getJobDetails() {
      // Get the id parameter from the route
      const id = this.$route.params.id;
      // Call the getJob action with the id parameter
      this.job = await JobStore().getJob(id);
    },
    async checkIfUserApplied() {
      try {
        const token = localStorage.getItem("token");
        let config = "";
        if (token) {
          config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        }
        const response = await axiosInstance.get("/applications/", config);
        if (!response.status == 200) {
          throw new Error("Failed to fetch user applications");
        }
        const applications = await response.data;
        const userId = this.user.id;
        const jobId = this.$route.params.id;
        this.userApplied = applications.some(
          (application) =>
            application.job_listings_id == jobId &&
            application.user_id == userId
        );
        this.loaded = true;
      } catch (error) {
        console.error("Error checking if user applied:", error);
        // Handle error, e.g., show an error message to the user
      }
    },
    goBack() {
      // Navigate back to the job list page
      if (this.specifyRole("candidate")) {
        this.$router.push({ path: "/candidate/home" });
      } else if (this.specifyRole("employer")) {
        this.$router.push({ path: "/employer/home" });
      } else {
        this.$router.push({ path: "/" });
      }
    },
    handleFileChange(event) {
      this.resume = event.target.files[0];
      this.resumeName = event.target.files[0].name;
    },
    async createApllication() {
      const token = localStorage.getItem("token");
      let config = "";
      if (token) {
        config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        };
      }
      const application = {
        email: this.email,
        phoneNumber: this.phoneNumber,
        resume: this.resume,
        job_listings_id: Number(this.$route.params.id),
      };
      try {
        await axiosInstance.post("/applications/", application, config);
        this.$router.push({ path: "/candidate/home" });
        toast.success("Job Posted successfully");
      } catch (err) {
        console.log("error posting = ", err);
        toast.error("Error Posting application. Please try again later.");
      }
    },

    async deleteJobById(jobId) {
      try {
        const confirmed = confirm("Are you sure you want to delete this job?");
        if (!confirmed) {
          return;
        }

        await JobStore().deleteJob(jobId);
        this.$router.push({ path: "/employer/home" });
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    },
  },

  async beforeMount() {
    // Call the getJobDetails and checkIfUserApplied methods before mounting the component
    await this.getJobDetails();
    await this.checkIfUserApplied();
  },
};
</script>

<style scoped>
.card {
  margin-top: 20px;
}
.applyform {
  margin-top: 22px;
  box-shadow: 3px 3px 5px 5px rgb(240, 240, 240);
  height: 100%;
  padding: 20px;
}
label {
  margin-top: 10px;
}
</style>
