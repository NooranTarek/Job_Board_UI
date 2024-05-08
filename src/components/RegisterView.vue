<!-- MyComponent.vue -->

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
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                        <span v-if="v$.name.$error"> {{ v$.name.$errors[0].$message }} </span>
                        <input type="text" id="form3Example1c" class="form-control" v-model="this.name"/>
                        <label class="form-label" for="form3Example1c">Your Name</label>
                    </div>
                </div>
                <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                        <span v-if="v$.email.$error" class=""> {{ v$.email.$errors[0].$message }} </span>
                      <input type="email" id="form3Example3c" class="form-control" v-model="email"/>
                      <label class="form-label" for="form3Example3c">Your Email</label>

                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                        <span v-if="v$.password.password.$error" class=""> {{ v$.password.password.$errors[0].$message }} </span>
                        <input type="password" id="form3Example4c" class="form-control" v-model="password.password"/>
                      <label class="form-label" for="form3Example4c">Password</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                        <span v-if="v$.password.confirm.$error" class=""> {{ v$.password.confirm.$errors[0].$message }} </span>
                        <input type="password" id="form3Example4cd" class="form-control" v-model="password.confirm" />
                      <label class="form-label" for="form3Example4cd">Repeat your password</label>
                    </div>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg">Register</button>
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

<script>
import { reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs, maxLength, helpers , alpha} from '@vuelidate/validators'

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data(){
    return {
      name: '',
      email: '',
      password: {
        password: '',
        confirm: ''
    }
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
    }
}
},
methods: {
     async submitForm ()  {
        const result = this.v$.$validate()
        console.log(this.v$)
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
