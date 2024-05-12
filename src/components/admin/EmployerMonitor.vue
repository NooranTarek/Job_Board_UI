<template>
  <section class="container-fluid">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col"><p class="d-flex justify-content-center">Index</p></th>
          <th scope="col"><p class="d-flex justify-content-center">Name</p></th>
          <th scope="col"><p class="d-flex justify-content-center">Email</p></th>
          <th scope="col"> <p class="d-flex justify-content-center">Jobs</p>  </th>
          <th scope="col"><p class="d-flex justify-content-center">Image</p></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users.data" :key="index">
          <th scope="row" style="vertical-align: middle;"><p class="d-flex justify-content-center">{{ index + 1 }}</p></th>
          <td style="vertical-align: middle;"><p class="d-flex justify-content-center">{{ user.name }}</p></td>

          <td style="vertical-align: middle;"><p class="d-flex justify-content-center">{{ user.email }}</p></td>
          <td><select  v-if="user.job_listings==0?null:true"  class="d-flex justify-content-center form-select"><option  class="d-flex justify-content-center" v-for="(job, index) in user.job_listings" :key="index">title: {{job.title}} | Number of application : {{job.application_count}}</option></select></td>
          <td> <img :src="user.image"  style="width: 50px" alt=""> </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item"><a class="page-link" >Previous</a></li>
    <li class="page-item" v-for="(user, index) in users.last_page" :key="index"><a  @click="getMyPaginatedUser(index+1,'candidate')" class="page-link" >{{index+1}}</a></li>
    <li class="page-item"><a class="page-link" >Next</a></li>
  </ul>


</nav>
  </section>
</template>

<script>
import { useUserStore } from "../../store/modules/UserProfilePinia";
import { onMounted, ref, reactive } from "vue";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



export default {

  created() {
    localStorage.setItem('tempRole',this.$route.params.type); 
  },
  setup() {
    const userStore = useUserStore();
    let users = ref([]);
    const reactiveUserStore = reactive(userStore);
    onMounted(async () => {
      if (localStorage.getItem('token')) {
        const userData = await reactiveUserStore.getUsersPaginated('1','employer');
        users.value = userData;
        console.log(users.value);
      }
    });

    return { users, userStore: reactiveUserStore };
  },
  methods: {
  async getMyPaginatedUser(pageNumber,role) {
    const reactiveUserStore = this.userStore; // Accessing userStore from component instance
    const userData = await reactiveUserStore.getUsersPaginated(pageNumber, role);
    this.users = userData; // Assuming `users` is a data property in your component
  }
}

};
</script>
