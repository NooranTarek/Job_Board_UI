<template>
  <div class="job-form-container">
    <div class="job-form">
      <form @submit.prevent="updateJob" class="form">
        <h1 class="m-2">Update Job</h1>
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="job.title"
          />
          <span v-if="v$.job.title.$error" class="error">{{
            v$.job.title.$errors[0].$message
          }}</span>
        </div>
        <div class="form-group row">
          <div class="col">
            <label for="description" class="form-label">Description</label>
            <textarea
              class="form-control"
              id="description"
              v-model="job.description"
            ></textarea>
            <span v-if="v$.job.description.$error" class="error">{{
              v$.job.description.$errors[0].$message
            }}</span>
          </div>
          <div class="col">
            <label for="responsibilities" class="form-label"
              >Responsibilities</label
            >
            <textarea
              class="form-control"
              id="responsibilities"
              v-model="job.responsibilities"
            ></textarea>
            <span v-if="v$.job.responsibilities.$error" class="error">{{
              v$.job.responsibilities.$errors[0].$message
            }}</span>
          </div>
        </div>
        <div class="form-group row">
          <div class="col">
            <label for="skills" class="form-label">Skills</label>
            <textarea
              class="form-control"
              id="skills"
              v-model="job.skills"
            ></textarea>
            <span v-if="v$.job.skills.$error" class="error">{{
              v$.job.skills.$errors[0].$message
            }}</span>
          </div>
          <div class="col">
            <label for="qualifications" class="form-label"
              >Qualifications</label
            >
            <textarea
              class="form-control"
              id="qualifications"
              v-model="job.qualifications"
            ></textarea>
            <span v-if="v$.job.qualifications.$error" class="error">{{
              v$.job.qualifications.$errors[0].$message
            }}</span>
          </div>
        </div>
        <div class="form-group row">
          <div class="col">
            <label for="salary_range" class="form-label">Salary</label>
            <input
              type="number"
              class="form-control"
              id="salary_range"
              v-model="job.salary_range"
            />
            <span v-if="v$.job.salary_range.$error" class="error">{{
              v$.job.salary_range.$errors[0].$message
            }}</span>
          </div>
          <div class="col">
            <label for="location" class="form-label">Location</label>
            <input
              type="text"
              class="form-control"
              id="location"
              v-model="job.location"
            />
            <span v-if="v$.job.location.$error" class="error">{{
              v$.job.location.$errors[0].$message
            }}</span>
          </div>
        </div>
        <div class="mb-3">
          <label for="benefits" class="form-label">Benefits</label>
          <textarea
            class="form-control"
            id="benefits"
            v-model="job.benefits"
          ></textarea>
          <span v-if="v$.job.benefits.$error" class="error">{{
            v$.job.benefits.$errors[0].$message
          }}</span>
        </div>
        <div class="form-group row">
          <div class="col">
            <label for="workType" class="form-label">Work Type</label>
            <select id="workType" class="form-select" v-model="job.work_type">
              <option disabled value="">Please select work type</option>
              <option value="on-site">On-site</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
            <span v-if="v$.job.work_type.$error" class="error">{{
              v$.job.work_type.$errors[0].$message
            }}</span>
          </div>
          <div class="col">
            <label for="application_deadline" class="form-label"
              >Application Deadline</label
            >
            <input
              type="date"
              id="application_deadline"
              class="form-control"
              v-model="job.application_deadline"
            />
            <span v-if="v$.job.application_deadline.$error" class="error">{{
              v$.job.application_deadline.$errors[0].$message
            }}</span>
          </div>
          <div class="mb-3">
            <label for="logo" class="form-label">Logo</label>
            <input
              type="file"
              class="form-control"
              id="logo"
              @change="handleLogoUpload"
            />
          </div>
          <span v-if="v$.job.logo.$error" class="error">{{
            v$.job.logo.$errors[0].$message
          }}</span>
        </div>

        <button type="submit" class="btn btn-primary">Update Job</button>
      </form>
    </div>
    <div class="image-container">
      <img src="../../assets/job.jpg" alt="Image" class="image" />
    </div>
  </div>
</template>

<script>
import axiosInstance from "../../axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useVuelidate } from "@vuelidate/core";
import { useUserStore } from "../../store/modules/UserProfilePinia";
import { helpers, required, maxLength, numeric } from "@vuelidate/validators";
export default {
  setup() {
    const userStore = useUserStore();
    userStore.fetchUser();
    return { v$: useVuelidate(), userStore, user: userStore.user };
  },
  data() {
    return {
      job: {
        title: "",
        description: "",
        responsibilities: "",
        skills: "",
        qualifications: "",
        salary_range: "",
        benefits: "",
        location: "",
        work_type: "",
        logo: null,
        application_deadline: "",
      },
      errors: {},
    };
  },
  validations() {
    return {
      job: {
        title: { required, maxLength: maxLength(255) },
        description: { required, maxLength: maxLength(255) },
        responsibilities: { required, maxLength: maxLength(255) },
        skills: { required, maxLength: maxLength(255) },
        qualifications: { required, maxLength: maxLength(255) },
        salary_range: { required, numeric },
        benefits: { required, maxLength: maxLength(255) },
        location: { required, maxLength: maxLength(100) },
        work_type: { required, maxLength: maxLength(100) },
        application_deadline: {
          required,
          futureDate: helpers.withMessage(
            "Application deadline must be a future date",
            (value) => {
              if (!value) return true;
              const selectedDate = new Date(value);
              const currentDate = new Date();
              return selectedDate >= currentDate;
            }
          ),
        },
        logo: {
          isImage: helpers.withMessage(
            "Please upload a valid image file (jpg, jpeg, png, gif)",
            (value) => {
              if (!value) return true;
              const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
              const extension = value.name.split(".").pop().toLowerCase();
              return allowedExtensions.includes(extension);
            }
          ),
        },
      },
    };
  },

  async created() {
    const jobId = this.$route.params.id;
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.get(`jobs/${jobId}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (this.user.id === response.data.user_id) {
        if (response.data.application_deadline) {
          response.data.application_deadline =
            response.data.application_deadline.split(" ")[0];
        }
        this.job = response.data;
      } else {
        this.$router.push("/employer/home");
      }
    } catch (error) {
      console.error("Error fetching job:", error);
      toast.error("Error fetching job data. Please try again later.");
    }
  },
  methods: {
    async updateJob() {
      try {
        const token = localStorage.getItem("token");
        this.v$.$validate();
        const formData = new FormData();
        for (const key in this.job) {
          //skip appending logo if its null
          if (key === "logo" && !this.job[key]) {
            continue;
          }
          formData.append(key, this.job[key]);
        }
        formData.append("_method", "put");
        const jobId = this.$route.params.id;
        if (this.v$.$error) return;
        await axiosInstance.post(`jobs/${jobId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Job Updated successfully");
        this.errors = {};
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errors = error.response.data.errors;
        } else {
          console.error("Error updating job:", error);
          toast.error("Error updating job. Please try again later.");
        }
      }
    },
    handleLogoUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.job.logo = file;
      } else {
        this.job.logo = null;
      }
    },
  },
};
</script>

<style scoped>
.job-form-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.job-form {
  max-width: 700px;
  margin: 0 auto;
  margin-left: 30px;
  flex: 1;
}

.form {
  margin-top: 30px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 5px;
}

.form-label {
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: #007bff;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.form-group.row {
  display: flex;
  align-items: center;
}

.form-group.row .form-control {
  margin-right: 5px;
}

.form-group.row .col {
  flex: 1;
}
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  margin-top: 100px;
}

.image {
  width: 650px;
  height: auto;
}
.error {
  color: red;
  font-size: 0.8rem;
}
</style>
