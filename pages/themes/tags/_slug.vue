<template>
  <div>
    <Header theme="light" />

    <section class="bg-home" id="home">
      <div class="home-center">
        <div class="home-desc-center">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-6">
                <div class="home-content">
                  <h2>
                    <span>Themes in</span> {{ toText($route.params.slug) }}
                  </h2>
                  <p class="text-muted mt-3 f-20">
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
    <Designs :pre-selected-tag="$route.params.slug" />
    <Footer />
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  methods: {
    toText(str) {
      return _.upperCase(str)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>