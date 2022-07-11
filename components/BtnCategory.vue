<template>
  <nuxt-link :to="catUrl" class="btn-grey category"
    ><span>{{ title }}</span></nuxt-link
  >
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    title: String,
    active: Boolean,
    url: {
      type: String,
      default: '#',
    },
  },
  computed: {
    catUrl() {
      return (
        '/insights/' + this.$props.title.toLowerCase().replace(/ /g, '-') + '/'
      )
    },
  },
  methods: {},
}
</script>

