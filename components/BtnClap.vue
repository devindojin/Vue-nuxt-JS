<template>
  <div style="display: inline">
    <span class="caption" v-if="hideText">{{ totalClap }} Claps</span>

    <a
      @click.prevent="animateClap"
      href="#"
      class="btn btn-clap"
      :class="{ animate }"
    >
      <svg
        id="clap"
        xmlns="http://www.w3.org/2000/svg"
        width="22.004"
        height="22"
        viewBox="0 0 22.004 22"
      >
        <path
          id="Path_686"
          data-name="Path 686"
          d="M0,8.062c.106,1.726.1,3.156.089,4.419C.07,15.828.038,18.009,2.485,20.362a6.209,6.209,0,0,0,8.53,0h0l6.634-6.381a1.881,1.881,0,0,0,0-2.735,2,2,0,0,0-.555-.378l1.1-1.058a1.884,1.884,0,0,0,0-2.735,2.005,2.005,0,0,0-.624-.407,1.878,1.878,0,0,0-.324-2.328,2,2,0,0,0-.588-.392,1.878,1.878,0,0,0-.27-2.412,2.074,2.074,0,0,0-2.419-.312,1.93,1.93,0,0,0-.424-.6,2.069,2.069,0,0,0-2.842,0c-.041.039-3.547,3.4-5.792,5.555L4.565,3.835a1.975,1.975,0,0,0-2.01-1.884A1.975,1.975,0,0,0,.546,3.838c0,.018,0,.036,0,.054C.6,4.768.629,5.65.637,6.644A1.879,1.879,0,0,0,0,8.062Zm16.7,5.008-6.634,6.381a4.829,4.829,0,0,1-6.634,0c-2.032-1.955-2.022-3.628-2-6.962.008-1.274.017-2.718-.089-4.471A.677.677,0,0,1,2.485,7.6c.227.219.14.313.2.547v0l.538,3.659a.678.678,0,0,0,1.137.365l6.67-6.414a.69.69,0,0,1,.928.017.627.627,0,0,1,0,.912h0L9.119,9.423a.627.627,0,0,0,0,.912.689.689,0,0,0,.948,0l3.791-3.647a.69.69,0,0,1,.948,0,.627.627,0,0,1,0,.912l-3.791,3.647a.627.627,0,0,0,0,.912.689.689,0,0,0,.948,0l2.843-2.735a.69.69,0,0,1,.948,0,.628.628,0,0,1,0,.912L12.91,13.069a.627.627,0,0,0,0,.912.689.689,0,0,0,.948,0l1.9-1.826a.69.69,0,0,1,.944,0,.627.627,0,0,1,0,.912Zm-.4-7.817a.627.627,0,0,1,0,.912l-.151.145a1.938,1.938,0,0,0-.393-.533A2.014,2.014,0,0,0,15.2,5.4l.152-.146A.69.69,0,0,1,16.3,5.253ZM17.246,8.9l-.152.146a1.926,1.926,0,0,0-.392-.534,2,2,0,0,0-.555-.377l.152-.146a.69.69,0,0,1,.948,0,.628.628,0,0,1,0,.912ZM15.44,2.448a.627.627,0,0,1,0,.91L13.3,5.4a1.939,1.939,0,0,0-.393-.533,2,2,0,0,0-.55-.375l2.132-2.041a.69.69,0,0,1,.948,0ZM4.908,8c2-1.926,6.692-6.421,6.74-6.467a.69.69,0,0,1,.948,0,.626.626,0,0,1,.039.87c-6.267,6.016,2.947-2.848-8.27,7.943L4.029,8.061A.689.689,0,0,0,4.908,8ZM1.887,3.847A.677.677,0,0,1,3.03,3.429c.227.219.14.313.2.547l.439,2.989a2.031,2.031,0,0,0-1.7-.841c-.013-.8-.041-1.541-.085-2.276Z"
          transform="translate(0 -0.059)"
          fill="#686E9A"
        />
        <path
          id="Path_687"
          data-name="Path 687"
          d="M453.6,92.042h-1.055a.527.527,0,1,0,0,1.055H453.6a.527.527,0,0,0,0-1.055Z"
          transform="translate(-432.126 -88.044)"
          fill="#686E9A"
        />
        <path
          id="Path_688"
          data-name="Path 688"
          d="M421.921,2,422.976.942A.527.527,0,0,0,422.23.2l-1.055,1.055a.527.527,0,0,0,.746.746Z"
          transform="translate(-402.217 -0.041)"
          fill="#686E9A"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="47.311"
        height="45.436"
        viewBox="0 0 47.311 45.436"
        id="popper"
      >
        <g transform="translate(-919.774 -702.781)">
          <path
            id="Polygon_3"
            data-name="Polygon 3"
            d="M2.5,0,5,8H0Z"
            transform="translate(927.43 738.781) rotate(45)"
            fill="#b2b9c8"
          />
          <path
            id="Polygon_4"
            data-name="Polygon 4"
            d="M1.5,0,3,6H0Z"
            transform="translate(932.344 741.516) rotate(24)"
            fill="#d0d6e2"
          />
          <path
            id="Polygon_5"
            data-name="Polygon 5"
            d="M2.5,0,5,8H0Z"
            transform="translate(956.892 737.317) rotate(-45)"
            fill="#b2b9c8"
          />
          <path
            id="Polygon_6"
            data-name="Polygon 6"
            d="M1.5,0,3,6H0Z"
            transform="matrix(0.914, -0.407, 0.407, 0.914, 952.774, 737.736)"
            fill="#d0d6e2"
          />
          <path
            id="Polygon_7"
            data-name="Polygon 7"
            d="M2.5,0,5,8H0Z"
            transform="translate(961.428 712.217) rotate(-135)"
            fill="#b2b9c8"
          />
          <path
            id="Polygon_8"
            data-name="Polygon 8"
            d="M1.5,0,3,6H0Z"
            transform="matrix(-0.914, -0.407, 0.407, -0.914, 956.514, 709.483)"
            fill="#d0d6e2"
          />
          <path
            id="Polygon_9"
            data-name="Polygon 9"
            d="M2.5,0,5,8H0Z"
            transform="translate(928.966 715.682) rotate(135)"
            fill="#b2b9c8"
          />
          <path
            id="Polygon_10"
            data-name="Polygon 10"
            d="M1.5,0,3,6H0Z"
            transform="matrix(-0.914, 0.407, -0.407, -0.914, 933.085, 715.263)"
            fill="#d0d6e2"
          />
        </g>
      </svg>

      <span v-if="!hideText">{{ totalClap }} Claps</span>
    </a>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      animate: false,
    }
  },
  props: {
    totalClap: [String, Number],
    hideText: {
      type: Boolean,
      default: false,
    },
  },
  created() {},
  methods: {
    animateClap() {
      this.animate = true
      this.$emit('clapAdded')

      setTimeout(() => {
        this.animate = false
      }, 1000)
    },
  },
}
</script>
