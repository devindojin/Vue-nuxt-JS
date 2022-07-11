<template>
  <section class="bg-home bg-home-4" id="home">
    <div class="bg-overlay"></div>
    <a
      id="video"
      class="player"
      data-property="{videoURL:'http://youtu.be/dwfjayxRvqw',containment:'#home', showControls:false, autoPlay:true, loop:true, mute:true, startAt:0, opacity:1, quality:'default'}"
    ></a>
    <div class="home-center">
      <div class="home-desc-center">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="home-content">
                <div class="home-badge">
                  <p class="f-13">
                    <span class="text-primary">70% Off</span> for first 3 month
                  </p>
                </div>
                <h1 class="home-title text-white">
                  Make more time for the work that matters most
                </h1>
                <p class="text-white-50 mt-3 f-20">
                  Donec iaculis ligula eros none interdum sem fusce <br />
                  venenaatis nec biendum Susisse potenti.
                </p>
                <div class="mt-5">
                  <a href="" class="btn btn-primary"
                    >Get Started <span class="text-white-50">- For Free</span>
                    <i class="mdi mdi-arrow-right ml-1"></i
                  ></a>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="home-img">
                <img src="images/features/img-7.png" class="img-fluid" alt="" />
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
</style>