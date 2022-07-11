<template>
  <div>
    <div class="pl-0 pl-lg-2">
      <h1 class="h3 mb-3">Login</h1>

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

            <div class="col-lg-12">
              <div class="form-group mt-3 mb-0">
                <input
                  name="password"
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
          </div>

          <div class="row">
            <div class="col-lg-12 mt-3">
              <input
                name="send"
                class="submitBnt ss-btn ss-btn-primary w-100"
                value="Sign in"
                type="submit"
                :disabled="submitStatus === 'PENDING'"
              />
            </div>
            <div class="col-lg-12">
              <div class="form-group mt-4 text-center">
                <nuxt-link to="/forgot-password/" class="text-muted"
                  >Forgot password?</nuxt-link
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
import { required, email, minLength, helpers } from 'vuelidate/lib/validators'
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
      showForm: true,
      email: '',
      password: '',
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
            that.verifylogin(password, res.data.data)
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
    async verifylogin(password, data) {
      var that = this
      axios({
        method: 'post',
        timeout: 10000,
        url: 'https://admin.supersites.io/custom/data7-endpoint/verifylogin/',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          user_id: data.id,
          password: password,
        },
      })
        .then((res) => {
          console.log(res.data)
          that.$store.dispatch('setCurrentUser', data)
          that.showNotification('You have logged-in successfully', 'success')
          that.$router.push('/my-account/')
        })
        .catch((err) => {
          //console.log(err.response);
          that.showNotification('Invalid user credentials', 'error')
          that.submitStatus = null
        })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>