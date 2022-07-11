<template>
  <nav
    class="navbar navbar-expand-lg navbar-custom sticky sticky-dark"
    :class="{ 'fixed-top': sticky }"
  >
    <Notice
      v-for="(notice, i) in $config[0].global.notices"
      :notice-text="notice.texts"
      :visibility="notice.visibility"
      :id="notice.id"
      :notice_hide_settings="notice.hide_settings"
      :days_months="notice.days_months"
      v-bind:key="notice.id"
      v-if="notice.visibility == 'everyone' && !$store.state.isAuthenticated"
    />
    <Notice
      v-for="(notice, i) in $config[0].global.notices"
      :notice-text="notice.texts"
      :visibility="notice.visibility"
      :id="notice.id"
      :notice_hide_settings="notice.hide_settings"
      :days_months="notice.days_months"
      v-bind:key="notice.id"
      v-if="
        notice.visibility == 'customers_only' && $store.state.isAuthenticated
      "
    />
    <Notice
      v-for="(notice, i) in $config[0].global.notices"
      :notice-text="notice.texts"
      :visibility="notice.visibility"
      :id="notice.id"
      :notice_hide_settings="notice.hide_settings"
      :days_months="notice.days_months"
      v-bind:key="notice.id"
      v-if="
        notice.visibility == 'specific_customer' &&
        $store.state.isAuthenticated &&
        checkCurrentUser(notice.customers)
      "
    />

    <div class="container">
      <!-- LOGO -->
      <nuxt-link class="navbar-brand logo text-uppercase" to="/">
        <!-- <animated-logo /> -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="219.26"
          height="28.98"
          viewBox="0 0 219.26 28.98"
        >
          <g id="logo" transform="translate(-593.1 -391.905)">
            <path
              id="Path_5384"
              data-name="Path 5384"
              d="M7.41.21c4.5,0,7.26-1.95,7.26-4.95,0-6.27-9.9-3.39-9.9-6.63,0-1.05,1.08-1.8,3.36-1.8a8.769,8.769,0,0,1,4.59,1.2l1.44-2.85a12.75,12.75,0,0,0-6-1.38c-4.32,0-7.05,1.98-7.05,5.01,0,6.39,9.9,3.51,9.9,6.57,0,1.11-.99,1.77-3.36,1.77A10.779,10.779,0,0,1,2.07-4.44L.63-1.59A12.728,12.728,0,0,0,7.41.21ZM29.67-16.02v8.1c0,3.21-1.77,4.83-4.38,4.83-2.37,0-3.75-1.38-3.75-4.29v-8.64H17.79v9.15c0,4.83,2.79,7.08,6.9,7.08a6.544,6.544,0,0,0,5.16-2.25V0h3.57V-16.02Zm17.55-.18a6.605,6.605,0,0,0-5.31,2.28v-2.1H38.34V5.82h3.75V-1.95A6.582,6.582,0,0,0,47.22.21a7.8,7.8,0,0,0,8.13-8.22A7.8,7.8,0,0,0,47.22-16.2ZM46.8-3a4.682,4.682,0,0,1-4.77-5.01,4.682,4.682,0,0,1,4.77-5.01,4.659,4.659,0,0,1,4.74,5.01A4.659,4.659,0,0,1,46.8-3ZM73.98-7.92c0-5.01-3.42-8.28-8.1-8.28A7.967,7.967,0,0,0,57.6-8.01c0,4.77,3.48,8.22,8.85,8.22A8.12,8.12,0,0,0,72.9-2.4L70.89-4.71a5.741,5.741,0,0,1-4.35,1.74c-2.79,0-4.74-1.5-5.19-3.84H73.92C73.95-7.17,73.98-7.62,73.98-7.92Zm-8.1-5.28a4.361,4.361,0,0,1,4.53,3.9H61.32A4.428,4.428,0,0,1,65.88-13.2Zm15.27-.48v-2.34H77.58V0h3.75V-7.77c0-3.27,1.8-4.95,4.65-4.95a4.761,4.761,0,0,1,.87.09V-16.2C84.18-16.2,82.23-15.36,81.15-13.68ZM95.04.21c4.5,0,7.26-1.95,7.26-4.95,0-6.27-9.9-3.39-9.9-6.63,0-1.05,1.08-1.8,3.36-1.8a8.769,8.769,0,0,1,4.59,1.2l1.44-2.85a12.75,12.75,0,0,0-6-1.38c-4.32,0-7.05,1.98-7.05,5.01,0,6.39,9.9,3.51,9.9,6.57,0,1.11-.99,1.77-3.36,1.77A10.779,10.779,0,0,1,89.7-4.44L88.26-1.59A12.728,12.728,0,0,0,95.04.21Zm12.39-18.87a2.3,2.3,0,0,0,2.4-2.34,2.233,2.233,0,0,0-2.4-2.16,2.284,2.284,0,0,0-2.4,2.25A2.284,2.284,0,0,0,107.43-18.66ZM105.54,0h3.75V-16.02h-3.75Zm17.25-3.54a3.372,3.372,0,0,1-2.1.66c-1.44,0-2.22-.84-2.22-2.4V-12.9h4.29v-3h-4.29v-3.66h-3.75v3.66h-2.64v3h2.64v7.71c0,3.54,2.01,5.4,5.52,5.4a5.893,5.893,0,0,0,3.6-1.08Zm18.66-4.38c0-5.01-3.42-8.28-8.1-8.28a7.967,7.967,0,0,0-8.28,8.19c0,4.77,3.48,8.22,8.85,8.22a8.12,8.12,0,0,0,6.45-2.61l-2.01-2.31a5.741,5.741,0,0,1-4.35,1.74c-2.79,0-4.74-1.5-5.19-3.84h12.57C141.42-7.17,141.45-7.62,141.45-7.92Zm-8.1-5.28a4.361,4.361,0,0,1,4.53,3.9h-9.09A4.428,4.428,0,0,1,133.35-13.2ZM150,.21c4.5,0,7.26-1.95,7.26-4.95,0-6.27-9.9-3.39-9.9-6.63,0-1.05,1.08-1.8,3.36-1.8a8.769,8.769,0,0,1,4.59,1.2l1.44-2.85a12.75,12.75,0,0,0-6-1.38c-4.32,0-7.05,1.98-7.05,5.01,0,6.39,9.9,3.51,9.9,6.57,0,1.11-.99,1.77-3.36,1.77a10.779,10.779,0,0,1-5.58-1.59l-1.44,2.85A12.728,12.728,0,0,0,150,.21Z"
              transform="translate(655.1 415.065)"
            />
            <g id="Сгруппировать_1" transform="translate(2 1)">
              <circle
                id="Эллипс_1"
                cx="8"
                cy="8"
                r="8"
                transform="translate(631.1 398.065)"
                fill="#2ac942"
              />
              <circle
                id="Эллипс_2"
                cx="8"
                cy="8"
                r="8"
                transform="translate(611.1 398.065)"
                fill="#fcbd28"
              />
              <circle
                id="Эллипс_3"
                cx="8"
                cy="8"
                r="8"
                transform="translate(591.1 398.065)"
                fill="#fb5e53"
              />
            </g>
          </g>
        </svg>
      </nuxt-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="mdi mdi-menu"></i>
      </button>
      <Navmenu />
    </div>
    <slot></slot>
  </nav>
</template>

<script>
export default {
  props: {
    sticky: Boolean,
  },
  mounted() {
    let dismissObj = this.$store.state.noticeDismissedUntill
    let noticeSession = sessionStorage.getItem('notices')
    //console.log('mounted ', dismissObj,noticeSession)
    var that = this
    setTimeout(function () {
      if (dismissObj.length > 0) {
        for (let i = 0; i < dismissObj.length; i++) {
          //console.log(dismissObj[i].id,dismissObj[i].timestamp)
          let currentTime = +new Date()
          console.log(currentTime)
          if (currentTime < dismissObj[i].timestamp) {
            if (document.getElementById('notice-' + dismissObj[i].id)) {
              console.log('hide ' + dismissObj[i].id)
              document.getElementById('notice-' + dismissObj[i].id).className +=
                ' hide'
            }
          } else {
            console.log('show ' + dismissObj[i].id)
            that.removeHideNotice(dismissObj[i].id)
          }
        }
      }
      if (noticeSession) {
        noticeSession = JSON.parse(noticeSession)
        for (let i = 0; i < noticeSession.length; i++) {
          console.log('hide ' + noticeSession[i].id)
          if (document.getElementById('notice-' + noticeSession[i].id)) {
            document.getElementById(
              'notice-' + noticeSession[i].id
            ).className += ' hide'
          }
        }
      }
    }, 400)
  },
  methods: {
    removeHideNotice(id) {
      let dismissObj = this.$store.state.noticeDismissedUntill
      if (dismissObj.length > 0) {
        let newObj = dismissObj.filter(function (d) {
          console.log(d.id)
          return d.id != id ? true : false
          //return true;
        })
        console.log(newObj)
        this.$store.commit('updateNotice', newObj)
      }
    },
    checkCurrentUser(data) {
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          //console.log(data[i].directus_users_id)
          if (data[i].directus_users_id == this.$store.state.currentUser.id) {
            return true
          }
        }
      }
      return false
    },
    findWithAttr(array, attr, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i
        }
      }
      return -1
    },
  },
  computed: {},
}
</script>

<style lang="scss" scoped>
</style>