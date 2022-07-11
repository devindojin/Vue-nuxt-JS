<template>
  <ul class="navbar-nav ml-auto navbar-center" id="mySidenav">
    <li class="nav-item" v-if="$route.name != 'home'">
      <nuxt-link to="/" class="nav-link">Home</nuxt-link>
    </li>
    <li class="nav-item" v-if="$route.name == 'home'">
      <a
        href="#how-it-works
      "
        class="nav-link smoothlink"
        >How it works</a
      >
    </li>
    <li class="nav-item" v-if="$route.name != 'home'">
      <nuxt-link to="/how-it-works/" class="nav-link">How it works</nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link to="/features/" class="nav-link">Features</nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link to="/pricing/" class="nav-link">
        <span class="mr-1">Pricing</span>
      </nuxt-link>
    </li>

    <li class="nav-item">
      <nuxt-link to="/themes/" class="nav-link">
        <span class="mr-1">Themes</span>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>