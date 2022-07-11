<template>
  <div class="post-last-updated">
    <span>Last Updated</span>
    <span class="text-muted">{{ date }}</span>
  </div>
</template>

<script>
export default {
  props: {
    date: String,
  },
}
</script>

