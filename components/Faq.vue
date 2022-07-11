<template>
  <section class="section" id="faq">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="title-box text-center">
            <h6 class="title-sub-title mb-0 text-primary f-17">
              {{ superscript }}
            </h6>
            <div class="col-lg-5 mx-auto">
              <h3 class="title-heading mt-4">
                {{ title }}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-5 mt-5">
        <div class="faq-accordion">
          <div
            class="accordion-item"
            v-for="(item, index) of faqs"
            :key="index"
            :class="{ active: activeCapabilityIndex == index }"
          >
            <h4 @click="expandAccordion(index)">
              {{ item.question }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
              >
                <g id="add-24px" transform="translate(-2 -2)">
                  <path id="Контур_4599" d="M2,2H30V30H2Z" fill="none" />
                  <path
                    id="Контур_4600"
                    d="M24.2,17.2h-7v7H14.9v-7h-7V14.9h7v-7h2.3v7h7Z"
                  />
                </g>
              </svg>
            </h4>
            <div class="accordion-content">
              <div class="accordion-content-wrapper" v-html="item.answer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    superscript: String,
    title: String,
    faqs: [Array, Object],
  },
  data() {
    return {
      activeCapabilityIndex: -1,
    }
  },
  mounted() {
    //console.log(this.$props.faqs);
  },
  methods: {
    expandAccordion(index) {
      this.activeCapabilityIndex == index
        ? (this.activeCapabilityIndex = -1)
        : (this.activeCapabilityIndex = index)
      if (process.isClient) {
        setTimeout(() => {
          this.$scrollTo('.accordion-item.active h4', 500, {
            x: false,
            y: true,
            offset: -88,
          })
        }, 101)
      }
    },
  },
  computed: {},
}
</script>

<style lang="scss" scoped>
</style>