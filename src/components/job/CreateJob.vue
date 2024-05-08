<template>
  <div>
    <form @submit.prevent="createJob">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="job.title"
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          class="form-control"
          id="description"
          v-model="job.description"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="responsibilities" class="form-label"
          >responsibilities</label
        >
        <textarea
          class="form-control"
          id="responsibilities"
          v-model="job.responsibilities"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="skills" class="form-label">skills</label>
        <textarea
          class="form-control"
          id="skills"
          v-model="job.skills"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="qualifications" class="form-label">qualifications</label>
        <textarea
          class="form-control"
          id="qualifications"
          v-model="job.qualifications"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="salary_range" class="form-label">salary_range</label>
        <input
          type="number"
          class="form-control"
          id="salary_range"
          v-model="job.salary_range"
        />
      </div>
      <div class="mb-3">
        <label for="benefits" class="form-label">benefits</label>
        <textarea
          class="form-control"
          id="benefits"
          v-model="job.benefits"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="location" class="form-label">location</label>
        <input
          type="text"
          class="form-control"
          id="location"
          v-model="job.location"
        />
      </div>
      <div class="mb-3">
        <label for="workType" class="form-label">Work Type</label>
        <select id="workType" class="form-select" v-model="job.work_type">
          <option disabled value="">Please select work type</option>
          <option value="on-site">On-site</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="application_deadline" class="form-label"
          >Application Deadline</label
        >
        <input
          type="date"
          id="application_deadline"
          class="form-control"
          v-model="job.application_deadline"
        />
      </div>

      <!-- Add other form fields here for responsibilities, skills, qualifications, etc. -->
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import axiosInstance from "../../apis/config";

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

        // Add other fields here with initial empty values
      },
    };
  },
  methods: {
    async createJob() {
      try {
        const formData = new FormData();
        for (const key in this.job) {
          formData.append(key, this.job[key]);
        }
        await axiosInstance.post("jobs", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Job created successfully");
        // Reset form fields after successful submission
        this.job = {
          title: "",
          description: "",
          // Reset other fields as needed
        };
      } catch (error) {
        console.error("Error creating job:", error);
        alert("Error creating job. Please try again later.");
      }
    },
  },
};
</script>

<style>
/* Add component-specific styles here */
</style>
