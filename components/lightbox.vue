<template>
  <div class="gallery-lightbox" @click.prevent="$emit('closeLightbox')">
    <div class="lightbox-container" @click.prevent.stop="">
      <a
        v-if="!dismissExpired"
        href="#"
        class="lightbox-close"
        @click.prevent="$emit('closeLightbox')"
      >
        <svg
          id="close"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            id="close-2"
            data-name="close"
            d="M10.649,9.136l7.009-7.009A1.166,1.166,0,1,0,16.009.478L9,7.487,1.991.478A1.166,1.166,0,0,0,.342,2.127L7.351,9.136.342,16.145a1.166,1.166,0,1,0,1.649,1.649L9,10.785l7.009,7.009a1.166,1.166,0,1,0,1.649-1.649Zm0,0"
            transform="translate(0 -0.136)"
            fill="#fff"
          />
        </svg>
      </a>

      <div class="lightbox-image" v-touch:swipe="touchHandler">
        <div
          v-if="dismissExpired"
          class="lightbox-hint d-flex flex-column align-items-center"
        >
          <img
            class="d-none d-lg-inline-block"
            src="images/hint-desktop.png"
            alt=""
          />
          <img class="d-lg-none" src="images/hint-mobile.png" alt="" />
          <a
            @click.prevent="dismissHint()"
            href="#"
            class="mt-5 ss-btn ss-btn-primary ss-btn-small"
            >Got it</a
          >
        </div>
        <div
          v-if="isLoading"
          class="lightbox-hint d-flex flex-column align-items-center"
        >
          <div class="lightbox-loader">
            <DotsLoader />
          </div>
        </div>
        <img
          v-if="currentImage"
          :src="`https://admin.supersites.io/assets/${currentImage.directus_files_id.id}`"
          alt=""
          @load="loaded()"
        />
      </div>
    </div>
    <div
      class="lightbox-thumbnails-bar"
      v-if="screens.length > 1"
      @click.prevent.stop=""
    >
      <a
        href="#"
        class="thumbnails-nav-btn prev"
        @click.stop.prevent="prevScreen()"
      >
        <svg
          id="Arrow_left"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            id="Path_1307"
            data-name="Path 1307"
            d="M0,0H24V24H0Z"
            fill="none"
          />
          <path
            id="Path_1308"
            data-name="Path 1308"
            d="M15.29,6.71a1,1,0,0,1,0,1.41L11.41,12l3.88,3.88a1,1,0,1,1-1.41,1.41L9.29,12.7a1,1,0,0,1,0-1.41L13.88,6.7A1,1,0,0,1,15.29,6.71Z"
            fill="#fff"
          />
        </svg>
      </a>
      <div
        class="thumbnails-wrapper"
        :style="`max-width: ${visibleThumbnails * 64}px;`"
      >
        <div
          class="thumbnail-item"
          v-for="(screen, index) in screens"
          @click.prevent.stop="setScreen(screen)"
          :class="{ active: currentImage == screen }"
          :style="index == 0 ? marginLeft : ''"
        >
          <div
            :style="`background-image:url(https://admin.supersites.io/assets/${screen.directus_files_id.id});`"
          ></div>
        </div>
      </div>
      <a
        href="#"
        class="thumbnails-nav-btn next"
        @click.stop.prevent="nextScreen()"
      >
        <svg
          id="Arrow_right"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            id="Path_1307"
            data-name="Path 1307"
            d="M0,0H24V24H0Z"
            fill="none"
          />
          <path
            id="Path_1308"
            data-name="Path 1308"
            d="M9.29,6.71a1,1,0,0,0,0,1.41L13.17,12,9.29,15.88a1,1,0,1,0,1.41,1.41l4.59-4.59a1,1,0,0,0,0-1.41L10.7,6.7A1,1,0,0,0,9.29,6.71Z"
            fill="#fff"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      updating: false,
      currentImage: '',
      marginLeft: '',
      isLoading: true,
      visibleThumbnails: 0,
    }
  },
  computed: {
    dismissExpired() {
      return Math.abs(new Date(this.$store.state.lastDismissed) - new Date()) /
        36e5 >
        2
        ? true
        : false
    },
    screens() {
      // Sort thumbnails : Oldest first

      return _.sortBy(this.thumbnails, [
        function (o) {
          return o.directus_files_id.modified_on
        },
      ])
    },
  },
  props: {
    thumbnails: [Array, Object],
  },
  methods: {
    dismissHint() {
      this.$store.commit('setLastDismissTime', new Date())
    },
    nextScreen() {
      this.isLoading = true
      setTimeout(() => {
        // Hide loader if stuck for more than 10 seconds
        this.isLoading = false
      }, 10000)
      let current = this.screens.indexOf(this.currentImage)
      this.currentImage =
        current + 1 == this.screens.length
          ? this.screens[0]
          : this.screens[current + 1]
    },
    prevScreen() {
      this.isLoading = true
      setTimeout(() => {
        // Hide loader if stuck for more than 10 seconds
        this.isLoading = false
      }, 10000)
      let current = this.screens.indexOf(this.currentImage)
      this.currentImage =
        current == 0
          ? this.screens[this.screens.length - 1]
          : this.screens[current - 1]
    },
    setScreen(screen) {
      this.isLoading = true
      setTimeout(() => {
        // Hide loader if stuck for more than 10 seconds
        this.isLoading = false
      }, 10000)
      this.currentImage = screen
    },
    touchHandler(direction) {
      if (direction === 'right') this.prevScreen()
      if (direction === 'left') this.nextScreen()
    },
    loaded() {
      this.isLoading = false
    },
    updateVisibleThumbnails() {
      const w = window.innerWidth

      if (w > 991) {
        // Desktop
        this.visibleThumbnails = 6
      }
      if (w > 767 && w < 992) {
        // Tablet
        this.visibleThumbnails = 5
      }
      if (w < 768) {
        // Mobile
        this.visibleThumbnails = 3
      }
    },
    handleKeyUp(e) {
      // Keyboard Left Arrow
      if (e.keyCode === 37) this.prevScreen()
      // Keyboard Right Arrow
      if (e.keyCode === 39) this.nextScreen()
      // Keyboard ESC key
      if (e.keyCode === 27) this.$emit('closeLightbox')
      // Keyboard Up Arrow
      if (e.keyCode === 38) {
        $('.gallery-lightbox')
          .stop()
          .animate(
            {
              scrollTop:
                $('.gallery-lightbox').scrollTop() - window.innerHeight * 0.7,
            },
            250
          )
      }
      // Keyboard Down Arrow
      if (e.keyCode === 40) {
        $('.gallery-lightbox')
          .stop()
          .animate(
            {
              scrollTop:
                $('.gallery-lightbox').scrollTop() + window.innerHeight * 0.7,
            },
            250
          )
      }
    },
    handleKeyDown(e) {},
  },

  mounted() {
    this.currentImage = this.screens[0]
    this.updateVisibleThumbnails()
    window.addEventListener('resize', this.updateVisibleThumbnails)
    window.addEventListener('keyup', this.handleKeyUp)
    window.addEventListener('keydown', this.handleKeyDown)
  },
  watch: {
    currentImage(newValue, oldValue) {
      let current = this.screens.indexOf(newValue)

      if (current > this.visibleThumbnails - 1) {
        this.marginLeft = `margin-left:${-Math.abs(
          (current - (this.visibleThumbnails - 1)) * 64
        )}px`
      } else {
        this.marginLeft = `margin-left:0px`
      }

      $('.gallery-lightbox').animate({ scrollTop: 0 }, 0)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>