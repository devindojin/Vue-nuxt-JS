<template>
  <section class="similar-themes pt-5">
    <Lightbox
      v-if="showLightbox"
      :thumbnails="currentDesign.full_images"
      @closeLightbox="closeLightbox()"
      @goToPrev="goToPrev()"
      @goToNext="goToNext()"
    />
    <div class="container">
      <h2 class="h3 mb-4">Similar Themes</h2>
      <div class="row">
        <div
          class="similar-themes-carousel owl-carousel"
          v-if="similarThemes.length > 0"
        >
          <GalleryItem
            v-for="(theme, index) in similarThemes"
            :key="index"
            :theme="theme"
            @showFullImage="showFullImage(theme)"
          ></GalleryItem>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      showLightbox: false,
      currentDesign: null,
    }
  },
  props: {
    similarThemes: [Array, Object],
  },
  methods: {
    showFullImage(design) {
      this.showLightbox = true
      this.currentDesign = design
      this.$store.commit('hideOverflow', true)
    },
    closeLightbox() {
      this.showLightbox = false
      this.$store.commit('hideOverflow', false)
      setTimeout(() => {
        window.scrollTo(0, this.$store.state.scrollPos)
      }, 10)
    },
    initOwl() {
      $('.similar-themes-carousel').owlCarousel({
        navText: [
          '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"> <g id="Arrow_left" data-name="Arrow left" transform="translate(48 48) rotate(180)"> <rect id="BG" width="48" height="48" fill="none"/> <path id="Path_650" data-name="Path 650" d="M195.414,128.586a2,2,0,1,0-2.828,2.828L201.171,140l-8.586,8.586a2,2,0,0,0,2.828,2.828l10-10a2,2,0,0,0,0-2.828Z" transform="translate(-174 -116)" fill="#bdc2ce"/> </g> </svg>',
          '<svg id="Arrow_right" data-name="Arrow right" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"> <rect id="BG" width="48" height="48" fill="none"/> <path id="Path_650" data-name="Path 650" d="M195.414,128.586a2,2,0,1,0-2.828,2.828L201.171,140l-8.586,8.586a2,2,0,0,0,2.828,2.828l10-10a2,2,0,0,0,0-2.828Z" transform="translate(-174 -116)" fill="#bdc2ce"/> </svg>',
        ],
        loop: true,
        nav: false,
        responsive: {
          0: {
            items: 1,
          },
          768: {
            items: 2,
          },
          1200: {
            items: 3,
            nav: true,
          },
        },
      })
    },
  },

  mounted() {
    setTimeout(() => {
      this.initOwl()
    }, 500)
  },

  watch: {
    similarThemes(newValue, oldValue) {
      setTimeout(() => {
        this.initOwl()
      }, 500)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>