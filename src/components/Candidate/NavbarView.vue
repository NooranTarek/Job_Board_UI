


<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Wuzzufny</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <RouterLink class="nav-link" to="home">Home</RouterLink>
        </li>
        <li v-if="specifyRole('candidate')" class="nav-item">
          <RouterLink class="nav-link" to="about">My Application</RouterLink>
        </li>
        <li v-if="specifyRole('any')" class="nav-item">
          <RouterLink class="nav-link" to="profile">my-Profile</RouterLink>
        </li>
      </ul>

      <ul class="navbar-nav ms-auto">
        <li v-if="specifyRole('any')" class="nav-item">
          <RouterLink class="nav-link" to="/register">Image</RouterLink>
        </li>
        <li v-if="! specifyRole('any')" class="nav-item active">
          <RouterLink class="nav-link" to="/login" >Login</RouterLink>
        </li>
        <li v-if="! specifyRole('any')" class="nav-item">
          <RouterLink class="nav-link" to="/register">Register</RouterLink>
        </li>
        <li v-if="specifyRole('any')" class="nav-item" @click="this.logout">
          <span  style="cursor: pointer;" class="nav-link"  >Logout</span>
        </li>
        
      </ul>
     
    </div>
  </nav>
</template>
<script>
import { useUserStore } from "../../store/modules/UserProfilePinia";

export default{
   setup() {
    const userStore = useUserStore();
    return { user: userStore.user, userStore }; // Include userStore in the return object
  },
  methods:{
    specifyRole(role){
      if(role == localStorage.getItem('role') ) return true;
      else if(role == 'any' &&  localStorage.getItem('token')) return true;
      return false;
    },
       async logout() {
      try {
         const response =  await this.userStore.logout()
        localStorage.removeItem('role');
        localStorage.removeItem('token');
          this.$router.push('/login');
      } catch (error) {
        toast.error(error.response.data.error);
        console.error('Error updating user:', error);
      }
    }
  }
}
</script>
