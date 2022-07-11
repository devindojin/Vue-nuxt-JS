<template>
  <div class="alert alert-warning d-inline-flex duedate" role="alert">
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <path
          id="error_outline_black_24dp"
          d="M12,7a1,1,0,0,1,1,1v4a1,1,0,0,1-2,0V8A1,1,0,0,1,12,7Zm-.01-5A10,10,0,1,0,22,12,10,10,0,0,0,11.99,2ZM12,20a8,8,0,1,1,8-8A8,8,0,0,1,12,20Zm1-3H11V15h2Z"
          transform="translate(-2 -2)"
          fill="#fcbd28"
        />
      </svg>
    </div>
    <div class="pl-2">
      <span
        >Please complete the website brief by
        {{ new Date(newDate) | dateFormat('MMMM DD, YYYY') }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    date: String,
  },
  data() {
    return {
      newDate: null,
    }
  },
  created() {
    //console.log(this.$props.date)
    const d = new Date(this.$props.date)
    d.setDate(d.getDate() + 7)
    this.newDate = d
  },
}
</script>

<style lang="scss" scoped>
</style>