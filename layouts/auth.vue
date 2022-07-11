<template>
  <div :class="{ hideOverflow: $store.state.hideOverflow == true }">
    <Header theme="light" :sticky="true" />

    <section class="auth">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6 col-lg-4 mx-auto">
            <Nuxt />
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>
<script>
import Vue from 'vue'
import functions from '~/mixins/functions'
Vue.mixin(functions)
export default {
  mounted() {},
}
</script>