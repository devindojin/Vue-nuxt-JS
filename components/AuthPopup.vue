<template>
  <div class="auth-popup-container" @click.stop="">
    <a href="#" @click.prevent="closePopup" class="popup-close-button">
      <svg
        id="Close"
        xmlns="http://www.w3.org/2000/svg"
        width="80"
        height="80"
        viewBox="0 0 80 80"
      >
        <rect
          id="Rectangle_3366"
          data-name="Rectangle 3366"
          width="80"
          height="80"
          fill="#fff"
        />
        <g
          id="Group_307"
          data-name="Group 307"
          transform="translate(-375.515 8.485)"
        >
          <rect
            id="Rectangle_3184"
            data-name="Rectangle 3184"
            width="28.521"
            height="2.593"
            transform="translate(404.515 40.682) rotate(-45)"
            fill="#686E9A"
          />
          <rect
            id="Rectangle_3185"
            data-name="Rectangle 3185"
            width="28.521"
            height="2.593"
            transform="translate(406.349 20.515) rotate(45)"
            fill="#686E9A"
          />
        </g>
      </svg>
    </a>
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    closePopup() {
      this.$store.commit('closeAuthPopup')
    },
  },
}
</script>
