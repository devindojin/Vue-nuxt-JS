<template>
  <div class="sec sec-faq-v2">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h2 class="h2">{{ data.feature_heading }}</h2>
          <a
            :href="data.feature_cta_url_1"
            class="mt-4 ss-btn btn btn-outline-light border-2"
            >{{ data.feature_cta_title_1 }}</a
          >
        </div>
      </div>
      <div class="faq-items row row-cols-2 col-md-8 mt-5">
        <div
          class="faq-item col border-0 p-0 py-3"
          v-for="(feature, index) of data.features"
          :key="index"
        >
          <h6 class="h6">{{ feature.title }}</h6>
          <div class="text-muted mt-3">
            {{ feature.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: [Array, Object],
  },
}
</script>

<style lang="scss" scoped>
</style>