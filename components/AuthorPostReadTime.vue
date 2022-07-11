<template>
  <span :title="'Total read time: ' + time">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18.001"
      viewBox="0 0 18 18.001"
    >
      <g id="clock" transform="translate(-0.002)">
        <path
          id="Path_695"
          data-name="Path 695"
          d="M9,0a9,9,0,1,0,9,9A9.01,9.01,0,0,0,9,0ZM9,16.71A7.71,7.71,0,1,1,16.712,9,7.719,7.719,0,0,1,9,16.71Z"
          transform="translate(0)"
          fill="#919bb0"
        />
        <path
          id="Path_696"
          data-name="Path 696"
          d="M99.791,46.9h-4.23V42.279a.645.645,0,1,0-1.29,0v5.268a.645.645,0,0,0,.645.645h4.875a.645.645,0,1,0,0-1.29Z"
          transform="translate(-86.161 -38.053)"
          fill="#919bb0"
        />
      </g>
    </svg>
    {{ time }} read
  </span>
</template>

<script>
export default {
  props: {
    time: String,
  },
};
</script>
