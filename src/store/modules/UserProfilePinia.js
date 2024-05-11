import { defineStore } from 'pinia';
import axiosInstance from '../../axios';

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: null,
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
      try {
        const token = "1|U8YfsUZjei1VR8pr5nDz7N640qZdRLZNGZd5X6agb1b3c637";
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axiosInstance.put(
          `/users/${userData.id}`,
          userData,
          config
        );
        this.user = response.data;
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
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
        const response = await axiosInstance.get(`/user?page=${pageNumber}&role=${role}`, config);
        return response;
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
  },
});
