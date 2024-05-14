import { defineStore } from "pinia";
import axiosInstance from "../../axios";

export const JobStore = defineStore("jobstore", {
    state: () => ({
        jobs: [],
        currentPage : 1,
        totalPages : 0,
        totalCount : 0,
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
                // console.log(response);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        },
        async getJobs({ page, limit, order, searchField, search, filters }) {
            // console.log(`page: ${page} limit: ${limit} order: ${order} search: ${search} filters: ${filters}`);
            try {
                const token = localStorage.getItem("token");
                let config = {};
                if (token) {
                    config.headers = {
                        Authorization: `Bearer ${token}`,
                    };
                }
                config.params = { page, limit, order, searchField, search, ...filters };
        
                // console.log("Request being sent:", config);
        
                const response = await axiosInstance.get("jobs", config);
                this.jobs = response.data.data;
                this.currentPage = response.data.current_page;
                this.totalPages = response.data.total_pages;
                this.totalCount = response.data.total_count;
                // console.log(`totalPages==========================: ${this.totalPages}`);
                // console.log("Response:", this.jobs);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        },

        async getFirstJob() {
            try {
                const token = localStorage.getItem("token");
                let config = {};
                if (token) {
                    config.headers = {
                        Authorization: `Bearer ${token}`,
                    };
                }
                const page = 1;
                const limit = 1;
                config.params = { page, limit};
        
                // console.log("Request being sent:", config);
        
                const response = await axiosInstance.get("jobs", config);
                this.firstJob = response.data.data[0];
            } catch (error) {
                console.error("Error fetching firstJob:", error);
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

        async deleteJob(id) {
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
                const response = await axiosInstance.delete(`jobs/${id}`,config);
                return response.data;
            } catch (error) {
                console.error("Error deleting job:", error);
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
