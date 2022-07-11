<template>
  <div
    class="cell stripeDiv product-checkout"
    id="stripe-container"
    :class="{ active: show }"
  >
    <form>
      <fieldset>
        <legend
          class="card-only"
          data-tid="elements_stripeDivs.form.pay_with_card"
        >
          Pay with card
        </legend>
        <legend
          class="payment-request-available"
          data-tid="elements_stripeDivs.form.enter_card_manually"
        >
          Or enter card details
        </legend>
        <div class="container">
          <div id="product-checkout-card"></div>
          <button
            type="submit"
            data-tid="elements_stripeDivs.form.donate_button"
            :disabled="submitStatus === 'PENDING'"
          >
            {{ btnText }} ${{ amount }}
          </button>
        </div>
      </fieldset>
      <div class="card-error" role="alert">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 17 17"
        >
          <path
            class="base"
            fill="#000"
            d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
          ></path>
          <path
            class="glyph"
            fill="#FFF"
            d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
          ></path>
        </svg>
        <span class="message"></span>
      </div>
    </form>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  head: {
    script: [
      {
        src: 'https://js.stripe.com/v3/',
      },
    ],
  },
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    amount: Number,
    products: Array,
  },
  data() {
    return {
      submitStatus: null,
      btnText: 'Pay',
    }
  },
  mounted() {
    var that = this
    setTimeout(function () {
      var stripe = Stripe('pk_test_Q0o6I4Bcqt8DK7tkI6wIitsq')
      var elements = stripe.elements({
        fonts: [
          {
            cssSrc: 'https://rsms.me/inter/inter.css',
          },
        ],
      })
      /**
       * Card Element
       */
      var card = elements.create('card', {
        style: {
          base: {
            color: '#32325D',
            fontWeight: 500,
            fontFamily: 'Inter, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            '::placeholder': {
              color: '#CFD7DF',
            },
          },
          invalid: {
            color: '#E25950',
          },
        },
      })

      card.mount('#product-checkout-card')

      /**
       * Payment Request Element
       */
      var paymentRequest = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          amount: that.$props.amount,
          label: 'Total',
        },
      })
      paymentRequest.on('token', function (result) {
        var stripeDiv = document.querySelector('.product-checkout')
        stripeDiv.querySelector('.token').innerText = result.token.id
        stripeDiv.classList.add('submitted')
        result.complete('success')
      })

      var paymentRequestElement = elements.create('paymentRequestButton', {
        paymentRequest: paymentRequest,
        style: {
          paymentRequestButton: {
            type: 'donate',
          },
        },
      })

      paymentRequest.canMakePayment().then(function (result) {
        if (result) {
          document.querySelector('.product-checkout .card-only').style.display =
            'none'
          document.querySelector(
            '.product-checkout .payment-request-available'
          ).style.display = 'block'
          paymentRequestElement.mount('#product-checkout-paymentRequest')
        }
      })
      that.registerElements(
        [card, paymentRequestElement],
        'product-checkout',
        stripe,
        that
      )
    }, 1000)
  },
  methods: {
    async capturePayment(token_id) {
      //console.log(token_id,this.$props.amount)
      var that = this
      await axios({
        method: 'post',
        timeout: 5000,
        url: 'https://0707.io/stripe/captureCharge.php',
        data: {
          token: token_id,
          amount: this.$props.amount,
          products: this.products.join(','),
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          //console.log(res.data)
          if (res.data.status == 'success') {
            //console.log(res.data.data)
            that.insertOrder(res.data.data)
          } else {
            that.submitStatus = null
            that.showNotification(res.data.message, 'error')
          }
        })
        .catch((err) => console.error(err), (this.submitStatus = null))
    },
    async insertOrder(data) {
      if (data.status == 'succeeded') {
        let payload = {
          email: this.$store.state.currentUser.email,
          name:
            this.$store.state.currentUser.first_name +
            ' ' +
            this.$store.state.currentUser.last_name,
          amount_total: this.$props.amount,
          payment_status: data.status,
          subscription_id: data.charge_id,
          items: data.items,
          type: 'services',
          services: this.products.join(','),
          status: 'active',
        }
        let response = await this.postItem('orders', payload)
        //console.log(response)
        if (response) {
          this.submitStatus = null
          this.showNotification(
            'Thanks, Your payment is done successfully',
            'success'
          )
          this.$router.push('/my-account/orders/')
        }
      } else {
        this.showNotification(
          'Sorry, Your payment status is ' +
            data.status +
            ' due to ' +
            data.items.failure_message,
          'error'
        )
      }
    },
    registerElements(elements, stripeDivName, stripe, that) {
      var formClass = '.' + stripeDivName
      var stripeDiv = document.querySelector(formClass)

      var form = stripeDiv.querySelector('form')
      var resetButton = stripeDiv.querySelector('a.reset')
      var error = form.querySelector('.card-error')
      var errorMessage = error.querySelector('.message')

      function enableInputs() {
        //console.log('enableInputs');
        Array.prototype.forEach.call(
          form.querySelectorAll(
            "input[type='text'], input[type='email'], input[type='tel']"
          ),
          function (input) {
            input.removeAttribute('disabled')
          }
        )
      }

      function disableInputs() {
        //console.log('disableInputs');
        Array.prototype.forEach.call(
          form.querySelectorAll(
            "input[type='text'], input[type='email'], input[type='tel']"
          ),
          function (input) {
            input.setAttribute('disabled', 'true')
          }
        )
      }

      function triggerBrowserValidation() {
        // The only way to trigger HTML5 form validation UI is to fake a user submit
        // event.
        var submit = document.createElement('input')
        submit.type = 'submit'
        submit.style.display = 'none'
        form.appendChild(submit)
        submit.click()
        submit.remove()
      }

      // Listen for errors from each Element, and show error messages in the UI.
      var savedErrors = {}
      elements.forEach(function (element, idx) {
        element.on('change', function (event) {
          if (event.error) {
            error.classList.add('visible')
            savedErrors[idx] = event.error.message
            errorMessage.innerText = event.error.message
          } else {
            savedErrors[idx] = null

            // Loop over the saved errors and find the first one, if any.
            var nextError = Object.keys(savedErrors)
              .sort()
              .reduce(function (maybeFoundError, key) {
                return maybeFoundError || savedErrors[key]
              }, null)

            if (nextError) {
              // Now that they've fixed the current error, show another one.
              errorMessage.innerText = nextError
            } else {
              // The user fixed the last error; no more errors.
              error.classList.remove('visible')
            }
          }
        })
      })

      // Listen on the form's 'submit' handler...
      form.addEventListener('submit', function (e) {
        e.preventDefault()

        // Trigger HTML5 validation UI on the form if any of the inputs fail
        // validation.
        var plainInputsValid = true
        Array.prototype.forEach.call(
          form.querySelectorAll('input'),
          function (input) {
            if (input.checkValidity && !input.checkValidity()) {
              plainInputsValid = false
              return
            }
          }
        )
        if (!plainInputsValid) {
          triggerBrowserValidation()
          return
        }

        // Show a loading screen...
        stripeDiv.classList.add('submitting')

        // Disable all inputs.
        disableInputs()

        // Gather additional customer data we may have collected in our form.
        var zip = form.querySelector('#' + stripeDivName + '-zip')
        var additionalData = {
          name: that.$store.state.currentUser.email,
          address_zip: zip ? zip.value : undefined,
        }

        // Use Stripe.js to create a token. We only need to pass in one Element
        // from the Element group in order to create a token. We can also pass
        // in the additional customer data we collected in our form.
        stripe.createToken(elements[0], additionalData).then(function (result) {
          // Stop loading!
          stripeDiv.classList.remove('submitting')

          if (result.token) {
            // If we received a token, show the token ID.
            console.log(result.token.id)
            //that.btnText = "Processing...";
            that.submitStatus = 'PENDING'
            stripeDiv.classList.add('submitted')
            that.capturePayment(result.token.id)
          } else {
            // Otherwise, un-disable inputs.
            enableInputs()
          }
        })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.stripeDiv.product-checkout {
  background-color: transparent;
  margin-top: 20px;
  min-height: 230px;
  display: none;
}
.stripeDiv.product-checkout.active {
  display: block;
}
.stripeDiv.product-checkout * {
  font-family: Inter UI, Open Sans, Segoe UI, sans-serif;
  font-size: 16px;
  font-weight: 500;
}

.stripeDiv.product-checkout form {
  max-width: 496px !important;
  padding: 40px;
  margin: 0 auto;
}
.stripeDiv.product-checkout .container {
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  padding: 3px;
}

.stripeDiv.product-checkout fieldset {
  border-style: none;
  padding: 5px;
  margin-left: -5px;
  margin-right: -5px;
  background: rgba(18, 91, 152, 0.05);
  border-radius: 8px;
}

.stripeDiv.product-checkout fieldset legend {
  float: left;
  width: 100%;
  text-align: center;
  font-size: 13px;
  color: #fff;
  padding: 3px 10px 7px;
}

.stripeDiv.product-checkout .card-only {
  display: block;
}
.stripeDiv.product-checkout .payment-request-available {
  display: none;
}

.stripeDiv.product-checkout fieldset legend + * {
  clear: both;
}

.stripeDiv.product-checkout input,
.stripeDiv.product-checkout button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  border-style: none;
  color: #fff;
}

.stripeDiv.product-checkout input:-webkit-autofill {
  transition: background-color 100000000s;
  -webkit-animation: 1ms void-animation-out;
}

.stripeDiv.product-checkout #product-checkout-card {
  padding: 10px;
  margin-bottom: 2px;
}

.stripeDiv.product-checkout input {
  -webkit-animation: 1ms void-animation-out;
}

.stripeDiv.product-checkout input::-webkit-input-placeholder {
  color: #9bacc8;
}

.stripeDiv.product-checkout input::-moz-placeholder {
  color: #9bacc8;
}

.stripeDiv.product-checkout input:-ms-input-placeholder {
  color: #9bacc8;
}

.stripeDiv.product-checkout button {
  display: block;
  width: 100%;
  height: 37px;
  background-color: #5765ff;
  border-radius: 2px;
  color: #fff;
  cursor: pointer;
}

.stripeDiv.product-checkout button:active {
  background-color: #5765ffba;
}

.stripeDiv.product-checkout .card-error svg .base {
  fill: #e25950;
}

.stripeDiv.product-checkout .card-error svg .glyph {
  fill: #f6f9fc;
}

.stripeDiv.product-checkout .card-error .message {
  color: #e25950;
}

.stripeDiv.product-checkout .success .icon .border {
  stroke: #ffc7ee;
}

.stripeDiv.product-checkout .success .icon .checkmark {
  stroke: #d782d9;
}

.stripeDiv.product-checkout .success .title {
  color: #32325d;
}

.stripeDiv.product-checkout .success .message {
  color: #fff;
}

.stripeDiv.product-checkout .success .reset path {
  fill: #d782d9;
}
.stripeDiv .card-error {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  margin-top: 20px;
  left: 0;
  padding: 0 15px;
  font-size: 13px !important;
  opacity: 0;
  transform: translateY(10px);
  transition-property: opacity, transform;
  transition-duration: 0.35s;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
}
.stripeDiv .card-error.visible {
  opacity: 1;
  transform: none;
}
.stripeDiv .card-error svg {
  -ms-flex-negative: 0;
  flex-shrink: 0;
  margin-top: 3px;
  margin-right: 10px;
}
</style>