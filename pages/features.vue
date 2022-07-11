<template>
  <div>
    <Header theme="light" />

    <section class="atf">
      <div class="home-center">
        <div class="home-desc-center">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-md-9 col-lg-8">
                <div class="home-content">
                  <h1 class="home-title h2">Supersites Features</h1>
                  <p class="text-muted mt-4 body2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="supersites-features">
      <div class="container">
        <div class="row">
          <div class="col-md-4 d-none d-md-block">
            <div class="features-sidebar">
              <ul>
                <li
                  v-for="(feature, i) in $config[0].global.supersitesFeatures" :key="i"
                >
                  <a
                    class="h6"
                    :class="{ active: i == 0 }"
                    href="#"
                    :data-target="'#' + slug(feature.title)"
                    >{{ feature.title }}</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-8 px-0 px-md-3">
            <div class="features-content">
              <div
                class="feature-item"
                :id="slug(feature.title)"
                :key="i"
                v-for="(feature, i) in $config[0].global.supersitesFeatures"
                :class="{ active: activeIndex == i }"
              >
                <div class="feature-title" @click="expandAccordion(i)">
                  <h2 class="h3 d-none d-md-block">{{ feature.title }}</h2>
                  <h2 class="h6 d-md-none">{{ feature.title }}</h2>
                </div>
                <div class="feature-body">
                  <div
                    class="feature-thumbnail mt-3 mt-md-4 pt-3"
                    v-if="feature.thumbnail"
                  >
                    <img
                      :src="getAssetsUrl() + feature.thumbnail"
                      class="img-fluid w-100"
                      alt=""
                      width=""
                      height=""
                    />
                  </div>
                  <div class="row mt-5 pt-md-2">
                    <div
                      class="col-lg-6 mb-4 pb-md-4"
                      v-for="(item,index) in feature.feature_items" :key="index"
                    >
                      <h4 class="h6 mb-3">{{ item.title }}</h4>
                      <div
                        class="text-muted body3"
                        v-html="item.description"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  head() {
      return {
        //title: this.$config[0].how_works.seo.seo_title,
        meta: this.getPageMeta(
          {'seo':null},
          this.$config[0].site_url + this.$route.path
        ),  
      }
  },
  data() {
    return {
      activeIndex: 0,
    }
  },
  methods: {
    slug(str) {
      return _.kebabCase(str)
    },
    expandAccordion(index) {
      this.activeIndex == index
        ? (this.activeIndex = -1)
        : (this.activeIndex = index)
      if (process.isClient) {
        setTimeout(() => {
          this.$scrollTo(
            '.supersites-features .features-content .feature-item.active',
            500,
            {
              x: false,
              y: true,
              offset: 80,
            }
          )
        }, 101)
      }
    },
  },
  mounted() {
    $('.supersites-features .features-sidebar ul li a').click(function (e) {
      const target = $($(this).data('target'))
      e.preventDefault()
      $('html,body').animate(
        {
          scrollTop: target.offset().top - 120,
        },
        500
      )
    })
    $(window).scroll(function (e) {
      $.each(
        $('.supersites-features .features-content .feature-item'),
        function () {
          const featureTop = $(this).offset().top
          const sideBarTarget = $(
            '.supersites-features .features-sidebar ul li a[data-target="#' +
              $(this).attr('id') +
              '"'
          )
          if ($(window).scrollTop() > featureTop - 125) {
            $('.supersites-features .features-sidebar ul li a').removeClass(
              'active'
            )
            $(sideBarTarget).addClass('active')
          }
        }
      )
    })
  },
}
</script>

<style lang="scss" scoped>
</style>