<template>
  <section class="section bg-testimonial" id="testimonials">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="title-box text-center">
            <h6 class="title-sub-title mb-0 text-primary f-17">
              {{ superscript }}
            </h6>
            <h3 class="title-heading mt-4" v-html="title"></h3>
          </div>
        </div>
      </div>

      <div class="row justify-content-center mt-5">
        <div class="col-lg-10">
          <div class="testi-carousel owl-carousel">
            <div
              class="testimonial-box text-center p-4"
              v-for="(testimonial, i) in testimonials"
            >
              <div class="testi-img-user">
                <img
                  :src="getAssetsUrl() + testimonial.image"
                  alt=""
                  class="rounded-circle testi-user mx-auto d-block"
                  width="" height=""
                />
              </div>
              <img src="images/client-quote.png" class="mt-4 pt-2" alt="" />

              <h4 class="font-italic mt-4 pt-2">
                {{ testimonial.content }}
              </h4>

              <div class="testi-border mt-4"></div>
              <p class="text-uppercase text-muted mb-0 mt-4 f-14">
                {{ testimonial.author_designation }}
              </p>
              <h5 class="mt-2">{{ testimonial.author_name }}</h5>
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
    testimonials: [Array, Object],
  },
  mounted() {
    $('.testi-carousel').owlCarousel({
      autoplaySpeed: 3000,
      autoplayHoverPause: true,
      nav: false,
      items: 1,
      autoPlay: true,
    })
  },
}
</script>

<style lang="scss" scoped>
</style>