// import '@storefront-ui/vue/styles.scss'
import Vue from 'vue'
import VuexPersistence from 'vuex-persist'
import VueClipboard from 'vue-clipboard2'
import Vue2TouchEvents from 'vue2-touch-events'
import infiniteScroll from 'vue-infinite-scroll'
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format'
import swal from 'sweetalert';
import inViewportDirective from 'vue-in-viewport-directive'
Vue.directive('in-viewport', inViewportDirective)
Vue.use(VueClipboard)
Vue.use(infiniteScroll)
Vue.use(Vue2TouchEvents)
Vue.use(VueFilterDateFormat, {
  dayOfWeekNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayOfWeekNamesShort: ['Su', 'Mo', 'Tu', 'We', 'Tr', 'Fr', 'Sa'],
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  // Timezone offset, in minutes (0 - UTC, 180 - Russia, undefined - current)
  timezone: 0,
})
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
Vue.filter('currencyFormat', function (value) {
  if (!value) return ''
  return Number(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
})
export default ({ store }) => {
  new VuexPersistence({
    /* your options */
    storage: window.localStorage,
  }).plugin(store)
}
