
<template>
<section class="vh-100" style="background-color: #eee;">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                <form class="mx-1 mx-md-4" @submit.prevent="submitForm">
                
                <div class="d-flex flex-row align-items-center mb-4">
                    <!-- <i class="fas fa-envelope fa-lg me-3 fa-fw"></i> -->
                    <!-- <FontAwesomeIcon icon={faEnvelope} /> -->
                    <font-awesome-icon icon="envelope" class="me-3 mt-4"/>
                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                      <label class="form-label" for="form3Example3c">Your Email</label>
                      <input type="email" id="form3Example3c" class="form-control" v-model="email"/>
                        <span v-if="v$.email.$error" class="text-danger"> {{ v$.email.$errors[0].$message }} </span>
                      </div>
                    </div>
                    
                    <div class="d-flex flex-row align-items-center mb-4">
                      <!-- <i class="fas fa-lock fa-lg me-3 fa-fw"></i> -->
                      <font-awesome-icon icon="lock" class="me-3 mt-4"/>
                      <div data-mdb-input-init class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example4c">Password</label>
                        <input type="password" id="form3Example4c" class="form-control" v-model="password.password"/>
                        <div v-if="v$.password.password.$error" class="text-danger"> {{ v$.password.password.$errors[0].$message }} </div>
                      </div>
                    </div>
                    
                 

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg">Login</button>
                  </div>
                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">    
                      <a  style="color:blue;" class="btn  text-center" @click="this.$router.push('/')">Go to home</a>
                    <a  style="color:blue;" class="btn  text-center" @click="this.$router.push('/register')">Not have an account</a>
                  </div>
                  <!-- <select class="form-select" aria-label="Default select example">
                    <option selected>Your role</option>
                    <option value="candidate">Candidate</option>
                    <option value="employer">Employer</option>
                     -->
                    <!-- <option  v-if="localStorage.getItem('token')==='admin'" value="admin">Admin</option> -->
                  <!-- </select> -->
                </form>
              </div>

              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  class="img-fluid" alt="Sample image">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</template>

<script >
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs, maxLength, helpers , alpha} from '@vuelidate/validators'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee , faUser, faEnvelope, faLock,faKey, faUserLock} from "@fortawesome/free-solid-svg-icons";
import { useUserStore } from "../store/modules/UserProfilePinia";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
library.add(faUser,faCoffee,faEnvelope, faLock, faKey, );

export default {
  setup() {
    const userStore = useUserStore();
    return { user: userStore.user, userStore ,  v$: useVuelidate()}; // Include userStore in the return object
  },
  data(){
    return {
      email: '',
      password: {
        password: '',
    }
  }
},
validations(){

    return {
       email: { required, email, minLength :minLength(3), maxLength:maxLength(100) },
       password: {
        password: { required, maxLength: maxLength(100)},
    }
}
},

methods: {
     async submitForm ()  {
        const result = this.v$.$validate();
        if(! this.v$.$invalid) this.login();
    },
     async login() {
      try {
         const response =  await this.userStore.login({ 
          email: this.email,
          password: this.password.password,
        })
        localStorage.setItem('token', response.data.token);
        localStorage.setItem("role", response.data.role);
        if(response.data.role==='admin')  this.$router.push('admin/candidate');
        else if(response.data.role==='candidate')  this.$router.push('/');
        else if(response.data.role==='employer')  this.$router.push('/employer/managejobs');


      } catch (error) {
        toast.error(error.response.data.error);
        console.error('Error updating user:', error);
      }
    }
},
}
</script>

<style scoped>
/* Scoped styles specific to this component */
h1 {
  color: blue;
}
</style>
