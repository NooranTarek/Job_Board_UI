import { defineStore } from "pinia";
import axios from 'axios';


export const JobStore = defineStore("jobstore",{
    state:()=>({
        jobs:[]
    }),
    actions:{
        async getAllJobs() {
            try {
                const response = await axios.get("http://localhost:8000/api/jobs");
                this.jobs = response.data;
                console.log(response);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        },
        async changeJobStatus(id, jobForm) {
            try {
                const resp= await axios.put(`http://localhost:8000/api/jobs/${id}`,jobForm);
                console.log(resp);
            } catch (error) {
                console.log("Error change job status job:",error)
            }
        },
    }
})