<template>
  <div>
    <Header theme="light" />
    <section class="how-it-works-top atf">
      <div class="container">
        <div class="row">
          <div class="col-10 col-md-7 pr-md-5 pr-lg-0">
            <h1 class="h2">{{ $config[0].how_works.heading }}</h1>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row mt-4 mt-lg-5 pt-5">
          <div
            class="col-md-4 px-md-1 px-lg-3 step-item text-center"
            v-for="(step, index) in $config[0].how_works.steps"
            :key="index"
          >
            <IconWithText
              :title="index + 1 + '. ' + step.title"
              :number="index + 1"
              class="completed"
              :icon="step.icon"
            >
            </IconWithText>
            <div
              class="text-muted body2 mt-3 mt-md-4"
              v-html="step.description"
            ></div>
          </div>
        </div>
      </div>
    </section>
    <section class="how-it-works-tabs">
      <div class="container">
        <div class="text-center pt-5 pb-4 mb-lg-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4"
            height="64"
            viewBox="0 0 4 64"
          >
            <g
              id="Group_499"
              data-name="Group 499"
              transform="translate(-936 -663)"
            >
              <circle
                id="Ellipse_106"
                data-name="Ellipse 106"
                cx="2"
                cy="2"
                r="2"
                transform="translate(936 663)"
                fill="#d9dbe1"
              />
              <circle
                id="Ellipse_106-2"
                data-name="Ellipse 106"
                cx="2"
                cy="2"
                r="2"
                transform="translate(936 675)"
                fill="#d9dbe1"
              />
              <circle
                id="Ellipse_106-3"
                data-name="Ellipse 106"
                cx="2"
                cy="2"
                r="2"
                transform="translate(936 687)"
                fill="#d9dbe1"
              />
              <circle
                id="Ellipse_106-4"
                data-name="Ellipse 106"
                cx="2"
                cy="2"
                r="2"
                transform="translate(936 699)"
                fill="#d9dbe1"
              />
              <circle
                id="Ellipse_106-5"
                data-name="Ellipse 106"
                cx="2"
                cy="2"
                r="2"
                transform="translate(936 711)"
                fill="#d9dbe1"
              />
              <circle
                id="Ellipse_106-6"
                data-name="Ellipse 106"
                cx="2"
                cy="2"
                r="2"
                transform="translate(936 723)"
                fill="#d9dbe1"
              />
            </g>
          </svg>
        </div>
        <div class="text-center">
          <h2 class="h4">
            <span class="text-primary">{{
              $config[0].how_works.development_heading
            }}</span>
            <br />
            <span> {{ $config[0].how_works.development_subheading }} </span>
          </h2>
        </div>
        <div class="text-center mt-2 pt-4 pb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23.795"
            height="61"
            viewBox="0 0 23.795 61"
          >
            <path
              id="Path_1409"
              data-name="Path 1409"
              d="M618.04,448a1.58,1.58,0,0,1-.04.38v.02a2.04,2.04,0,0,1-.11.35c0,.01-.01.02-.01.03a3.236,3.236,0,0,1-.17.32c-.01,0-.01.01-.01.02a3.476,3.476,0,0,1-.25.29l-9.9,9.9a1.994,1.994,0,1,1-2.82-2.82l6.49-6.49H559.04a2.006,2.006,0,0,1-2-2,2.015,2.015,0,0,1,2-2h52.18l-6.49-6.49a1.994,1.994,0,1,1,2.82-2.82l9.76,9.77.14.13a3.476,3.476,0,0,1,.25.29c0,.01,0,.02.01.02a3.236,3.236,0,0,1,.17.32c0,.01.01.02.01.03a2.04,2.04,0,0,1,.11.35v.02A1.58,1.58,0,0,1,618.04,448Z"
              transform="translate(459.895 -557.04) rotate(90)"
              fill="#d9dbe1"
            />
          </svg>
        </div>
        <div class="tabs-top">
          <div class="row m-0">
            <div
              class="col-lg mb-3 mb-lg-0 tab-top-item px-lg-0"
              v-for="(step, index) in $config[0].how_works.development_process"
              @click.prevent="activeStep = step"
              :key="index"
              :class="{ active: activeStep == step }"
            >
              <svg
                id="expand_more_black_24dp"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="d-lg-none arrow"
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

              <IconWithText
                :title="step.title"
                class="completed"
                :icon="step.icon"
                :tab-icon="true"
                :green="true"
              >
              </IconWithText>
              <div
                v-if="activeStep == step"
                class="text-muted text-center d-lg-none pt-3"
                v-html="activeStep.description"
              ></div>
            </div>
          </div>
          <div class="row d-none d-lg-flex">
            <div
              class="col-lg-8 mx-auto py-5 text-muted text-center"
              v-html="activeStep.description"
            ></div>
          </div>
        </div>
      </div>
    </section>
    <FaqV2
      v-if="$config[0].global.faqs"
      :superscript="$config[0].global.homePage.faq_superscript"
      :title="$config[0].global.homePage.faq_title"
      :faqs="$config[0].global.faqs"
      class="pricing-faqs bg-green"
    />
    <Footer bg="bg-dark-green" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeStep: null,
    }
  },
  created() {
    //console.log(this.$config[0].how_works.development_process[0])
    this.activeStep = this.$config[0].how_works.development_process[0]
  },
  head() {
    if (this.$config[0].how_works) {
      return {
        title: this.$config[0].how_works.seo.seo_title,
        meta: this.getPageMeta(
          this.$config[0].how_works,
          this.$config[0].site_url + this.$route.path
        ),  
      }
    }
  },
}
</script>

<style lang="scss" scoped>
</style>