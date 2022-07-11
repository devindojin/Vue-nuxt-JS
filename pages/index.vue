<template>
  <div>
    <Header theme="light" :sticky="true" />
    <HeroV2
      v-if="$config[0].global.homePage"
      :superscript="$config[0].global.homePage.superscript"
      :title="$config[0].global.homePage.hero_title"
      :description="$config[0].global.homePage.hero_description"
      :image="getAssetsUrl() + $config[0].global.homePage.hero_image"
      :cta_title="$config[0].global.homePage.hero_cta_title"
      :cta_url="$config[0].global.homePage.hero_cta_url"
    />

    <HowItWorks
      v-if="$config[0].global.process"
      :superscript="$config[0].global.homePage.how_work_superscript"
      :title="$config[0].global.homePage.how_work_title"
      :process="$config[0].global.process"
    />

    <Features
      v-if="$config[0].global.features"
      :superscript="$config[0].global.homePage.features_superscript"
      :title="$config[0].global.homePage.features_title"
      :features="$config[0].global.features"
    />

    <Usp
      v-if="$config[0].global.usp"
      :title="$config[0].global.homePage.usp_title"
      :description="$config[0].global.homePage.usp_description"
      :cta_title="$config[0].global.homePage.usp_cta_title"
      :cta_url="$config[0].global.homePage.usp_cta_url"
      :usp="$config[0].global.usp"
    />
    <WhyChooseUs />
    <HowToCreate />
    <FaqV2
      v-if="$config[0].global.faqs"
      :superscript="$config[0].global.homePage.faq_superscript"
      :title="$config[0].global.homePage.faq_title"
      :faqs="$config[0].global.faqs"
    />

    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    console.log('mounted')
  },

  head() {
    if (this.$config[0].global.homePage) {
      return {
        title: this.$config[0].global.homePage.seo.seo_title,
        meta: this.getPageMeta(
          this.$config[0].global.homePage,
          this.$config[0].site_url + this.$route.path
        ),  
      }
    }
  },
}
</script>
