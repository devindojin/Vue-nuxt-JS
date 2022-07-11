<template>
  <div>
    <div class="pl-0 pl-lg-2">
      <h1 class="h3 mb-3">Reset password</h1>

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
              <div class="form-group mt-3 mb-0">
                <input
                  name="password"
                  id="login_password"
                  class="form-control"
                  type="password"
                  v-model.trim="$v.password.$model"
                  :class="{ warning: $v.password.$error }"
                  placeholder="Enter new Password"
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

            <div class="col-lg-12">
              <div class="form-group mt-3 mb-0">
                <input
                  name="password2"
                  class="form-control"
                  type="password"
                  v-model.trim="$v.password2.$model"
                  :class="{ warning: $v.password2.$error }"
                  placeholder="Enter same password"
                />
                <label class="contact-lable static" for="login_password"
                  >Confirm Password</label
                >
                <span class="form-warning" v-if="!$v.password2.sameAsPassword"
                  >Passwords must be identical.</span
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
                  <span>Password successfully reset</span>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12 mt-3">
              <input
                name="send"
                class="submitBnt ss-btn ss-btn-primary w-100"
                value="Reset password"
                type="submit"
                :disabled="submitStatus === 'PENDING'"
                v-if="!reset"
              />
            </div>
            <div class="col-lg-12">
              <div class="form-group mt-4 text-center">
                <nuxt-link to="/login/" class="text-muted" v-if="!reset"
                  >Sign in</nuxt-link
                >
                <nuxt-link
                  to="/login/"
                  class="submitBnt btn btn-primary btn-round w-100"
                  v-if="reset"
                  >Sign in</nuxt-link
                >
              </div>
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
      password: '',
      password2: '',
      submitStatus: null,
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
    password2: {
      sameAsPassword: sameAs('password'),
    },
  },
  mounted() {
    console.log('mounted')
    if (this.$route.query.token) {
      //console.log(this.$route.query.token)
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    async submit() {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
        console.log('ERROR')
      } else {
        this.submitStatus = 'PENDING'
        console.log('form is validated')
        await this.callPasswordReset(this.password)
      }
    },
    async callPasswordReset(password) {
      let response = await this.doPasswordReset(
        this.$route.query.token,
        password
      )
      console.log(response)
      this.showMessage = true
      this.reset = true
      this.submitStatus = null
    },
  },
}
</script>

<style lang="scss" scoped>
</style>