<template>
  <span :title="'Published on: ' + date">{{ date }}</span>
</template>

<script>
export default {
  props: {
    date: String,
  },
};
</script>
