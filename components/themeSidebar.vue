<template>
  <div class="theme-hero-details pt-lg-4 pb-lg-4 mt-md-1 pt-md-2 mt-lg-0">
    <div class="row mt-4 pt-3 pt-md-0 mt-md-5 mt-lg-0">
      <div class="col-md-6 col-lg-12">
        <div class="my-lg-4">
          <SidebarPricing :theme_id="themeData.id" />
        </div>
      </div>
      <div class="col-md-6 col-lg-12">
        <div
          class="theme-hero-sec mt-5 pt-3 pt-md-0 mt-md-0 mt-lg-4"
          v-if="themeData.business_types"
        >
          <h3 class="h5 mb-3">Business types</h3>
          <nuxt-link
            :to="`/themes/business-types/${slug(item.business_types_id.name)}/`"
            class="btn-filters btn btn-sm mb-2 mr-2"
            v-for="(item, index) in themeData.business_types"
            :key="index"
            >{{ item.business_types_id.name }}</nuxt-link
          >
        </div>
        <div class="theme-hero-sec mt-3 mt-lg-4 pt-3" v-if="themeData.tags">
          <h3 class="h5 mb-3">Tags</h3>
          <nuxt-link
            :to="`/themes/tags/${item.key}/`"
            class="btn-filters btn btn-sm mb-2 mr-2"
            v-for="(item, index) in themeData.tags"
            :key="index"
            >{{ item.value }}</nuxt-link
          >
        </div>
        <div class="theme-hero-sec mt-3 mt-lg-4 pt-3">
          <h3 class="h5 mb-3">Share</h3>
          <a
            href="#"
            v-clipboard:copy="pageUrl"
            v-clipboard:success="onCopy"
            @click.prevent=""
            class="btn-filters btn btn-sm mb-2 mr-2"
            :class="{ copied }"
          >
            <span v-if="!copied">Copy link</span>
            <span v-if="copied"
              >Copied
              <svg
                id="Capa_1"
                enable-background="new 0 0 515.556 515.556"
                height="10"
                viewBox="0 0 515.556 515.556"
                width="10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m0 274.226 176.549 176.886 339.007-338.672-48.67-47.997-290.337 290-128.553-128.552z"
                  fill="#FFF"
                /></svg
            ></span>
          </a>
          <a
            :href="`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`"
            target="_blank"
            class="btn-filters btn btn-sm mb-2 mr-2"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="9.444"
              height="17.38"
              viewBox="0 0 9.444 17.38"
            >
              <path
                id="facebook"
                d="M15.356,22.212V14.3H12.7V11.2h2.659V8.916a3.722,3.722,0,0,1,3.974-4.084,21.867,21.867,0,0,1,2.384.122V7.718H20.087c-1.284,0-1.532.61-1.532,1.505V11.2h3.069l-.4,3.1H18.554v7.917Z"
                transform="translate(-12.269 -4.832)"
                fill="#686E9A"
              />
            </svg>
          </a>
          <a
            :href="`https://twitter.com/intent/tweet?url=${pageUrl}`"
            target="_blank"
            class="btn-filters btn btn-sm mb-2 mr-2"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="17.899"
              height="14.547"
              viewBox="0 0 17.899 14.547"
            >
              <path
                id="twitter"
                d="M23.306,12.475q.011.236.01.475A10.378,10.378,0,0,1,12.867,23.4h0a10.4,10.4,0,0,1-5.629-1.65,7.469,7.469,0,0,0,.876.051,7.369,7.369,0,0,0,4.561-1.572,3.677,3.677,0,0,1-3.431-2.551,3.66,3.66,0,0,0,1.659-.063,3.673,3.673,0,0,1-2.946-3.6c0-.017,0-.031,0-.047a3.647,3.647,0,0,0,1.663.459,3.676,3.676,0,0,1-1.137-4.9,10.427,10.427,0,0,0,7.57,3.837,3.674,3.674,0,0,1,6.258-3.349,7.366,7.366,0,0,0,2.332-.891,3.687,3.687,0,0,1-1.615,2.031,7.324,7.324,0,0,0,2.109-.578,7.463,7.463,0,0,1-1.832,1.9Zm0,0"
                transform="translate(-7.238 -8.851)"
                fill="#686E9A"
              />
            </svg>
          </a>
          <a
            :href="`https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}`"
            target="_blank"
            class="btn-filters btn btn-sm mb-2 mr-2"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="18.178"
              height="17.375"
              viewBox="0 0 18.178 17.375"
            >
              <path
                id="linkedin"
                d="M11.351,24.188h-3.9V12.464h3.9ZM9.4,10.863H9.377a2.031,2.031,0,1,1,.051-4.051A2.032,2.032,0,1,1,9.4,10.863Zm16,13.324h-3.9V17.916c0-1.576-.564-2.651-1.974-2.651a2.133,2.133,0,0,0-2,1.425,2.668,2.668,0,0,0-.128.951v6.547h-3.9s.051-10.624,0-11.723h3.9v1.66a3.869,3.869,0,0,1,3.512-1.935c2.564,0,4.486,1.676,4.486,5.276Zm0,0"
                transform="translate(-7.224 -6.812)"
                fill="#686E9A"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      copied: false,
      pageUrl: '',
    }
  },
  mounted() {
    this.pageUrl = window.location.href
  },
  methods: {
    slug(str) {
      return _.kebabCase(str)
    },
    onCopy: function (e) {
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 1000)
    },
  },
  props: {
    themeData: [Array, Object],
  },
}
</script>

<style lang="scss" scoped>
</style>