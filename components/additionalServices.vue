<template>
  <div>
    <section
      class="service-top"
      id="home"
      :class="{ atf: !showTitle, 'admin-services': adminServices }"
    >
      <div class="home-center">
        <div class="home-desc-center">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-md-8">
                <div class="home-content">
                  <h1 class="home-title h2">
                    {{ $config[0].service.servicePage.heading }}
                  </h1>
                  <div
                    class="w-100 mt-4 pt-lg-1 body2"
                    v-html="$config[0].service.servicePage.description"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      class="services-pricing"
      :class="{ 'admin-services': adminServices }"
    >
      <div class="container">
        <div>
          <div
            class="media pricing-box"
            v-if="$config[0].service.products"
            v-for="(product, i) in $config[0].service.products"
          >
            <div class="row">
              <div class="col-lg-9 pr-lg-5">
                <div class="pricing-description">
                  <h3 class="h4 mb-4">{{ product.title }}</h3>
                  <div
                    class="text-muted mb-0 mt-2 body2"
                    v-html="product.description"
                  ></div>
                </div>
                <div
                  class="border-bottom pb-2 pb-md-0 mt-4 mt-md-4 d-md-none"
                ></div>
              </div>
              <div class="col-lg-3 pt-4 pt-md-5 pt-lg-0">
                <div
                  class="
                    pricing-plan
                    text-primary text-center text-md-left text-lg-center
                  "
                >
                  <h1 v-if="product.sales_price">
                    <span class="h2">${{ product.sales_price }}</span
                    ><small class="f-16 text-muted ml-1"
                      ><s class="h6">${{ product.regular_price }}</s></small
                    ><small
                      class="caption text-muted d-block mt-md-1"
                      v-if="product.discount_text"
                      >{{ product.discount_text }}</small
                    >
                  </h1>
                  <h1 v-if="!product.sales_price">
                    <span class="h2"> ${{ product.regular_price }}</span>
                    <small
                      class="f-16 text-muted d-block"
                      v-if="product.discount_text"
                      >{{ product.discount_text }}</small
                    >
                  </h1>
                  <div class="mt-4 mt-md-0 mt-lg-4">
                    <a
                      :class="{
                        'ss-btn ss-btn-primary ss-btn-wide':
                          productSelected.includes(product.id),
                        'ss-btn ss-btn-outline ss-btn-wide':
                          !productSelected.includes(product.id),
                      }"
                      href="#"
                      @click.prevent="
                        selectProduct(
                          product.id,
                          product.title,
                          product.regular_price,
                          product.sales_price
                        )
                      "
                      class="btn px-4 mx-auto"
                      >{{
                        productSelected.includes(product.id)
                          ? 'Selected'
                          : 'Select'
                      }}</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-5 pt-3 d-none d-lg-block">
          <h4 class="h4 mb-3">
            {{ this.productSelected.length }} item(s) selected. Cart total: ${{
              this.total
            }}
          </h4>
          <div class="my-4 pt-2">
            <a
              href="#"
              @click.prevent="doCheckout()"
              class="ss-btn"
              :class="adminServices ? 'ss-btn-primary' : 'ss-btn-bordered'"
              :disabled="submitStatus === 'PENDING'"
              >Proceed to Checkout
            </a>
          </div>
        </div>
        <div class="mobile-checkout-bar d-lg-none">
          <div>
            <h4>
              <span> {{ this.productSelected.length }} item(s) selected.</span>
              <span> Cart total: ${{ this.total }}</span>
            </h4>
          </div>
          <div>
            <a
              href="#"
              @click.prevent="doCheckout()"
              class="ss-btn ss-btn-primary ss-btn-small"
              :disabled="submitStatus === 'PENDING'"
              ><span class="d-none d-md-inline">Proceed to </span> Checkout
            </a>
          </div>
        </div>
        <Checkout :show="show" :amount="total" :products="productsName" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  mounted() {
    $('[data-toggle="tooltip"]').tooltip()
  },
  props: {
    showTitle: {
      type: Boolean,
      default: true,
    },
    adminServices: Boolean,
  },
  data() {
    return {
      productSelected: [],
      productsName: [],
      total: 0,
      submitStatus: 'PENDING',
      show: false,
    }
  },
  methods: {
    doCheckout() {
      console.log('checkout')
      this.show = true
      var that = this
      setTimeout(function () {
        that.$scrollTo('#stripe-container', 500, { offset: -200 })
      }, 500)
    },
    selectProduct(id, title, regular_price, sales_price) {
      console.log(id, title)
      //console.log(this.productSelected.includes(id))
      if (!this.productSelected.includes(id)) {
        this.productSelected.push(id)
        this.productsName.push(title)
        if (sales_price) {
          this.total = this.total + sales_price
        } else {
          this.total = this.total + regular_price
        }
        this.submitStatus = null
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.media {
  .border-left {
    @media (max-width: 991px) {
      border: none !important;
    }
  }
}
a.checkout-btn[disabled] {
  opacity: 0.5;
  pointer-events: none;
}
</style>