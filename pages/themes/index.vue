<template>
  <div>
    <Header theme="light" />

    <section class="atf sec-themes-top">
      <div class="home-center">
        <div class="home-desc-center">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-md-9 col-lg-8">
                <div class="home-content">
                  <h1 class="home-title h2">Select a website theme.</h1>
                  <p class="text-muted mt-4 body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Designs />
    <Footer />
  </div>
</template>

<script>
export default {
  head() {
      return {
        //title: this.$config[0].how_works.seo.seo_title,
        meta: this.getPageMeta(
          {'seo':null},
          this.$config[0].site_url + this.$route.path
        ),  
      }
  },
}
</script>

<style lang="scss" scoped>
</style>