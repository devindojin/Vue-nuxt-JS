<template>
  <div>
    <Header theme="light" />
    <admin-page>
      <admin-page-top>
        <h1 class="h2">Your orders</h1>
      </admin-page-top>
      <admin-page-content>
        <div class="dashboard-table">
          <div class="table-row row m-0 th align-items-center">
            <div class="p-0 col-3">
              <div><span>Order Date</span></div>
            </div>
            <div class="p-0 col-3">
              <div><span>Order ID</span></div>
            </div>
            <div class="p-0 col-2">
              <div><span>Amount</span></div>
            </div>
            <div class="p-0 col-2">
              <div><span>Type</span></div>
            </div>
            <div class="p-0 col-2 text-right-">
              <div><span>Status</span></div>
            </div>
          </div>
          <div
            class="table-row align-items-center row m-0"
            v-for="order in orders"
            v-if="orders.length > 0"
          >
            <div class="p-0 col-3">
              <div>
                <span>{{
                  new Date(order.date_created) | dateFormat('MMMM DD, YYYY')
                }}</span>
              </div>
            </div>
            <div class="p-0 col-3">
              <div>
                <nuxt-link :to="'/my-account/orders/' + order.id + '/'"
                  ><span>{{ order.id }}</span>
                </nuxt-link>
              </div>
            </div>
            <div class="p-0 col-2">
              <div>
                <span>{{ order.amount_total | currencyFormat }}</span>
              </div>
            </div>
            <div class="p-0 col-2">
              <div>
                <span>{{ order.type | capitalize }}</span>
              </div>
            </div>
            <div class="p-0 col-2 text-right-">
              <div>
                <span>{{ order.status | capitalize }}</span>
              </div>
            </div>
          </div>
          <div
            class="table-row align-items-center row m-0"
            v-if="orders.length == 0"
          >
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
export default {
  middleware: 'auth',
  data() {
    return {
      notFoundMessage: 'Loading...',
      orders: [],
    }
  },
  async fetch() {
    //console.log('fetch');
    let token = await this.getToken()
    const ordersRes = await fetch(
      'https://admin.supersites.io/items/orders/?fields=id,date_created,amount_total,status,type&filter[email][_eq]=' +
        this.$store.state.currentUser.email +
        '&access_token=' +
        token
    )
    const or = await ordersRes.json()
    this.orders = or.data
    //console.log(this.orders);
    if (this.orders.length == '0') {
      this.notFoundMessage = 'No order found.'
    }
  },
}
</script>

<style lang="scss" scoped>
</style>