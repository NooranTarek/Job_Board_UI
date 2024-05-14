import { defineStore } from "pinia";
import axiosInstance from "../../axios";

export const JobStore = defineStore("jobstore", {
    state: () => ({
        jobs: []
    }),
    actions: {
        async getAllJobs() {
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
                const response = await axiosInstance.get("jobs",config);
                this.jobs = response.data.data;
                console.log(response);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        },
        async getJobs({ page, limit, order, search, filters }) {
            console.log(`page: ${page} limit: ${limit} order: ${order} search: ${search} filters: ${filters}`);
            try {
                const token = localStorage.getItem("token");
                let config = {};
                if (token) {
                    config.headers = {
                        Authorization: `Bearer ${token}`,
                    };
                }
                config.params = { page, limit, order, search, filters };
        
                console.log("Request being sent:", config);
        
                const response = await axiosInstance.get("jobs", config);
                this.jobs = response.data.data;
                console.log("Response:", this.jobs);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        },
        
        async getJob(id) {
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
                const response = await axiosInstance.get(`jobs/${id}`,config);
                return response.data;
            } catch (error) {
                console.error("Error fetching job:", error);
                throw error; // Re-throw the error to handle it in the component
            }
        },
        async changeJobStatus(id, jobForm) {
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
                const resp = await axiosInstance.put(`jobs/${id}`, jobForm,config);
                console.log(resp);
            } catch (error) {
                console.log("Error changing job status:", error)
            }
        },
    }
});
