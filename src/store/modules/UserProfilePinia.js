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
        const token = '5|M26KEjnH0VIEciura7S29bstXRt2rOy1lbFgijQHffb7218c';

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axiosInstance.get('/user', config);

        this.user = response.data;
      } catch (error) {
        this.error = error.message;
      }
    },
    async updateUser(userData) {
          const token = '5|M26KEjnH0VIEciura7S29bstXRt2rOy1lbFgijQHffb7218c';
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
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
      
  },
});
