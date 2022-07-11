<template>
  <div class="theme-hero mt-3 mt-lg-0 pt-4 pb-lg-4">
    <h1 class="h3">Theme ID - {{ themeData.id }}</h1>

    <div class="mt-4 theme-hero-main-img" @click="showLightbox = true">
      <img
        :src="`https://admin.supersites.io/assets/${themeData.thumbnail.id}`"
        alt=""
      />
    </div>
    <Lightbox
      v-if="showLightbox"
      :thumbnails="themeData.full_images"
      @closeLightbox="closeLightbox()"
      @goToPrev="goToPrev()"
      @goToNext="goToNext()"
    />
    <div class="text-center">
      <nuxt-link
        :to="`/themes/demos/${themeData.id}/`"
        class="ss-btn ss-btn-outline ss-btn-outline-green live-demo"
        >Live demo</nuxt-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLightbox: false,
    }
  },

  props: {
    themeData: [Array, Object],
  },

  methods: {
    closeLightbox() {
      this.showLightbox = false
      this.$store.commit('hideOverflow', false)
      setTimeout(() => {
        window.scrollTo(0, this.$store.state.scrollPos)
      }, 10)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>