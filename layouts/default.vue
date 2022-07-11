<template>
  <div :class="{ hideOverflow: $store.state.hideOverflow == true }">
    <Nuxt />
  </div>
</template>
<script>
import Vue from 'vue'
import functions from '~/mixins/functions'
Vue.mixin(functions)
export default {
  mounted() {
    $(window).scroll(function () {
      var scroll = $(window).scrollTop()

      if (scroll >= 50) {
        $('.sticky').addClass('nav-sticky')
      } else {
        $('.sticky').removeClass('nav-sticky')
      }
    })
  },
}
</script>