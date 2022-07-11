<template>
  <div class="title-with-divider">
    <div class="container">
      <h3 class="h3">{{ title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
}
</script>
