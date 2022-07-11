<template>
  <section class="orders mt-3 mt-md-4 pt-4 pb-5 mb-5" :class="className">
    <div class="container">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    className: String,
  },
}
</script>
