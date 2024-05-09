import { defineStore } from 'pinia';
import axios from '../../axios/index';

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
        const token = '82|d0Ix0bRhJ0KfgquGrZiEtXFhjJ0hjARyMHxMioRt461ae6cb';

        // Add the token to the request headers
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Make the GET request with the configured headers
        const response = await axios.get('/user', config);

        // Update the store state with the user data
        this.user = response.data;
      } catch (error) {
        // Handle errors
        this.error = error.message;
      }
    },
    async updateUser(userData) {
        try {
          const token = '82|d0Ix0bRhJ0KfgquGrZiEtXFhjJ0hjARyMHxMioRt461ae6cb';
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.put(`http://localhost:8000/api/users/${userData.id}`, userData, config);
          this.user = response.data;
        } catch (error) {
          console.error('Error updating user:', error);
          throw error;
        }
      },
      
  },
});
