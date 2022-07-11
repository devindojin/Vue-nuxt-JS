<template>
  <div class="website-notice" :id="'notice-' + id">
    <div class="container text-center">
      <p class="text-center w-100 m-0" v-html="noticeText"></p>
    </div>
    <a class="notice-close" href="#" @click.prevent="dismissNotices(id)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 20 20"
      >
        <path
          id="Path_674"
          data-name="Path 674"
          d="M24.964,5.866a1.511,1.511,0,0,0-2.139,0l-7.418,7.4L7.99,5.851A1.512,1.512,0,0,0,5.851,7.99l7.418,7.418L5.851,22.825A1.512,1.512,0,0,0,7.99,24.964l7.418-7.418,7.418,7.418a1.512,1.512,0,0,0,2.139-2.139l-7.418-7.418L24.964,7.99A1.52,1.52,0,0,0,24.964,5.866Z"
          transform="translate(-5.408 -5.408)"
          fill="#686E9A"
        />
      </svg>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    noticeText: [String],
    visibility: [String],
    notice_hide_settings: [String],
    days_months: [Number],
    id: [Number],
  },
  data() {
    return {
      //noticeFlag: false,
    }
  },
  methods: {
    dismissNotices(id) {
      console.log(this.$props.notice_hide_settings, this.$props.days_months)
      let currentTime = +new Date()
      var calculateTime = 0
      let sessionItem = []
      if (this.$props.notice_hide_settings == 'days') {
        calculateTime = {
          id: this.$props.id,
          timestamp:
            currentTime + this.$props.days_months * 24 * 60 * 60 * 1000,
        }
        this.$store.commit('dismissNotice', calculateTime)
      } else if (this.$props.notice_hide_settings == 'months') {
        calculateTime = {
          id: this.$props.id,
          timestamp:
            currentTime + this.$props.days_months * 28 * 24 * 60 * 60 * 1000,
        }
        this.$store.commit('dismissNotice', calculateTime)
      } else if (this.$props.notice_hide_settings == 'session') {
        calculateTime = { id: this.$props.id, timestamp: currentTime }
        let noticeExists = sessionStorage.getItem('notices')
        if (noticeExists) {
          sessionItem = JSON.parse(noticeExists)
        }
        sessionItem.push(calculateTime)
        console.log(sessionItem)
        console.log(calculateTime)
        sessionStorage.setItem('notices', JSON.stringify(sessionItem))
      }

      document.getElementById('notice-' + id).remove()
    },
  },
  computed: {},
  mounted() {
    //console.log(this.$props.notice_hide_settings,this.$props.days_months)
  },
}
</script>

<style lang="scss" scoped>
.website-notice.hide {
  display: none;
}
</style>