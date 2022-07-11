<template>
  <div class="gallery-item">
    <div class="gallery-item-container">
      <div class="gallery-item-bg"></div>
      <div class="item-thumbnail" @click="$emit('showFullImage')">
        <div
          :style="`background-image:url('https://admin.supersites.io/assets/${theme.thumbnail.id}?fit=cover&width=350&height=350&quality=70')`"
        ></div>
      </div>

      <div class="gallery-item-details" v-if="theme.business_types.length > 0">
        <h3 class="h6">
          <nuxt-link :to="`/themes/${theme.id}/`"
            >Theme ID - {{ theme.id }}
            <span
              v-if="theme.free_theme == 'yes' ? true : false"
              class="badge badge-primary"
              >Free</span
            >
          </nuxt-link>
        </h3>
        <div>
          <span
            v-for="(item, index) in theme.business_types"
            :key="index"
            class="text-muted caption"
          >
            {{ item.business_types_id.name
            }}<em v-if="index + 1 != theme.business_types.length">,</em>
          </span>
        </div>
        <div class="gallery-item-buttons d-flex">
          <div class="w-50 pr-2">
            <nuxt-link
              :to="`/themes/${theme.id}/`"
              class="w-100 ss-btn ss-btn-primary ss-btn-auto"
            >
              <span>Select theme</span>
            </nuxt-link>
          </div>
          <div class="w-50 pl-2">
            <nuxt-link
              :to="`/themes/demos/${theme.id}/`"
              class="w-100 ss-btn ss-btn-outline ss-btn-auto"
              >Live demo</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    theme: [Array, Object],
  },
  methods: {
    slug(str) {
      return _.kebabCase(str)
    },
  },
  computed: {
    itemUrl() {
      return (
        '/themes/' +
        this.theme.id +
        '-' +
        this.slug(this.theme.business_types[0].business_types_id.name)
      )
    },
  },
}
</script>

<style lang="scss" scoped>
</style>