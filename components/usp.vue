<template>
  <section class="sec-usp">
    <div class="usp-top">
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <h2 class="h2 mb-3" v-html="title"></h2>
            <a
              href="#"
              class="
                ss-btn ss-btn-bordered ss-btn-bordered-green ss-btn-wide
                mt-4
              "
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="usp-bottom">
      <div class="container">
        <div class="row">
          <div class="col-md-6 pr-md-5 pr-lg-3">
            <div class="usp-item" v-for="(usp, i) in usp" :key="i">
              <h4 class="h4" v-html="usp.title"></h4>
              <p class="body2">
                {{ usp.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="usp-bottom-img">
        <img class="d-none d-lg-block" src="images/usp-bottom.png" alt="" />
        <img class="d-lg-none" src="images/usp-bottom-mobile.png" alt="" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    description: String,
    title: String,
    cta_title: String,
    cta_url: String,
    usp: [Array, Object],
  },
  mounted() {
    // ----- COUNTER ----- //
    /*var a = 0
    $(window).scroll(function () {
      var oTop = $('#counter').offset().top - window.innerHeight
      if (a == 0 && $(window).scrollTop() > oTop) {
        $('.counter-value').each(function () {
          var $this = $(this),
            countTo = $this.attr('data-count')
          $({
            countNum: $this.text(),
          }).animate(
            {
              countNum: countTo,
            },

            {
              duration: 2000,
              easing: 'swing',
              step: function () {
                $this.text(Math.floor(this.countNum))
              },
              complete: function () {
                $this.text(this.countNum)
                //alert('finished');
              },
            }
          )
        })
        a = 1
      }
    })*/
  },
}
</script>

<style lang="scss" scoped>
</style>