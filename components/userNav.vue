<template>
  <ul class="navbar-nav ml-auto navbar-center" id="mySidenav">
    <li class="nav-item">
      <nuxt-link to="/my-account/" class="nav-link">Dashboard</nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link to="/my-account/orders/" class="nav-link">Orders</nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link to="/my-account/themes/" class="nav-link">Themes</nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link to="/my-account/website-briefs/" class="nav-link"
        >Briefs</nuxt-link
      >
    </li>
    <li class="nav-item">
      <nuxt-link to="/my-account/services/" class="nav-link"
        >Services</nuxt-link
      >
    </li>
  </ul>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>