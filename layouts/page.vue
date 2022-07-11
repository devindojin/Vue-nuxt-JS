<template>
  <div :class="{ hideOverflow: $store.state.hideOverflow == true }">
    <Header theme="light" :sticky="true" />
    <Nuxt />
    <Footer />
  </div>
</template>
<script>
import Vue from 'vue'
import functions from '~/mixins/functions'
Vue.mixin(functions)
export default {}
</script>