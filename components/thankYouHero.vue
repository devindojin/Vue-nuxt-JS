<template>
  <section class="bg-home thankyou-hero" id="home">
    <div class="home-center">
      <div class="home-desc-center">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-10">
              <div class="home-content">
                <h1 class="home-title h2">
                  Thank you! Your Supersites<sup>™</sup> purchase was successful.
                </h1>
              </div>
                </div>

                            <div class="col-md-9 col-lg-7 pt-1">

                  <p class="text-muted mt-3 mt-md-4 body2">
                    In order to get your website fastest, we encourage you to
                    complete the next steps as soon as possible.
                  </p>
  <div class="mt-4 pt-1">
     <nuxt-link
                        :to="
                          '/my-account/website-briefs/' +
                          $store.state.activeProject +
                          '/'
                        "
                        class="ss-btn ss-btn-primary mr-2"
                        >Complete Brief</nuxt-link
                      >
                        <a href="#features" class="ss-btn ss-btn-outline"
                        >Additional services
                      </a>
  </div>

                  <div class="mt-3 row mx-0">
                    <Duedate date="Due date: July 4, 2021" />
                  </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.w-lg-75 {
  @media (min-width: 992px) {
    max-width: 75%;
  }
}
</style>