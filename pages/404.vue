<template>
  <div :class="{ hideOverflow: $store.state.hideOverflow == true }">
    <Header theme="light" :sticky="true" />
    <section class="page-404">
      <div class="container">
        <div class="row flex-column-reverse flex-lg-row">
          <div class="col-md-8 col-lg-6">
            <h1 class="h2 pr-md-5 pr-lg-3">
              {{ $config[0].global.notFoundPage.heading }}
            </h1>
            <div class="w-100">
              <div
                class="text-muted mt-3 mt-lg-4 body2"
                v-html="$config[0].global.notFoundPage.content"
              ></div>

              <div class="mt-4 pt-2 row mx-0 d-flex flex-column flex-sm-row">
                <div class="">
                  <nuxt-link
                    :to="$config[0].global.notFoundPage.cta_url_1"
                    class="ss-btn ss-btn-primary mr-md-2 mb-2 mb-md-0"
                    >{{ $config[0].global.notFoundPage.cta_title_1 }}
                  </nuxt-link>
                  <nuxt-link
                    :to="$config[0].global.notFoundPage.cta_url_2"
                    class="ss-btn ss-btn-outline"
                    >{{ $config[0].global.notFoundPage.cta_title_2 }}
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="home-img d-none d-lg-block">
              <img
                :src="getAssetsUrl() + $config[0].global.notFoundPage.image"
                class="img-fluid mb-5 mb-lg-0"
                alt=""
              />
            </div>
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
  props: {
    error: Object,
  },
  mounted() {},
}
</script>