<template>
  <div>
    <Header theme="light">
      <Breadcrumb v-if="themeData[0]" :title="themeData[0].id" />
    </Header>

    <div class="text-center py-5 my-5" v-if="!themeData[0] && themeData != 404">
      <div class="pt-5 mt-5">
        <Spinner />
      </div>
    </div>
    <div class="full-height" v-if="themeData == 404">
      <div class="text-center pt-5 mt-5">
        <div class="pt-5 mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="116"
            height="116"
            viewBox="0 0 116 116"
          >
            <path
              id="sad"
              d="M58,116A58,58,0,0,1,16.988,16.988,58,58,0,0,1,99.012,99.012,57.622,57.622,0,0,1,58,116ZM58,9.062A48.938,48.938,0,1,0,106.937,58,48.993,48.993,0,0,0,58,9.062Zm22.628,71.2c-.337-.53-8.422-12.974-22.854-12.974S35.257,79.733,34.92,80.263a4.531,4.531,0,0,0,7.646,4.865c.056-.088,5.7-8.776,15.208-8.776s15.153,8.689,15.208,8.776a4.531,4.531,0,0,0,7.646-4.865ZM38.062,37.383A5.664,5.664,0,1,1,32.4,43.047,5.664,5.664,0,0,1,38.062,37.383Zm33.984,5.664a5.664,5.664,0,1,0,5.664-5.664A5.664,5.664,0,0,0,72.047,43.047Z"
              fill="#d9dbe1"
            />
          </svg>

          <h2 class="my-4">
            We're sorry. The item you're looking for does not exist.<br />Please
            browse our themes to find a fit.
          </h2>
          <nuxt-link to="/themes/" class="btn button-secondary btn-round"
            >Browse Themes</nuxt-link
          >
        </div>
      </div>
    </div>
    <div class="theme-top atf" v-if="themeData[0]">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <ThemeHero :themeData="themeData[0]" />
            <ThemeAbout
              class="d-none d-lg-block"
              :description="themeData[0].theme_description"
            />
          </div>
          <div class="col-lg-4 pt-md-5">
            <ThemeSidebar :themeData="themeData[0]" />
          </div>
        </div>
        <div class="row d-lg-none">
          <div class="col-lg-8">
            <ThemeAbout :description="themeData[0].theme_description" />
          </div>
        </div>
      </div>
      <SimilarThemes :similarThemes="similarThemes" />
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  head() {
      return {
        //title: this.$config[0].how_works.seo.seo_title,
        meta: this.getPageMeta(
          {'seo':null},
          this.$config[0].site_url + this.$route.path
        ),
        script: [
          {
            src: 'https://js.stripe.com/v3/',
          },
        ],  
      }
  },
  async mounted() {
    let token = await this.getToken()
    //console.log(token);
    try {
      let themeData = await axios.get(
        'https://admin.supersites.io/items/themes?filter[status][_eq]=published&filter[id][_eq]=' +
          this.$route.params.slug +
          '&fields=*.*,full_images.directus_files_id.*,business_types.business_types_id.*&access_token=' +
          token
      )
      // let similarThemes = await fetch(
      //     'https://admin.supersites.io/items/themes?filter[status][_eq]=published&filter[id][_eq]=' +
      //       this.$route.params.slug +
      //       '&fields=*.*,full_images,business_types.business_types_id.*'
      //   )
      console.log(themeData.data.data)

      themeData = themeData.data.data
      this.themeData = themeData
      let themeBusinesses = themeData[0].business_types.map(
        (b) => b.business_types_id.id
      )
      let similarThemes = await axios.get(
        `https://admin.supersites.io/items/themes?filter[status][_eq]=published&filter[business_types][business_types_id][id][_in]=${themeBusinesses.join()}&filter[id][_neq]=${
          themeData[0].id
        }&fields=*.*,full_images.directus_files_id.*,business_types.business_types_id.*&limit=9&access_token=${token}`
      )
      similarThemes = similarThemes.data.data
      this.similarThemes = similarThemes
    } catch (error) {
      this.themeData = 404
    }
  },
  methods: {
    findSimilarThemes(themeBusinesses, business_types) {
      for (let i = 0; i < business_types.length; i++) {
        return themeBusinesses.includes(business_types[i].business_types_id.id)
      }
    },
  },
  data() {
    return {
      themeData: [],
      similarThemes: [],
    }
  },
}
</script>
