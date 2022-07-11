<template>
  <div class="gallery-item-buttons d-flex">
    <div class="w-50 pr-2" :class="isSelected ? 'w-100' : 'w-50 pr-2'">
      <a
        href="#"
        @click.prevent="selectTheme(theme)"
        :class="
          isSelected ? 'btn-outline-primary btn-choose-plan' : 'btn-primary'
        "
        class="w-100 btn"
      >
        <span
          v-if="isSelected"
          class="d-flex align-items-center justify-content-between"
          ><span>Choose Plan</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            viewBox="0 0 11 11"
          >
            <path
              id="arrow-right"
              d="M4,8.886v1.389h8.333L8.514,14.094l.986.986L15,9.58,9.5,4.08l-.986.986,3.819,3.819Z"
              transform="translate(-4 -4.08)"
              fill="#4252fd"
            />
          </svg>
        </span>
        <span v-if="!isSelected">Select theme</span>
      </a>
    </div>
    <div class="w-50 pl-2" :class="isSelected ? 'd-none' : 'w-50 pl-2'">
      <a href="#" class="w-100 btn btn-outline-primary">Live demo</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    theme: [Array, Object],
  },
  computed: {
    isSelected() {
      if (this.theme && this.$store.state.themeInCart)
        return this.$store.state.themeInCart.id == this.theme.id
      return false
    },
  },
  methods: {
    selectTheme(theme) {
      if (this.isSelected) return this.$router.push(`/pricing`)
      else this.$store.commit('selectTheme', theme)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>