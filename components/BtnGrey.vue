<template>
  <a :href="url" class="btn-grey category" :class="active ? 'active' : ''"
    ><span>{{ title }}</span></a
  >
</template>

<script>
export default {
  props: {
    title: String,
    active: Boolean,
    url: {
      type: String,
      default: '#',
    },
  },
}
</script>

