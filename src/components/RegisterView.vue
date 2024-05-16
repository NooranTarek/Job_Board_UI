
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
                    <!-- <i class="fas fa-user fa-lg me-3 fa-fw"></i> -->
                    <font-awesome-icon icon="user" class="me-3 mt-4" />
                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                      <label class="form-label" for="form3Example1c">Your Name</label>
                      <input type="text" id="form3Example1c" class="form-control" v-model="this.name"/>
                      <span v-if="v$.name.$error" class="text-danger"> {{ v$.name.$errors[0].$message }} </span>
                    </div>
                </div>
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
                    
                    <div class="d-flex flex-row align-items-center mb-4">
                      <!-- <font-awesome-icon :icon="['fas', 'key']" />     -->
                      <font-awesome-icon icon="key" class="me-3 mt-4" />
                        <div data-mdb-input-init class="form-outline flex-fill mb-0">
                      <label class="form-label" for="form3Example4cd">Repeat your password</label>
                      <input type="password" id="form3Example4cd" class="form-control" v-model="password.confirm" />
                      <span v-if="v$.password.confirm.$error" class="text-danger"> {{ v$.password.confirm.$errors[0].$message }} </span>
                    </div>
                  </div>
                    
                    <label  style="margin-left: 33px;" class="form-label" for="Role">Role</label>
                    <div class="d-flex align-items-center">
                      <font-awesome-icon icon="user-lock" class="me-3" />
                      <select class="form-select" aria-label="Default select example" @change="onChange($event)">
                        <option value="candidate" selected>Candidate</option>
                        <option value="employer">Employer</option>
                        <option  v-if="IsAdmin()" value="admin">Admin</option>
                        </select>
                        </div>

                      <div class="d-flex flex-row align-items-center mb-4 mt-4">
                      <!-- <font-awesome-icon :icon="['fas', 'key']" />     -->
                      <font-awesome-icon icon="key" class="me-3 mt-4" />
                        <div data-mdb-input-init class="form-outline flex-fill mb-0">
                      <label class="form-label" for="form3Example4cd" >Image</label>
                      <input type="file" id="form3Example4cd" class="form-control" name="file_upload" accept=".jpg" @change="onChangeImage($event)" />
                      <!-- <span v-if="v$.password.confirm.$error" class="text-danger"> {{ v$.image.$error.$message }} </span> -->
                    </div>
                  </div>
                  <div>
                  </div>
                  
                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4 mt-3">
                    <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg">Register</button>
                  </div>
                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <a  style="color:blue;" class="btn  text-center" @click="this.$router.push('/login')">Already have an account</a>
                      <a  style="color:blue;" class="btn  text-center" @click="this.$router.push('/')">Go to home</a>

                    </div>
                  
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
library.add(faUser,faCoffee,faEnvelope, faLock, faKey, faUserLock);

export default {
  setup() {
    const userStore = useUserStore();
    return { user: userStore.user, userStore ,  v$: useVuelidate()}; // Include userStore in the return object
  },
  data(){
    return {
      name: '',
      email: '',
      role: 'candidate',
      password: {
        password: '',
        confirm: '',
    }, 
    image : ''
  }
},
validations(){
    const passwordRegex = /^(?=.*[@#$%^&+=])(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&+=]{8,}$/;

    return {
        name: { required, minLength :minLength(3), maxLength:maxLength(100), alpha },
       email: { required, email, minLength :minLength(3), maxLength:maxLength(100) },
       password: {
        password: { required, maxLength: maxLength(100), regex: helpers.withMessage('At least one special character, one letter, one digit, and be at least 8 charachters',helpers.regex(passwordRegex) )},
        confirm: { required, passwordMatch: helpers.withMessage('Password does not match ',sameAs(this.password.password)) },
    },
}
},
methods: {
  onChange(event){
      this.role = event.target.value;
  },
  onChangeImage(event){
    console.log(event.target.files[0]);
      this.image = event.target.files[0];

  },
  IsAdmin(){
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if(token && role == 'admin') return true;
    return false;
  },
     async submitForm ()  {
        const result = this.v$.$validate();
        if(! this.v$.$invalid) this.register();
        // console.log(this.v$)
    },
     async register() {
    const formData = new FormData();
          formData.append('name', this.name);
          formData.append('email', this.email);
          formData.append('password', this.password.password);
          formData.append('c_password', this.password.confirm);
          formData.append('role', this.role);
          formData.append('image', this.image);
          console.log(formData.get('image'));
      try {
         const response =  await this.userStore.register(formData)
          // console.log(response.data);
          if(localStorage.getItem("role") == "admin"){
            this.$router.push('/admin/candidate');
          }else{
          this.$router.push('/login');
          }
          // toast.success("User Created successfully");
      } catch (error) {
        toast.error(error.response.data.message);
        if (error.response.data.role) {
          localStorage.setItem('role', error.response.data.role) ;
          this.v$.reset;
        }  
        // this.v$.reset();
        // console.error('Error updating user:', error);
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
