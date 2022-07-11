<template>
  <div class="sec sec-faq-v2">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <h2 class="h2">Lorem ipsum dolor amet consectetur.</h2>
        </div>
      </div>
      <div class="faq-items">
        <div
          class="faq-item row justify-content-between"
          v-for="(item, index) of faqs"
          :key="index"
        >
          <div class="col-md-6 col-lg-4">
            <h4 class="h4">{{ item.question }}</h4>
          </div>
          <div class="col-md-6">
            <div class="text-muted mt-4 mt-md-0 body2">
              {{ item.answer }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    superscript: String,
    title: String,
    faqs: [Array, Object],
  },
}
</script>

<style lang="scss" scoped>
</style>