<template>
  <div>
    <Header theme="light" />
    <Pricing
      v-if="$config[0].pricing_page && $config[0].plans"
      :data="$config[0].pricing_page"
      :pricing-items="$config[0].plans"
      :features="$config[0].plan_features"
    />
    <FreeThemesFeatures
      v-if="$config[0].pricing_page"
      :data="$config[0].pricing_page"
      class="pricing-faqs bg-green"
    />
    <FaqV2
      v-if="$config[0].global.faqs"
      :superscript="$config[0].global.homePage.faq_superscript"
      :title="$config[0].global.homePage.faq_title"
      :faqs="$config[0].global.faqs"
      class="pricing-faqs"
    />
    <Footer bg="bg-dark-green" />
  </div>
</template>

<script>
export default {
  head() {
    return {
      //title: this.$config[0].how_works.seo.seo_title,
      meta: this.getPageMeta(
        { seo: null },
        this.$config[0].site_url + this.$route.path
      ),
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
</style>