<template>
  <div class="theme-live-preview">
    <nav
      class="navbar navbar-expand-lg navbar-custom sticky sticky-dark"
      v-if="navVisible"
    >
      <div class="container-fluid">
        <div
          class="row mx-auto w-100 align-items-center justify-content-between"
        >
          <div class="col-2 col-md-6 col-xl-4">
            <nuxt-link class="navbar-brand logo text-uppercase" to="/">
              <animated-logo />
            </nuxt-link>
          </div>
          <div class="col-xl-4 d-none d-xl-block device-switcher text-center">
            <div>
              <a
                href="#"
                :class="device == 'desktop' ? 'active' : ''"
                @click.prevent="setDevice('desktop')"
              >
                <svg
                  id="Component_82_5"
                  data-name="Component 82 – 5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                >
                  <path
                    class="icon"
                    id="desktop"
                    d="M30.75,0H1.25A1.248,1.248,0,0,0,0,1.246V20.852A1.248,1.248,0,0,0,1.25,22.1H9.061L7.507,25.2A1.247,1.247,0,0,0,8.625,27h14.75a1.247,1.247,0,0,0,1.118-1.8l-1.554-3.1H30.75A1.248,1.248,0,0,0,32,20.852V1.246A1.248,1.248,0,0,0,30.75,0Zm-9.4,24.508H10.647L11.856,22.1h8.288Zm8.147-4.9H2.5V2.492h27Zm0,0"
                    transform="translate(8 11)"
                    fill="#686E9A"
                  />
                </svg>
              </a>
              <a
                href="#"
                :class="device == 'tablet' ? 'active' : ''"
                @click.prevent="setDevice('tablet')"
              >
                <svg
                  id="Component_80_5"
                  data-name="Component 80 – 5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                >
                  <path
                    class="icon"
                    id="tablet"
                    d="M17.367,0H2.945A2.949,2.949,0,0,0,0,2.945V23.055A2.949,2.949,0,0,0,2.945,26H17.367a2.949,2.949,0,0,0,2.945-2.945V2.945A2.949,2.949,0,0,0,17.367,0ZM2.031,5.891h16.25V20.109H2.031Zm.914-3.859H17.367a.915.915,0,0,1,.914.914v.914H2.031V2.945A.915.915,0,0,1,2.945,2.031ZM17.367,23.969H2.945a.915.915,0,0,1-.914-.914v-.914h16.25v.914A.915.915,0,0,1,17.367,23.969Zm0,0"
                    transform="translate(14 11)"
                    fill="#686E9A"
                  />
                </svg>
              </a>
              <a
                href="#"
                :class="device == 'mobile' ? 'active' : ''"
                @click.prevent="setDevice('mobile')"
              >
                <svg
                  id="Component_81_5"
                  data-name="Component 81 – 5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                >
                  <path
                    class="icon"
                    id="cellphone"
                    d="M15.239,2.578A2.581,2.581,0,0,0,12.661,0H2.578A2.581,2.581,0,0,0,0,2.578V19.422A2.581,2.581,0,0,0,2.578,22H12.662a2.581,2.581,0,0,0,2.578-2.578V2.578ZM1.719,5.1h11.8V16.9H1.719Zm.859-3.38H12.662a.86.86,0,0,1,.859.859v.8H1.719v-.8A.86.86,0,0,1,2.578,1.719ZM12.661,20.281H2.578a.86.86,0,0,1-.859-.859v-.8h11.8v.8a.861.861,0,0,1-.86.859Zm0,0"
                    transform="translate(16 13)"
                    fill="#686E9A"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div class="col-10 col-md-6 col-xl-4 nav-buttons text-right">
            <nuxt-link
              :to="`/themes/${this.$route.params.slug}/`"
              class="mr-2 ss-btn ss-btn-primary ss-btn-small"
              ><span>Select theme</span></nuxt-link
            >
            <a href="#" @click.prevent="navVisible = false">
              <svg
                id="Close_button"
                data-name="Close button"
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
              >
                <g
                  id="Rectangle_392"
                  data-name="Rectangle 392"
                  fill="#f6f7fb"
                  stroke="#d9dbe1"
                  stroke-width="1"
                >
                  <rect width="48" height="48" rx="12" stroke="none" />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="47"
                    height="47"
                    rx="11.5"
                    fill="none"
                    class="bg"
                  />
                </g>
                <path
                  id="Path_1337"
                  data-name="Path 1337"
                  d="M21.053,5.775a1.208,1.208,0,0,0-1.711,0L13.408,11.7,7.473,5.762A1.21,1.21,0,0,0,5.762,7.473L11.7,13.408,5.762,19.342a1.21,1.21,0,1,0,1.711,1.711l5.934-5.934,5.934,5.934a1.21,1.21,0,1,0,1.711-1.711l-5.934-5.934,5.934-5.934A1.216,1.216,0,0,0,21.053,5.775Z"
                  transform="translate(10.593 10.593)"
                  fill="#686e9a"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
    <div class="iframe" :class="{ full: !navVisible }">
      <iframe
        v-if="live_demo_url"
        :src="live_demo_url"
        frameborder="0"
        :style="`width:${iframeWidth.width};`"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    let token = await this.getToken()
    //console.log(token);
    let themeData = await fetch(
      'https://admin.supersites.io/items/themes?filter[status][_eq]=published&filter[id][_eq]=' +
        this.$route.params.slug +
        '&access_token=' +
        token
    )
    themeData = await themeData.json()
    themeData = themeData.data
    // Check if theme demo is disabled
    if (themeData[0].disable_theme_preview) {
      // redirect to 404
      console.log('404')
      this.$router.push('/404/')
    } else {
      console.log('live')
      // set live_demo_url if present, otherwise set default demo url https://demos.supersites.io/xxx
      this.live_demo_url = themeData[0].live_demo_url
        ? themeData[0].live_demo_url
        : 'https://demos.supersites.io/' + themeData[0].id
    }
  },
  data() {
    return {
      themeData: [],
      live_demo_url: null,
      device: 'desktop',
      navVisible: true,
    }
  },
  methods: {
    setDevice(device) {
      this.device = device
    },
  },
  computed: {
    iframeWidth() {
      // Breakpoints
      let widths = [
        { device: 'desktop', width: '100%' },
        { device: 'tablet', width: '768px' },
        { device: 'mobile', width: '375px' },
      ]
      return widths.filter((w) => w.device == this.device)[0]
    },
  },
}
</script>