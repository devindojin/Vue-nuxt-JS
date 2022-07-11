<template>
  <div class="subscribe-form" id="subscribe-form">
    <div class="default" v-if="showForm">
      <h3 class="h3 mb-3 mb-md-4">Like what you read?</h3>
      <p>
        Consider subscribing to our newsletter for tips, best practices &
        updates.
      </p>
    </div>
    <div class="thankyou" v-if="!showForm">
      <h2 class="h3 mb-3 mb-md-4">Thank you for subscribing!</h2>
      <p>
        Additional steps maybe required to verify your subscription. Please
        check your inbox for details.
      </p>
      <div class="icon-envelop">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="128"
          height="128"
          viewBox="0 0 128 128"
        >
          <path
            id="Email-icon"
            d="M106.75,31.892V0H21.25V31.892L0,47.742V113a15.016,15.016,0,0,0,15,15h98a15.016,15.016,0,0,0,15-15V47.742ZM114.2,49.927l-7.453,5.544v-11.1ZM96.75,10V62.909L64,87.269,31.25,62.909V10ZM21.25,55.471,13.8,49.927l7.453-5.559ZM113,118H15a5.006,5.006,0,0,1-5-5V59.566L64,99.731l54-40.165V113A5.006,5.006,0,0,1,113,118ZM86.75,35H41.25V25h45.5Zm-10,17.5H41.25v-10h35.5Zm0,0"
            fill="#d0d6e2"
          />
        </svg>
      </div>
    </div>
    <form
      id="myform"
      action="#"
      method="POST"
      v-if="showForm"
      @submit.prevent="submit"
    >
      <input type="hidden" name="retURL" :value="pageUrl" />
      <input type="hidden" name="spam_check" :value="spam_check" />
      <div class="subscribe-form-inner">
        <div class="subscribe-form-col">
          <input
            class="subscribe-form-input form-input"
            :class="{ warning: $v.first_name.$error }"
            type="text"
            name="first_name"
            id="first_name"
            v-model.trim="$v.first_name.$model"
            placeholder="First Name"
          />
          <span
            class="form-warning"
            v-if="!$v.first_name.required && $v.first_name.$error"
          >
            Name is required
          </span>
          <span class="form-warning" v-if="!$v.first_name.minLength">
            Name must have at least
            {{ $v.first_name.$params.minLength.min }} letters.
          </span>
        </div>
        <div class="subscribe-form-col">
          <input
            class="subscribe-form-input form-input"
            :class="{ warning: $v.email.$error }"
            type="text"
            name="email"
            id="email"
            v-model.trim="$v.email.$model"
            placeholder="Email"
          />
          <span
            class="form-warning"
            v-if="!$v.email.required && $v.email.$error"
          >
            Email is required
          </span>
          <span class="form-warning" v-if="!$v.email.email">Invalid email</span>
        </div>

        <button
          class="w-100 ss-btn ss-btn-primary"
          type="submit"
          :disabled="submitStatus === 'PENDING'"
        >
          <span>
            {{ submitStatus == 'PENDING' ? 'Sending...' : 'Subscribe' }}
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      showForm: true,
      first_name: '',
      email: '',
      submitStatus: null,
      oid: '00D3t000002mH4M',
      Campaign_ID: '7013t000001kuFRAAY',
      lead_source: 'Website',
      spam_check: '',
    }
  },
  mounted() {},
  validations: {
    first_name: {
      required,
      minLength: minLength(2),
    },
    email: {
      required,
      email,
    },
  },
  methods: {
    submit() {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
        console.log('ERROR')
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        console.log('form is validated')
        let spam = this.spam_check
        if (spam == '') {
          axios({
            url: 'https://0707.io/subscribe/supersites.php',
            method: 'POST',
            data:
              'first_name=' +
              this.first_name +
              '&email=' +
              this.email +
              '&oid=' +
              this.oid +
              '&Campaign_ID=' +
              this.Campaign_ID +
              '&lead_source=' +
              this.lead_source,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-type': 'application/x-www-form-urlencoded',
            },
          })
            .then((response) => {
              // JSON responses are automatically parsed.
              this.showForm = false
              this.submitStatus = 'OK'
            })
            .catch((e) => {
              //this.errors.push(e)
              console.log(e)
              this.showNotification(e, 'error')
            })
        }
      }
    },
  },
  computed: {
    pageUrl() {
      if (process.isClient) {
        return (
          window.location.origin + window.location.pathname + '?response=true'
        )
      }
    },
  },
}
</script>
