<template>
  <section class="sec sec-features">
    <div class="container">
      <h2 class="h2 mb-1 mb-md-2" v-html="title"></h2>
      <a
        href="#"
        class="
          ss-btn ss-btn-outline ss-btn-outline-black ss-btn-wide
          mt-3 mt-md-4
          mb-5 mb-md-4
        "
      >
        Learn more
      </a>
      <div class="features-list">
        <div
          v-for="(features, i) in features"
          :key="i"
          class="features-list-item row"
        >
          <div class="col-md-6">
            <div class="feature-img">
              <img
                :src="getAssetsUrl() + features.image"
                class="img-fluid w-100"
                alt=""
                width=""
                height=""
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="feature-desc">
              <h4 class="h4 mb-4">{{ features.title }}</h4>
              <p class="body2 text-muted">
                {{ features.description }}
              </p>
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
    features: [Array, Object],
  },
}
</script>

<style lang="scss" scoped>
</style>