<template>
  <a href="#" class="btn-reply">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15.281"
      height="20"
      viewBox="0 0 15.281 20"
    >
      <path
        id="Path_699"
        data-name="Path 699"
        d="M100.5,1.913H95.557a.768.768,0,0,1-.719-.47A2.325,2.325,0,0,0,92.673,0H86.781A.781.781,0,0,0,86,.781V19.219a.781.781,0,0,0,1.563,0V10.781h5.11a.768.768,0,0,1,.719.471,2.325,2.325,0,0,0,2.166,1.442H100.5a.781.781,0,0,0,.781-.781V2.694A.781.781,0,0,0,100.5,1.913Zm-.781,9.219H95.557a.768.768,0,0,1-.719-.47,2.325,2.325,0,0,0-2.166-1.442h-5.11V1.563h5.11a.768.768,0,0,1,.719.471,2.325,2.325,0,0,0,2.166,1.442h4.161Z"
        transform="translate(-86)"
        fill="#686E9A"
      />
    </svg>

    <span>{{ title }}</span></a
  >
</template>

<script>
export default {
  props: {
    title: String,
  },
}
</script>
