<template>
  <section class="content-page">
    <div class="container">
      <div class="row">
        <div class="col-xl-8" v-if="pageData">
          <h1 class="h2">{{ pageData.page_title }}</h1>
          <div
            class="single-page-content pt-4"
            v-html="pageData.description"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'page',
  computed: {
    pageData() {
      const pageData = this.$config[0].pages.filter(
        (p) => p.slug == this.$route.params.slug
      )[0]
      if (!pageData) return this.$router.push('/404/')
      return pageData
    },
  },
}
</script>

<style lang="scss">
</style>