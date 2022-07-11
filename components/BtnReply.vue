<template>
  <a href="#" @click.prevent="reply" class="btn-reply">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g id="Reply_Icon" transform="translate(-10 -10)">
        <rect
          id="Rectangle_3339"
          data-name="Rectangle 3339"
          width="24"
          height="24"
          transform="translate(10 10)"
          fill="#fff"
        />
        <path
          id="messenger"
          d="M10,0A10,10,0,0,0,1.326,14.978C-.052,19.258.038,19.962.038,19.962s.7.091,4.984-1.288A10,10,0,1,0,10,0Zm0,18.437a8.413,8.413,0,0,1-4.466-1.278.782.782,0,0,0-.654-.081l-2.888.93.93-2.888a.782.782,0,0,0-.081-.654A8.438,8.438,0,1,1,10,18.437ZM5.117,10Z"
          transform="translate(12 12)"
          fill="#686E9A"
        />
      </g>
    </svg>

    <span>{{ title }}</span>
  </a>
</template>

<script>
export default {
  props: {
    title: String,
  },
  methods: {
    reply() {
      if (this.$store.state.isAuthenticatedFB) {
        this.$emit('reply')
      } else {
        this.$store.commit('showLoginPopup', true)
      }
    },
  },
}
</script>
