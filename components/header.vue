<template>
  <div class="header">
    <Navdark
      v-if="theme == 'dark'"
      :sticky="sticky"
      ><slot></slot
    ></Navdark>
    <Navlight
      v-if="theme == 'light'"
      :sticky="sticky"
      ><slot></slot
    ></Navlight>
  </div>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
    },
    sticky: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    // SmoothLink
    $('.smoothlink').on('click', function (event) {
      var $anchor = $(this)
      if (window.location.pathname == '/') {
        event.preventDefault()

        $('html, body')
          .stop()
          .animate(
            {
              scrollTop: $($anchor.attr('href')).offset().top - 100,
            },
            1500,
            'easeInOutExpo'
          )
      }
      $('.navbar-toggler:visible').click()
    })
  },
}
</script>

<style lang="scss" scoped>
</style>