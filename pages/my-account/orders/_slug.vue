<template>
  <div>
    <Header theme="light" />
    <admin-page>
      <admin-page-top>
        <h1 class="h2" v-if="flag && order_type == 'subscription'">
          Order {{ $route.params.slug }} -
          {{ orders.order_id.status | capitalize }}
        </h1>
        <h1 class="h2" v-if="flag && order_type == 'services'">
          Order {{ $route.params.slug }} -
          {{ orders.status | capitalize }}
        </h1>
      </admin-page-top>
      <admin-page-content>
        <div class="dashboard-table">
          <div class="table-row row m-0 th align-items-center">
            <div class="col-2 p-0">
              <div><span>Date</span></div>
            </div>
            <div class="col-2 p-0">
              <div><span>Order ID</span></div>
            </div>
            <div class="col-2 p-0">
              <div><span>Amount</span></div>
            </div>
            <!-- for subscription type -->
            <div class="col-2 p-0" v-if="order_type == 'subscription'">
              <div><span>Selected plan</span></div>
            </div>
            <div class="col-2 p-0" v-if="order_type == 'subscription'">
              <div><span>Theme ID</span></div>
            </div>
            <div class="col-2 p-0" v-if="order_type == 'subscription'">
              <div><span>Cancellation</span></div>
            </div>
            <!-- for subscription type -->

            <!-- for services type -->
            <div class="col-3 p-0" v-if="order_type == 'services'">
              <div><span>Services</span></div>
            </div>
            <div class="col-1 p-0" v-if="order_type == 'services'">
              <div><span>Status</span></div>
            </div>
            <!-- for services type -->
          </div>

          <div class="table-row row m-0 align-items-center" v-if="flag">
            <div class="p-0 col-2">
              <div>
                <span>{{
                  new Date(orders.date_created) | dateFormat('MMMM DD, YYYY')
                }}</span>
              </div>
            </div>
            <!-- for subscription type -->
            <div class="p-0 col-2" v-if="order_type == 'subscription'">
              <div>
                <span>{{ orders.order_id.id }}</span>
              </div>
            </div>
            <div class="p-0 col-2" v-if="order_type == 'subscription'">
              <div>
                <span>{{ orders.order_id.amount_total | currencyFormat }}</span>
              </div>
            </div>

            <div class="p-0 col-2" v-if="order_type == 'subscription'">
              <div>
                <span>{{ orders.selected_plan.title }}</span>
              </div>
            </div>
            <div class="p-0 col-2" v-if="order_type == 'subscription'">
              <div>
                <nuxt-link :to="`/themes/` + orders.selected_theme + `/`"
                  ><span>{{ orders.selected_theme }}</span></nuxt-link
                >
              </div>
            </div>
            <div class="p-0 col-2" v-if="order_type == 'subscription'">
              <div>
                <a
                  v-if="orders.order_id.status == 'active'"
                  href="#"
                  :disabled="submitStatus === 'PENDING'"
                  @click.prevent="
                    cancelOrder(
                      orders.order_id.id,
                      orders.order_id.subscription_id
                    )
                  "
                  class="btn-reset btn d-block"
                >
                  {{ btnMessage }}
                </a>
                <span v-if="orders.order_id.status == 'canceled'"
                  >Canceled at:
                  {{
                    new Date(orders.order_id.canceled_at * 1000)
                      | dateFormat('MMMM DD, YYYY')
                  }}</span
                >
              </div>
            </div>
            <!-- for subscription type -->

            <!-- for services type -->
            <div class="p-0 col-2" v-if="order_type == 'services'">
              <div>
                <span>{{ orders.id }}</span>
              </div>
            </div>
            <div class="p-0 col-2" v-if="order_type == 'services'">
              <div>
                <span>{{ orders.amount_total | currencyFormat }}</span>
              </div>
            </div>
            <div class="p-0 col-3" v-if="order_type == 'services'">
              <div>
                <span>{{ orders.services }}</span>
              </div>
            </div>
            <div class="p-0 col-1" v-if="order_type == 'services'">
              <div>
                <span>{{ orders.payment_status | capitalize }}</span>
              </div>
            </div>
            <!-- for services type -->
          </div>
          <div class="table-row row m-0 align-items-center" v-if="!flag">
            <div class="p-0 col-12 text-center">
              <div>{{ notFoundMessage }}</div>
            </div>
          </div>
        </div>
      </admin-page-content>
    </admin-page>

    <Footer />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  middleware: 'auth',
  data() {
    return {
      notFoundMessage: 'Loading...',
      orders: [],
      order_type: null,
      btnMessage: 'Cancel',
      submitStatus: null,
      flag: false,
    }
  },
  async fetch() {
    //console.log('fetch');
    let token = await this.getToken()
    const orderType = await fetch(
      'https://admin.supersites.io/items/orders/' +
        this.$route.params.slug +
        '/?fields=*&access_token=' +
        token
    )
    const ot = await orderType.json()
    //console.log(ot.data)
    if (ot.data) {
      this.order_type = ot.data.type
      if (this.order_type == 'subscription') {
        const ordersRes = await fetch(
          'https://admin.supersites.io/items/projects/?fields=id,date_created,selected_theme,selected_plan.title,order_id.id,order_id.amount_total,order_id.status,order_id.subscription_id,order_id.canceled_at&filter[order_id][_eq]=' +
            this.$route.params.slug +
            '&access_token=' +
            token
        )
        const or = await ordersRes.json()
        if (or.data.length > '0') {
          this.flag = true
          this.orders = or.data[0]
          //console.log(this.orders);
        } else {
          this.notFoundMessage = "Order doesn't exist."
        }
      } else if (this.order_type == 'services') {
        this.orders = ot.data
        this.flag = true
        //console.log(this.orders);
        if (this.orders.length == '0') {
          this.notFoundMessage = "Order doesn't exist."
        }
      }
    } else {
      this.notFoundMessage = "Order doesn't exist."
    }
  },
  methods: {
    cancelOrder(id, subscription_id) {
      console.log(id, subscription_id)
      var that = this
      swal({
        title: 'Are you sure?',
        text: 'Your order will be cancelled!',
        icon: 'warning',
        buttons: {
          cancel: {
            text: 'No',
            value: null,
            visible: true,
            className: '',
            closeModal: true,
          },
          confirm: {
            text: 'Yes, Cancel',
            value: true,
            visible: true,
            className: '',
            closeModal: true,
          },
        },
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          that.submitStatus = 'PENDING'
          that.btnMessage = 'Please wait...'
          that.processCancellation(id, subscription_id)
        } else {
          //swal("Your imaginary file is safe!");
        }
      })
    },
    async processCancellation(id, subscription_id) {
      console.log(subscription_id)
      var that = this
      await axios({
        method: 'post',
        timeout: 5000,
        url: 'https://0707.io/stripe/cancelSubscription.php',
        data: {
          subscription_id: subscription_id,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          console.log(res.data)
          if (res.data.status == 'success') {
            console.log(res.data.data)
            that.updateOrder(id, res.data.data)
          } else {
            that.submitStatus = null
            that.btnMessage = 'Cancel'
            that.showNotification(res.data.message, 'error')
          }
        })
        .catch(
          (err) => console.error(err),
          (this.submitStatus = null),
          (this.btnMessage = 'Cancel')
        )
    },
    async updateOrder(id, data) {
      let payload = {
        status: data.status,
        canceled_at: data.canceled_at,
      }
      let response = await this.updateItem('orders', id, payload)
      console.log(response)
      if (response) {
        this.$fetch()
        this.submitStatus = null
        this.btnMessage = 'Cancel'
        this.showNotification(
          'Your order is cancelled successfully.',
          'success'
        )
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>