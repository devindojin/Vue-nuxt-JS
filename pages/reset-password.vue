<template>
  <div>
    <ResetPassword />
  </div>
</template>

<script>
export default {
  layout: 'auth',
  created() {
    if (this.$store.state.isAuthenticated) {
      this.$router.push('/')
    }
  },
}
</script>

<style lang="scss" scoped>
</style>