<template>
  <!-- START FOOTER -->
  <section class="py-5" :class="bg">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="text-center">
            <p class="text-muted mb-0">© All rights reserved, Supersites Inc.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- END FOOTER -->
</template>

<script>
export default {
  props: {
    bg: {
      type: String,
      default: 'bg-light',
    },
  },
}
</script>

<style lang="scss" scoped>
</style>