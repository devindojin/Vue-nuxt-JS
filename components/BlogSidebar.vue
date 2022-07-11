<template>
  <div class="blog-sticky-actions" :class="{ expanded: sideBarExpanded }">
    <button class="btn-sidebar" @click="sideBarExpanded = !sideBarExpanded">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11.789"
        height="10.003"
        viewBox="0 0 11.789 10.003"
      >
        <g id="Group_632" data-name="Group 632" transform="translate(0 0)">
          <g id="Group_631" data-name="Group 631" transform="translate(0 0)">
            <path
              id="Path_4419"
              data-name="Path 4419"
              d="M14.572,5h3.215l-3.572,5,3.572,5H14.572L11,10Z"
              transform="translate(-11 -5)"
              fill="#b2b9c8"
            />
            <path
              id="Path_4420"
              data-name="Path 4420"
              d="M7.572,5h3.215L7.215,10l3.572,5H7.572L4,10Z"
              transform="translate(1.001 -5)"
              fill="#b2b9c8"
            />
          </g>
        </g>
      </svg>
    </button>
    <btn-clap
      :hide-text="true"
      :totalClap="totalClap"
      @clapAdded="newClapAdded"
    />
    <span class="caption">Comments</span>
    <div class="btn-share-container">
      <a href="#" class="btn btn-subscribe" @click.prevent="scrollToComments()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 22 22"
        >
          <path
            id="messenger"
            d="M11,0A11,11,0,0,0,1.459,16.476C-.057,21.184.041,21.959.041,21.959s.772.1,5.483-1.417A11,11,0,1,0,11,0Zm0,20.281a9.254,9.254,0,0,1-4.913-1.406.86.86,0,0,0-.719-.089L2.191,19.809l1.023-3.177a.86.86,0,0,0-.089-.719A9.282,9.282,0,1,1,11,20.281ZM5.629,11Z"
            fill="#686E9A"
          />
        </svg>
      </a>
    </div>
    <span class="caption">Share</span>
    <btn-share
      @click.native="sideBarExpanded = false"
      media="facebook"
      :url="getShareUrl('facebook')"
    />
    <btn-share
      @click.native="sideBarExpanded = false"
      media="linkedin"
      :url="getShareUrl('linkedin')"
    />
    <btn-share
      @click.native="sideBarExpanded = false"
      media="twitter"
      :url="getShareUrl('twitter')"
    />
    <span class="caption">Subscribe</span>
    <div class="btn-share-container">
      <a @click.prevent="scrollToForm()" href="#" class="btn btn-subscribe">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="16"
          viewBox="0 0 22 16"
        >
          <path
            id="Path_4416"
            data-name="Path 4416"
            d="M0,0V16H22V0ZM18.1,2,11,7.4,3.9,2Zm2.1,12H1.8V3L11,9.9,20.2,3Z"
            fill="#686E9A"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    urls: [Array, Object],
    totalClap: [String, Number],
    slug: String,
  },

  data() {
    return {
      sideBarExpanded: false,
    }
  },
  methods: {
    newClapAdded() {
      this.$emit('clapAdded')
    },
    scrollToComments() {
      var element = document.getElementById('comments')
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      })
      this.sideBarExpanded = false
    },
    scrollToForm() {
      var element = document.getElementById('subscribe')
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      })
      this.sideBarExpanded = false
    },
  },
}
</script>

