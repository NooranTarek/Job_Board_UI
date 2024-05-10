import { defineStore } from 'pinia';
import axiosInstance from '../../axios';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null,
    error: null,
  }),
  actions: {
    async fetchUser() {
      try {
        // Replace 'YOUR_TOKEN_HERE' with your actual token value
        const token = '4|WJmoVosVlnEPB8Qnm2ZGxOXuZKG0saFyLCunrey901606c66';

        // Add the token to the request headers
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Make the GET request with the configured headers
        const response = await axiosInstance.get('/user', config);

        // Update the store state with the user data
        this.user = response.data;
      } catch (error) {
        // Handle errors
        this.error = error.message;
      }
    },
    async updateUser(userData) {
          const token = '4|WJmoVosVlnEPB8Qnm2ZGxOXuZKG0saFyLCunrey901606c66';
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axiosInstance.put(`/users/${userData.id}`, userData, config);
          this.user = response.data;
          if(response.data.success===true){
            toast.success(response.data.message,"🤝");
          }
          else if (response.data.success===false){
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
      
  },
});
