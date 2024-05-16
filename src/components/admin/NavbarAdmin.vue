<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <img class="img1" src="https://cdn-icons-png.freepik.com/512/6134/6134762.png" />
    <div class="div1">
      <a id="navbar-brand" href="#">
        A
        <span>-</span>M
        <span>-</span>N
        <span>-</span>H
      </a>
      <p id="navbar-brand2" href="#">
        <span id="letter">A</span>spire
        <span id="letter">M</span>atch
        <span id="letter">N</span>etwork
        <span id="letter">H</span>ub
      </p>
    </div>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <!-- <li class="nav-item active">
          <RouterLink class="nav-link" to="home">Home</RouterLink>
        </li> -->
        <li class="nav-item">
            <router-link class="nav-link"   :to="{ name: 'UserMonitor' }">Monitor Candidates</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'EmployerMonitor' }">Monitor Employers</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'manageJobsComponent' }">Monitor Jobs</router-link>
        </li>


      </ul>

      <ul class="navbar-nav ms-auto">

        <li  class="nav-item">
          <img  v-if="this.user"  style="width:50px;" :src="this.user.image" alt="">
        </li>
        <li class="nav-item active">
          <RouterLink class="nav-link"  v-if="! isLogged()" to="/login" >Login</RouterLink>
        </li>
        <li  class="nav-item">
          <RouterLink class="nav-link" to="/register">Add User</RouterLink>
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
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
    isLogged(){
        if(localStorage.getItem('token')) return true;
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
