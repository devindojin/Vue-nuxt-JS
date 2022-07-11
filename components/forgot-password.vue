<template>
  <div>
    <div class="pl-0 pl-lg-2">
      <h1 class="h3 mb-3">Forgot password</h1>

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
                  name="email"
                  id="login_email"
                  class="form-control"
                  type="email"
                  v-model.trim="$v.email.$model"
                  :class="{ warning: $v.email.$error }"
                  placeholder="Email"
                />
                <label class="contact-lable static" for="login_email"
                  >Email</label
                >

                <span
                  class="form-warning"
                  v-if="!$v.email.required && $v.email.$error"
                  >Email is required.</span
                >
                <span class="form-warning" v-if="!$v.email.email"
                  >Invalid email.</span
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
                class="submitBnt ss-btn ss-btn-primary w-100"
                value="Reset password"
                type="submit"
                :disabled="submitStatus === 'PENDING'"
              />
            </div>
            <div class="col-lg-12">
              <div class="form-group mt-4 text-center">
                <nuxt-link to="/login/" class="text-muted">Sign in</nuxt-link>
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
import { required, email } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      showMessage: false,
      email: '',
      submitStatus: null,
    }
  },
  validations: {
    email: {
      required,
      email,
    },
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
        await this.checkEmailExist(this.email, this.password)
      }
    },
    async checkEmailExist(email, password) {
      var that = this
      await axios({
        method: 'post',
        timeout: 10000,
        url: 'https://admin.supersites.io/custom/data7-endpoint/',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email: email,
        },
      })
        .then((res) => {
          console.log(res.data)
          if (res.data.status == '2') {
            that.callRequestPasswordReset(email)
          } else if (res.data.status == '1') {
            that.showNotification(
              'This email is not registered with us.Please try correct one.',
              'error'
            )
            that.submitStatus = null
          }
        })
        .catch((err) => console.error(err))
    },
    async callRequestPasswordReset(email) {
      let response = await this.requestPasswordReset(email)
      console.log(response)
      this.showMessage = true
      this.submitStatus = null
    },
  },
}
</script>

<style lang="scss" scoped>
</style>