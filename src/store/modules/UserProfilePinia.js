import { defineStore } from 'pinia';
import axiosInstance from '../../axios';
import { toast } from "vue3-toastify";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: null,
    applications: [],
    error: null,

  }),
  actions: {
    async fetchUser() {
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

        // Make the GET request with the configured headers
        const response = await axiosInstance.get("/user", config);

        // Update the store state with the user data
        this.user = response.data;
        return this.user;
      } catch (error) {
        // Handle errors
        this.error = error.message;
      }
    },
    async updateUser(userData) {
      const token = localStorage.getItem("token");
      let config = "";
      if (token) {
        config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      }
      const response = await axiosInstance.put(`/users/${userData.id}`, userData, config);
      this.user = response.data;
      console.log(response.data);
      if(response.data.success===true){
        toast.success(response.data.message,"🤝");
      }
      else{
        // console.log(response.data.errors.email[0]);
        if(response.data.errors.name){
          toast.error(response.data.errors.name[0],"👎");
        }
        else {
        console.log("from email");
        toast.error(response.data.errors.email[0],"👎");
        }
      }

  },

    async register(userData) {
      try {
        //! if admin try add admin it must send token in register
        const token = localStorage.getItem("token");
        let config = "";
        if (token) {
          config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        }

        const response = await axiosInstance.post(
          `/register`,
          userData,
          config
        );
        return response;
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
    },
    async login(userData) {
      try {
        //! if admin try add admin it must send token in register
        
        const response = await axiosInstance.post(`/login`, userData);
        localStorage.setItem("token", response);
        localStorage.setItem("role", response.role);
        return response;
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
    },

    async getUsersPaginated(pageNumber,role) {
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
        const response = await axiosInstance.get(`/users?page=${pageNumber}&role=${role}`, config);
        console.log("res = ",response.data.data);
        return response.data;
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
    },
    async logout() {
      try {
        //! if admin try add admin it must send token in register
        const token = localStorage.getItem("token");
        let config = "";
        if (token) {
          config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        }
        const response = await axiosInstance.post(`/logout`, {}, config);
        return response;
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
    },
    async fetchUserApplications(userId) {
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
        const response = await axiosInstance.get(`/applications/users/${userId}`, config);
        console.log("from pinia",response.data.applications);
        return response.data.applications;
      } catch (error) {
        console.error("Error fetching user applications:", error);
        throw error;
      }
    },
    async cancelApplication(applicationId) {
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
        const response = await axiosInstance.delete(`applications/${applicationId}`, config);
        if (response.status === 204) {
          this.applications = this.applications.filter(app => app.id !== applicationId);
          toast.success("Application canceled successfully", "👍");
        } else {
          toast.error("Failed to cancel application", "👎");
        }
      } catch (error) {
        console.error("Error canceling application:", error);
        throw error;
      }
    },
  },
});

   
   
