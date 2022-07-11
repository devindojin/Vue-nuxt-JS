<template>
  <section class="sec sec-how-to-create">
    <div class="container">
      <div class="row">
        <div class="col-md-9 col-lg-8">
          <h2 class="h2 mb-2">
            How to create<br />
            a free website.
          </h2>
          <div class="mt-4">
            <div class="mb-2">
              <p class="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco labo.
              </p>
            </div>
            <a href="#" class="ss-btn ss-btn-bordered ss-btn-wide mt-4">
              Create website for free
            </a>
          </div>
        </div>
      </div>
      <div class="how-to-steps mt-4 mt-lg-5 pt-5">
        <div class="row">
          <div class="col-md-6 step-item" v-for="(step, i) in 6">
            <span class="number">{{ i + 1 }}</span>
            <p class="body2">
              Sign up for a free website builder. Choose what kind of website
              you want to create.
            </p>
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