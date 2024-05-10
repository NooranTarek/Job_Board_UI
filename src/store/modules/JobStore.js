import { defineStore } from "pinia";
import axiosInstance from "../../axios";

export const JobStore = defineStore("jobstore", {
    state: () => ({
        jobs: []
    }),
    actions: {
        async getAllJobs() {
            try {
                const response = await axiosInstance.get("jobs");
                this.jobs = response.data;
                console.log(response);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        },
        async changeJobStatus(id, jobForm) {
            try {
                const resp = await axiosInstance.put(`jobs/${id}`, jobForm);
                console.log(resp);
            } catch (error) {
                console.log("Error changing job status:", error)
            }
        },
    }
});
