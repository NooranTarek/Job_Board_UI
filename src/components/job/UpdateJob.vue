<template>
  <div class="job-form">
    <form @submit.prevent="updateJob" class="form">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="job.title"
        />
        <span v-if="errors.title" class="error">{{ errors.title[0] }}</span>
      </div>
      <div class="form-group row">
        <div class="col">
          <label for="description" class="form-label">Description</label>
          <textarea
            class="form-control"
            id="description"
            v-model="job.description"
          ></textarea>
          <span v-if="errors.description" class="error">{{
            errors.description[0]
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
          <span v-if="errors.responsibilities" class="error">{{
            errors.responsibilities[0]
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
          <span v-if="errors.skills" class="error">{{ errors.skills[0] }}</span>
        </div>
        <div class="col">
          <label for="qualifications" class="form-label">Qualifications</label>
          <textarea
            class="form-control"
            id="qualifications"
            v-model="job.qualifications"
          ></textarea>
          <span v-if="errors.qualifications" class="error">{{
            errors.qualifications[0]
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
          <span v-if="errors.salary_range" class="error">{{
            errors.salary_range[0]
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
          <span v-if="errors.location" class="error">{{
            errors.location[0]
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
        <span v-if="errors.benefits" class="error">{{
          errors.benefits[0]
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
          <span v-if="errors.work_type" class="error">{{
            errors.work_type[0]
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
          <span v-if="errors.application_deadline" class="error">{{
            errors.application_deadline[0]
          }}</span>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Post Job</button>
    </form>
  </div>
</template>

<script>
import axiosInstance from "../../axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
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
        application_deadline: "",
      },
      errors: {},
    };
  },
  async created() {
    const jobId = this.$route.params.id;
    try {
      const response = await axiosInstance.get(`jobs/${jobId}`);
      if (response.data.application_deadline) {
        response.data.application_deadline =
          response.data.application_deadline.split(" ")[0];
      }
      this.job = response.data;
    } catch (error) {
      console.error("Error fetching job:", error);
      toast.error("Error fetching job data. Please try again later.");
    }
  },
  methods: {
    async updateJob() {
      try {
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
        await axiosInstance.post(`jobs/${jobId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
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
  },
};
</script>

<style scoped>
.job-form {
  max-width: 700px;
  margin: 0 auto;
  margin-left: 30px;
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
.error {
  color: red;
  font-size: 0.8rem;
}
</style>
