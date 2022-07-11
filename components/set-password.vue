<template>
  <div>
    <div class="pl-0 pl-lg-2">
      <h1 class="h3">Set new password</h1>

      <div class="custom-form">
        <form
          method="post"
          action="#"
          name="contact-form"
          id="login-form"
          @submit.prevent="submit"
        >
          <div class="row">
            <div class="col-lg-12">
              <div class="form-group mt-3">
                <input
                  name="email"
                  id="login_email"
                  class="form-control"
                  type="email"
                  v-model.trim="email"
                  placeholder="Email"
                  disabled
                />
                <label class="contact-lable static-" for="login_email"
                  >Email</label
                >
              </div>
            </div>
            <div class="col-lg-12">
              <div class="form-group mt-3">
                <input
                  name="Password"
                  id="login_password"
                  class="form-control"
                  type="password"
                  v-model.trim="$v.password.$model"
                  :class="{ warning: $v.password.$error }"
                  placeholder="Password"
                />
                <label class="contact-lable static" for="login_password"
                  >Password</label
                >

                <span
                  class="form-warning"
                  v-if="!$v.password.required && $v.password.$error"
                  >Password is required.</span
                >
                <span class="form-warning" v-if="!$v.password.minLength"
                  >Password must have at least
                  {{ $v.password.$params.minLength.min }} letters.</span
                >
                <span class="form-warning" v-if="!$v.password.uppercaseFormat"
                  >Password must have at least uppercase letter.</span
                >
                <span class="form-warning" v-if="!$v.password.lowercaseFormat"
                  >Password must have at least lowercase letter.</span
                >
                <span class="form-warning" v-if="!$v.password.numberFormat"
                  >Password must have at least number letter.</span
                >
                <span class="form-warning" v-if="!$v.password.specialCharFormat"
                  >Password must have at least special character.</span
                >
              </div>
            </div>
            <div class="col-lg-12 mt-3" v-if="showMessage">
              <div class="alert alert-success d-flex py-3 px-4" role="alert">
                <div>
                  <svg
                    id="check_circle_outline_black_24dp"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Path_1519"
                      data-name="Path 1519"
                      d="M0,0H24V24H0Z"
                      fill="none"
                    />
                    <path
                      id="Path_1520"
                      data-name="Path 1520"
                      d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.011,8.011,0,0,1,12,20ZM15.88,8.29,10,14.17,8.12,12.29A1,1,0,0,0,6.71,13.7L9.3,16.29a1,1,0,0,0,1.41,0L17.3,9.7a1,1,0,0,0,0-1.41,1.008,1.008,0,0,0-1.42,0Z"
                      fill="#00c897"
                    />
                  </svg>
                </div>
                <div class="pl-2">
                  <span
                    >We've sent you a secure link to reset your password</span
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12 mt-3">
              <input
                name="send"
                class="submitBnt btn btn-primary btn-round w-100"
                value="Change password"
                type="submit"
                :disabled="submitStatus === 'PENDING'"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import {
  required,
  email,
  minLength,
  helpers,
  sameAs,
} from 'vuelidate/lib/validators'
const uppercaseFormat = helpers.regex('uppercaseFormat', /[A-Z]/)
const lowercaseFormat = helpers.regex('lowercaseFormat', /[a-z]/)
const numberFormat = helpers.regex('numberFormat', /[0-9]/)
const specialCharFormat = helpers.regex(
  'specialCharFormat',
  /[!@#$%^&*(),.?":{}|<>]/
)
export default {
  data() {
    return {
      showMessage: false,
      reset: false,
      email: '',
      user_id: null,
      password: '',
      userData: [],
      //password2: '',
      submitStatus: 'PENDING',
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(8),
      uppercaseFormat,
      lowercaseFormat,
      numberFormat,
      specialCharFormat,
    },
    /*password2:{
	  sameAsPassword: sameAs('password')
	}*/
  },
  mounted() {
    console.log('mounted')
    if (this.$route.query.token && this.$route.query.token != '') {
      this.verifyUser()
    } else {
      this.showNotification('Token is missing.', 'error')
      this.$router.push('/')
    }
  },

  methods: {
    async verifyUser() {
      let token = await this.getToken()
      //console.log(token);
      const userRes = await fetch(
        'https://admin.supersites.io/users/?filter[password_token][_eq]=' +
          this.$route.query.token +
          '&access_token=' +
          token
      )
      const pr = await userRes.json()
      const uData = pr.data
      //console.log(uData);
      if (uData.length > 0) {
        this.userData = uData[0]
        //console.log(this.userData)
        this.user_id = this.userData.id
        this.email = this.userData.email
        this.submitStatus = null
      } else {
        this.showNotification('Token is expired.', 'error')
        this.$router.push('/')
      }
    },
    async submit() {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
        console.log('ERROR')
      } else {
        this.submitStatus = 'PENDING'
        console.log('form is validated')
        await this.changePassword()
      }
    },
    async changePassword() {
      let payload = {
        password: this.password,
        password_token: null,
      }
      let response = await this.updateUser(this.user_id, payload)
      //console.log(response)
      if (response) {
        this.showMessage = true
        this.submitStatus = null
        this.showNotification(
          'Password has been changed successfully.',
          'success'
        )
        this.$router.push('/login/')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
input#login_email:disabled {
  opacity: 0.8;
  background: #2d2b2b12;
}
</style>