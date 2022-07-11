<template>
  <div class="theme-about pt-5 pt-lg-3 pb-5" v-if="description">
    <div
      class="theme-description pt-3 pt-md-4 mt-3 pt-lg-0 mt-lg-0"
      :class="{ loadMore }"
    >
      <h2 class="h4">About this theme</h2>
      <div class="mt-4" v-html="description"></div>
    </div>
    <div
      class="theme-about-load-more text-center"
      v-if="!loadMore && description && description.length > 1000"
    >
      <a href="#" @click.prevent="loadMore = true" class="btn button-secondary"
        >Load more</a
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadMore: false,
    }
  },
  props: {
    description: String,
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
</style>