<template>
  <div class="mt-2 pt-2 mt-lg-0 pt-lg-0 header-breadcrumb">
    <div class="breadcrumb-container">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><nuxt-link to="/">Home</nuxt-link></li>
            <li class="breadcrumb-item">
              <nuxt-link to="/themes/">Themes</nuxt-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ title }}
            </li>
          </ol>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    title: [String, Number],
  },
}
</script>

<style lang="scss" scoped>
</style>