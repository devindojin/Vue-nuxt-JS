<template>
  <section class="bg-home" id="home">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-7">
          <div class="home-content">
            <h1 class="h2" v-html="data.heading"></h1>
            <a href="#" class="mt-4 ss-btn ss-btn-primary">{{
              data.cta_title_1
            }}</a>
            <span>or</span>
            <nuxt-link
              :to="data.cta_url_2"
              class="btn btn-outline-success ss-btn"
              >{{ data.cta_title_2 }}
            </nuxt-link>
            <p class="my-3">{{ data.description }}</p>
          </div>
        </div>
      </div>
      <div class="row mt-5 pt-4">
        <template v-for="(pricing, index) in pricingItems">
          <pricing-column :pricing="pricing" :key="index" />
        </template>
      </div>
      <div class="row align-items-center my-5">
        <div class="col-lg-12">
          <h6 class="h6 text-success text-center">Compare plan features</h6>
        </div>
      </div>
      <pricing-features :features="features" :pricingItems="pricingItems" />
    </div>
  </section>
</template>

<script>
import PricingColumn from './pricing-column'
export default {
  components: {
    PricingColumn,
  },
  props: {
    data: [Array, Object],
    pricingItems: [Array, Object],
    features: [Array, Object],
  },
  mounted() {
    $('[data-toggle="tooltip"]').tooltip()
  },
}
</script>