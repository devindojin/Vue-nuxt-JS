<template>
  <section class="bg-home" id="home">
    <div class="home-center">
      <div class="home-desc-center">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="home-content">
                <div class="home-badge">
                  <p class="f-13" v-html="superscript"></p>
                </div>
                <h1 class="home-title">{{ title }}</h1>
                <p class="text-muted mt-3 f-20">{{ description }}</p>
                <div class="mt-5">
                  <a :href="cta_url" class="btn btn-primary">{{ cta_title }}
                    <i class="ml-5 mdi mdi-arrow-right"></i>
				  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="home-img">
                <img :src="image" class="img-fluid" alt="" width="" height="" />
              </div>
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
    description: String,
    image: String,
    cta_title: String,
    cta_url: String,
  },
}
</script>

<style lang="scss" scoped>
</style>