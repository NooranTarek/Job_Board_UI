<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Wuzzufny</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <!-- <li class="nav-item active">
          <RouterLink class="nav-link" to="home">Home</RouterLink>
        </li> -->
        <li  class="nav-item">
          <router-link class="nav-link" :to="{name:'UserMonitor'}">Monitor Candidates</router-link>
        </li>
        <!-- <li class="nav-item">
          <RouterLink class="nav-link" to="profile">Monitor Employers</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="profile">Monitor Admins</RouterLink>
        </li>
        <li  class="nav-item"> -->
          <!-- <RouterLink class="nav-link" to="useronitor"></RouterLink> -->
        <!-- </li> -->
      </ul>

      <ul class="navbar-nav ms-auto">

        <li  class="nav-item">
          <!-- <RouterLink class="nav-link" to="/register">Image</RouterLink> -->
          <img  v-if="this.user"  style="width:50px;" :src="this.user.image" alt="">
        </li>
        <li class="nav-item active">
          <RouterLink class="nav-link" to="/login" >Login</RouterLink>
        </li>
        <li  class="nav-item">
          <RouterLink class="nav-link" to="/register">Register</RouterLink>
        </li>
        <li  class="nav-item" @click="this.logout">
          <span  style="cursor: pointer;" class="nav-link"  >Logout</span>
        </li>
        
      </ul>
     
    </div>
  </nav>
  <section>
    <router-view></router-view>
  </section>
</template>
<script>
import { useUserStore } from "../../store/modules/UserProfilePinia";
import { onMounted, ref, reactive } from "vue";
import { toast } from "vue3-toastify";

export default {
  setup() {
    const userStore = useUserStore();
    let user = ref(null);
    const reactiveUserStore = reactive(userStore);

    onMounted(async () => {
      if (localStorage.getItem('token')) {
        await reactiveUserStore.fetchUser();
      }
      user.value = reactiveUserStore.user;
    });

    return { user, userStore: reactiveUserStore };
  },

  methods: {
    specifyRole(role) {
      if (role === localStorage.getItem('role')) return true;
      else if (role === 'any' && localStorage.getItem('token')) return true;
      return false;
    },

    async logout() {
      try {
        const response = await this.userStore.logout();
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        this.$router.push('/login');
      } catch (error) {
        toast.error(error.response?.data.error);
        console.error('Error updating user:', error);
      }
    }
  }
}
</script>
