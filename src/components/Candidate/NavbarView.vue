<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <img
      class="img1"
      src="https://cdn-icons-png.freepik.com/512/6134/6134762.png"
    />
    <div class="div1">
      <a id="navbar-brand" href="#">
        A
        <span>-</span>M <span>-</span>N <span>-</span>H
      </a>
      <p id="navbar-brand2">
        <span id="letter">A</span>spire <span id="letter">M</span>atch
        <span id="letter">N</span>etwork <span id="letter">H</span>ub
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
        <li v-if="specifyRole('any')" class="nav-item active">
          <RouterLink class="nav-link" to="/candidate/home">Home</RouterLink>
        </li>
        <li v-if="specifyRole('any')" class="nav-item">
          <RouterLink class="nav-link" to="/candidate/profile"
            >my-Profile</RouterLink
          >
        </li>
        <!-- <li v-if="specifyRole('admin')" class="nav-item">
          <RouterLink class="nav-link" to="user-monitor">user-monitor</RouterLink>
        </li> -->
      </ul>

      <ul class="navbar-nav">
        <li v-if="!specifyRole('any')" class="nav-item active">
          <RouterLink class="nav-link" to="/">Home</RouterLink>
        </li>
      </ul>
      <ul class="navbar-nav ms-auto">
        <li v-if="specifyRole('any')" class="nav-item">
          <img v-if="user" style="width: 50px" :src="user.image" alt />
        </li>
        <li v-if="!specifyRole('any')" class="nav-item active">
          <RouterLink class="nav-link" to="/login">Login</RouterLink>
        </li>
        <li v-if="!specifyRole('any')" class="nav-item">
          <RouterLink class="nav-link" to="/register">Register</RouterLink>
        </li>
        <li v-if="specifyRole('any')" class="nav-item" @click="logout">
          <span style="cursor: pointer" class="nav-link">Logout</span>
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
      if (localStorage.getItem("token")) {
        await reactiveUserStore.fetchUser();
      }
      user.value = reactiveUserStore.user;
    });

    return { user, userStore: reactiveUserStore };
  },

  methods: {
    specifyRole(role) {
      if (role === localStorage.getItem("role")) return true;
      else if (role === "any" && localStorage.getItem("token")) return true;
      return false;
    },

    async logout() {
      try {
        const response = await this.userStore.logout();
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        this.$router.push("/login");
      } catch (error) {
        toast.error(error.response?.data.error);
        console.error("Error updating user:", error);
      }
    },
  },
};
</script>
<style>
#navbar-brand {
  color: rgb(140, 66, 53);
  font-weight: bolder;
  font-size: 20px;
  margin-left: 40px;
  text-decoration: none;
}
#navbar-brand2 {
  color: rgb(13, 110, 253);
  font-weight: bolder;
  font-size: 12px;
  margin-left: 10px;
  margin-right: 20px;
}
.navbar {
  height: 60px;
}
.collapse {
  margin-left: 20px;
}

.img1 {
  width: 40px;
  height: 40px;
  margin-left: 10px;
}
.div1 span {
  color: rgb(13, 110, 253);
}
#letter {
  color: rgb(140, 66, 53);
}
</style>
