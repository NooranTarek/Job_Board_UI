import { defineStore } from 'pinia';
import axiosInstance from '../../axios';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: null,
    error: null,
  }),
  actions: {
    async fetchUser() {
      try {
        // Replace 'YOUR_TOKEN_HERE' with your actual token value
        const token = '1|U8YfsUZjei1VR8pr5nDz7N640qZdRLZNGZd5X6agb1b3c637';

        // Add the token to the request headers
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axiosInstance.get("/user", config);

        this.user = response.data;
        return this.user;
      } catch (error) {
        this.error = error.message;
      }
    },
    async updateUser(userData) {
        try {
          const token = '1|U8YfsUZjei1VR8pr5nDz7N640qZdRLZNGZd5X6agb1b3c637';
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axiosInstance.put(`/users/${userData.id}`, userData, config);
          this.user = response.data;
        } catch (error) {
          console.error('Error updating user:', error);
          throw error;
        }
      },
      
  },
});
