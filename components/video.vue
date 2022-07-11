<template>
  <section class="section bg-light">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="text-center">
            <h6 class="text-uppercase desc-white f-14">{{superscript}}</h6>
            <h2 class="line-height_1_4 mt-4" v-html="title"></h2>
            <p class="mt-3 desc-white">{{subtitle}}</p>
            <div class="mt-4 pt-2">
              <a
                :href="'http://vimeo.com/'+video_id"
                class="video-play-icon text-white"
              >
                <i class="mdi mdi-play play-icon-circle text-white mr-2"></i>
              </a>
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
    superscript:String,
    title: 		String,
    subtitle: 	String,
    video_id: 	Number,
  },
  mounted() {
    //  VIDEO
    $('.video-play-icon').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
    })
    // video
    $('.player').mb_YTPlayer()
  },
}
</script>

<style lang="scss" scoped>
</style>