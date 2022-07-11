<template>
  <div class="col-lg-4 mt-4">
    <div
      class="pricing-box rounded border"
      v-bind:class="{ 'border-primary bg-primary': pricing.popular == 'yes' }"
    >
      <div class="pricing-content">
        <div class="pricing-lable d-none" v-if="pricing.popular == 'yes'">
          Popular
        </div>
        <h5
          class="text-uppercase text-center h5 mb-3"
          v-bind:class="{ 'text-white': pricing.popular == 'yes' }"
        >
          {{ pricing.title }}
        </h5>
        <div>
          <p
            class="text-muted text-center mb-4 pb-1"
            v-bind:class="{ 'text-white': pricing.popular == 'yes' }"
          >
            {{ pricing.description }}
          </p>
        </div>

        <div class="pricing-plan mt-4 text-black text-center">
          <h1 v-bind:class="{ 'text-white': pricing.popular == 'yes' }">
            ${{ pricing.amount
            }}<small
              class="f-16 text-muted"
              v-bind:class="{ 'text-white': pricing.popular == 'yes' }"
              >/ Mo</small
            >
            <small
              class="f-16 text-muted d-block"
              v-bind:class="{ 'text-white': pricing.popular == 'yes' }"
              >{{ pricing.down_text }}</small
            >
          </h1>
        </div>
        <div class="my-5">
          <button
            type="button"
            class="btn btn-outline-dark w-100 border-2"
            v-bind:class="{
              'text-white border-white': pricing.popular == 'yes',
            }"
          >
            Select
          </button>
        </div>

        <div class="pricing-border mt-3"></div>
        <!-- <button @click="submit(pricing.stripe_price_id,pricing.stripe_monthly_price)" class="btn btn-primary btn-round">Select</button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pricing: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {},
}
</script>
