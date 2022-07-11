<template>
  <div class="collapse navbar-collapse" id="navbarCollapse">
    <PublicNav v-if="!userLogin" />
    <UserNav v-if="userLogin" />
    <ul class="navbar-nav navbar-center">
      <li class="nav-item d-inline-block d-lg-none">
        <nuxt-link to="/login/" class="nav-link" v-if="!userLogin"
          >Login</nuxt-link
        >
        <a href="#" @click.prevent="logout()" class="nav-link" v-if="userLogin"
          >Logout</a
        >
      </li>
    </ul>
    <div class="navbar-button d-none d-lg-inline-block">
      <nuxt-link
        to="/login/"
        class="btn btn-sm btn-outline-primary btn-round"
        v-if="!userLogin"
        >Login</nuxt-link
      >
      <a
        href="#"
        @click.prevent="logout()"
        class="btn btn-sm btn-outline-primary btn-round"
        v-if="userLogin"
        >Logout</a
      >
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit('logOutUser')
      this.$router.push('/')
    },
  },
  computed: {
    userName() {
      return this.$store.state.currentUser.first_name
    },
    userLogin() {
      return this.$store.state.isAuthenticated
    },
  },
}
</script>

<style lang="scss" scoped>
</style>