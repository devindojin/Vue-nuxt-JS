<template>
  <div>
    <h4 class="h5 mb-3">Select Plan</h4>
    <div class="sidebar-pricing">
      <div>
        <div
          class="plan-item"
          v-for="(plan, index) of $config[0].plans"
          :key="index"
          :class="{ active: activePlan == index }"
        >
          <div
            class="
              plan-title
              py-2
              mt-1
              d-flex
              align-items-center
              justify-content-between
            "
          >
            <div
              @click="selectPlan(plan.id)"
              class="
                d-flex
                align-items-center
                justify-content-between
                flex-auto
              "
            >
              <div class="flex-auto">
                <svg
                  id="radio_button_checked_black_24dp"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    id="Path_1338"
                    data-name="Path 1338"
                    d="M0,0H24V24H0Z"
                    fill="none"
                  />
                  <path
                    id="Path_1339"
                    data-name="Path 1339"
                    d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                    :fill="selectedPlan.id == plan.id ? '#4252fd' : '#BDC2CE'"
                  />
                  <circle
                    id="Ellipse_105"
                    data-name="Ellipse 105"
                    cx="5"
                    cy="5"
                    r="5"
                    transform="translate(7 7)"
                    :fill="selectedPlan.id == plan.id ? '#4252fd' : '#FFF'"
                  />
                </svg>

                <strong
                  class="plan-title-text"
                  :class="selectedPlan.id == plan.id ? 'text-primary' : ''"
                >
                  {{ plan.title }}
                </strong>
                <span class="badge badge-primary" v-if="plan.popular == 'yes'"
                  >Most popular</span
                >
              </div>
              <div class="text-right flex-auto">
                <strong>
                  <span class="text-primary">${{ plan.amount }}</span></strong
                ><small class="f-14 text-muted"> / Mo</small>
                <small class="f-14 text-muted d-block">{{
                  plan.down_text
                }}</small>
              </div>
            </div>

            <div @click="expandAccordion(index)" class="pl-2">
              <svg
                id="expand_more_black_24dp"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  id="Path_1335"
                  data-name="Path 1335"
                  d="M24,24H0V0H24Z"
                  fill="none"
                  opacity="0.87"
                />
                <path
                  id="Path_1336"
                  data-name="Path 1336"
                  d="M15.88,9.29,12,13.17,8.12,9.29A1,1,0,0,0,6.71,10.7l4.59,4.59a1,1,0,0,0,1.41,0L17.3,10.7a1,1,0,0,0,0-1.41,1.017,1.017,0,0,0-1.42,0Z"
                  fill="#33324e"
                />
              </svg>
            </div>
          </div>

          <div class="plan-content">
            <div class="pricing-features pt-2 pb-5">
              <div v-for="(features, j) in plan.features" :key="j">
                <p
                  class="text-muted"
                  data-toggle="tooltip"
                  data-placement="right"
                  :title="features.tooltip"
                  v-if="features.tooltip != ''"
                >
                  <strong class="text-dark">{{ features.text1 }}</strong>
                  {{ features.text2 }}
                </p>
                <p class="text-muted" v-if="features.tooltip == ''">
                  <strong class="text-dark">{{ features.text1 }}</strong>
                  {{ features.text2 }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3 mt-lg-4 pt-2">
        <a
          href="#"
          @click.prevent="
            submit(
              selectedPlan.stripe_price_id,
              selectedPlan.stripe_monthly_price,
              theme_id,
              selectedPlan.id
            )
          "
          class="w-100 ss-btn ss-btn-primary"
          >Proceed to pay
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    theme_id: Number,
  },
  data() {
    return {
      activePlan: -1,
      selectedPlan: '',
    }
  },
  methods: {
    expandAccordion(index) {
      this.activePlan == index
        ? (this.activePlan = -1)
        : (this.activePlan = index)
    },
    selectPlan(id) {
      this.selectedPlan = this.$config[0].plans.filter((p) => p.id == id)[0]
    },
  },
  mounted() {
    $('[data-toggle="tooltip"]').tooltip()
  },
  created() {
    this.selectedPlan = this.$config[0].plans.filter(
      (p) => p.title == 'Personal'
    )[0]
  },
}
</script>

<style lang="scss" scoped>
</style>