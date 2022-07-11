<template>
  <section class="bg-light" id="home">
    <div class="home-center">
      <div class="home-desc-center">
        <div class="container">
          <div class="row align-items-center justify-content-center">
            <div class="col-lg-9">
              <div class="home-content text-center mt-5 pt-5">
                <div class="home-badge mt-5">
                  <p class="f-13 bg-primary text-white-50">
                    <span class="text-white">70% Off</span> for first 3 month
                  </p>
                </div>
                <h1 class="mt-3">
                  <span
                    class="element"
                    data-elements="Focus On being More Product with Lizehen"
                  ></span>
                </h1>
                <p class="text-muted mt-3 f-20">
                  Donec iaculis ligula eros none interdum sem fusce <br />
                  venenaatis nec biendum Susisse potenti.
                </p>
                <div class="mt-5">
                  <div class="search-form">
                    <form action="#">
                      <input type="text" placeholder="Email" />
                      <button type="submit" class="btn btn-primary">
                        SubCribe
                      </button>
                    </form>
                  </div>
                </div>

                <div class="home-img-2">
                  <img
                    src="images/features/img-8.png"
                    class="img-fluid"
                    alt=""
                  />
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
export default {
  mounted() {
    // typed
    $('.element').each(function () {
      var $this = $(this)
      $this.typed({
        strings: $this.attr('data-elements').split(','),
        typeSpeed: 100, // typing speed
        backDelay: 3000, // pause before backspacing
      })
    })
  },
}
</script>

<style lang="scss" scoped>
</style>