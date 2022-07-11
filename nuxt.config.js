import axios from 'axios'
const admin_url = 'https://xxx.xxx.io/'
const admin_email = 'xxxxx@xxxx.xxx'
const admin_password = 'xxxxxx'
import { Directus } from '@directus/sdk'
const directus = new Directus(admin_url)
const getDirectusToken = async () => {
  const token = directus.auth.token
  //console.log(directus.auth)
  try {
    if (token === null) {
      console.log('token is null')
      let res = await directus.auth.login({
        email: admin_email,
        password: admin_password,
      })
      console.log(res)
    } else if (directus.auth.expiring === true) {
      console.log('token is expired.')
      await this.refreshToken()
    }
    return directus.auth.token
  } catch (e) {
    console.log(e)
  }
}
const refreshToken = async () => {
  try {
    return await directus.auth.refresh()
  } catch (e) {
    console.log(e)
    //if auth refresh fails then login again
    let res = await directus.auth.login({
      email: admin_email,
      password: admin_password,
    })
    console.log(res)
  }
}
const getPlans = async () => {
  console.log('Loading getPlans')
  let token = await getDirectusToken()
  return await axios
    .get(
      'https://xxx.xxx.io/items/pricing?sort=sort&filter[status][_eq]=published&access_token=' +
      token
    )
    .then((res) => {
      return res.data.data
    })
}
const getPlanFeatures = async () => {
  console.log('Loading getPlanFeatures')
  let token = await getDirectusToken()
  return await axios
    .get(
      'https://xxx.xxx.io/items/plan_features?access_token=' +
      token
    )
    .then((res) => {
      return res.data.data
    })
}
const getQuestionnaire = async () => {
  console.log('Loading getQuestionnaire')
  let token = await getDirectusToken()
  return await axios
    .get(
      'https://xxx.xxx.io/items/questionnaire?limit=1&access_token=' +
      token
    )
    .then((res) => {
      return res.data.data
    })
}
const getPricingPage = async () => {
  console.log('Loading getPricingPage')
  let token = await getDirectusToken()
  return await axios
    .get(
      'https://xxx.xxx.io/items/pricing_page?fields=*.*&access_token=' +
      token
    )
    .then((res) => {
      return res.data.data
    })
}
const getServicesPage = async () => {
  console.log('Loading getServicesPage')
  let token = await getDirectusToken()
  const servicePage = await axios
    .get(
      'https://xxx.xxx.io/items/services_page/?fields=*.*&access_token=' + token
    )
    .then((res) => {
      return res.data.data
    })
  const products = await axios
    .get(
      'https://xxx.xxx.io/items/products/?filter[status][_eq]=published&access_token=' +
      token
    )
    .then((res) => {
      return res.data.data
    })
  return {
    servicePage,
    products,
  }
}
const getBlogs = async () => {
  console.log('Loading getBlogs')
  let token = await getDirectusToken()
  const blogPage = await axios
    .get('https://xxx.xxx.io/items/blog_page/?fields=*.*&access_token=' + token)
    .then((res) => {
      return res.data.data
    })
  const blogs = await axios
    .get(
      'https://xxx.xxx.io/items/blogs/?fields=*,seo.*,categories.categories_id.name,publish_by.avatar,publish_by.first_name,publish_by.last_name&sort=-publish_on&filter[status][_eq]=published&access_token=' +
      token
    )
    .then((res) => {
      return res.data.data
    })
  return {
    blogPage,
    blogs,
  }
}
const getHowItWorksPage = async () => {
  console.log('Loading getHowItWorksPage')
  let token = await getDirectusToken()
  return await axios
    .get(
      'https://xxx.xxx.io/items/how_it_works_page/?fields=*.*&access_token=' +
      token
    )
    .then((res) => {
      return res.data.data
    })
}
const getPages = async () => {
  console.log('Loading Pages')
  let token = await getDirectusToken()
  return await axios
    .get('https://xxx.xxx.io/items/pages/?access_token=' + token)
    .then((res) => {
      return res.data.data
    })
}
const getGlobalSettings = async () => {
  console.log('Loading GlobalSettings')
  let token = await getDirectusToken()
  return await axios
    .get('https://xxx.xxx.io/items/global_settings/?fields=*.*&access_token=' + token)
    .then((res) => {
      return res.data.data
    })
}
const getGlobalData = async () => {
  console.log('Loading getGlobalData')
  let token = await getDirectusToken()
  console.log(token)
  const homePage = await axios
    .get('https://xxx.xxx.io/items/home_page/?fields=*.*&access_token=' + token)
    .then((res) => {
      return res.data.data
    })
  const logos = await axios
    .get(
      'https://xxx.xxx.io/items/logos/?fields=name,image,url,new_tab&sort=sort&access_token=' +
      token
    )
    .then((res) => {
      return res.data.data
    })
  const process = await axios
    .get(
      'https://xxx.xxx.io/items/process?fields=title,icon,description&sort=sort&filter[status][_eq]=published&access_token=' +
      token
    )
    .then((res) => {
      return res.data.data
    })
  const features = await axios
    .get(
      'https://xxx.xxx.io/items/features?fields=title,icon,description,image&sort=sort&filter[status][_eq]=published&access_token=' +
      token
    )
    .then((res) => {
      return res.data.data
    })
  const usp = await axios
    .get(
      'https://xxx.xxx.io/items/usp?fields=title,icon,description&sort=sort&filter[status][_eq]=published&access_token=' +
      token
    )
    .then((res) => {
      return res.data.data
    })

  const testimonials = await axios
    .get(
      'https://xxx.xxx.io/items/testimonials?sort=sort&filter[status][_eq]=published&access_token=' +
      token
    )
    .then((res) => {
      return res.data.data
    })
  const faqs = await axios
    .get(
      'https://xxx.xxx.io/items/faq?sort=sort&filter[status][_eq]=published&access_token=' +
      token
    )
    .then((res) => {
      return res.data.data
    })
  const stages = await axios
    .get(
      'https://xxx.xxx.io/items/project_stages/?access_token=' + token
    )
    .then((res) => {
      return res.data.data
    })
  const notices = await axios
    .get(
      'https://xxx.xxx.io/items/notices/?fields=*,customers.directus_users_id&filter[status][_eq]=published&access_token=' +
      token
    )
    .then((res) => {
      return res.data.data
    })
  const notFoundPage = await axios
    .get(
      'https://xxx.xxx.io/items/not_found_page/?access_token=' + token
    )
    .then((res) => {
      return res.data.data
    })
  const supersitesFeatures = await axios
    .get(
      'https://xxx.xxx.io/items/supersites_features/?access_token=' + token
    )
    .then((res) => {
      return res.data.data
    })

  return {
    homePage,
    logos,
    process,
    features,
    usp,
    testimonials,
    faqs,
    stages,
    notices,
    notFoundPage,
    supersitesFeatures
  }
}
export default async () => {
  return {
    target: 'static',
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
      title: 'Supersites - Affordable Professional websites.',
      titleTemplate: '%s | Supersites Inc.', 
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'robots', content: 'noindex, nofollow' },
        { name: 'msapplication-TileImage', content: 'favicon.png' },
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'crossorigin',
        },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;700&display=swap',
        },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css?family=Nunito+Sans:wght@400,600,700,800&display=swap',
        },
        { type: 'image/png', sizes: '16x16', href: 'favicon.png' },
        { type: 'image/png', sizes: '32x32', href: 'favicon.png' },
        { type: 'image/png', sizes: '96x96', href: 'favicon.png' },
        {
          rel: 'apple-touch-icon-precomposed',
          type: 'image/png',
          sizes: '76x76',
          href: 'favicon.png',
        },
        {
          rel: 'apple-touch-icon-precomposed',
          type: 'image/png',
          sizes: '76x76',
          href: 'favicon.png',
        },
        {
          rel: 'apple-touch-icon-precomposed',
          type: 'image/png',
          sizes: '120x120',
          href: 'favicon.png',
        },
        {
          rel: 'apple-touch-icon-precomposed',
          type: 'image/png',
          sizes: '152x152',
          href: 'favicon.png',
        },
        {
          rel: 'apple-touch-icon',
          href: 'favicon.png',
        },
        {
          rel: 'shortcut icon',
          href: 'favicon.ico',
        },
      ],
      script: [
        { src: 'js/jquery.min.js', body: true, mode: 'client' },
        { src: 'js/bootstrap.bundle.min.js', body: true, mode: 'client' },
        { src: 'js/jquery.easing.min.js', body: true, mode: 'client' },
        // { src: 'js/jquery.mb.YTPlayer.js', body: true, mode: 'client' },
        // { src: 'js/jquery.magnific-popup.min.js', body: true, mode: 'client' },
        // { src: 'js/contact.init.js', body: true, mode: 'client' },
        // { src: 'js/counter.init.js', body: true, mode: 'client' },
        { src: 'js/owl.carousel.min.js', body: true, mode: 'client' },
        // { src: 'js/app.js', body: true, mode: 'client' },
        // { src: 'js/typed.js', body: true, mode: 'client' },
        // { src: 'js/particles.js', body: true, mode: 'client' },
        // { src: 'js/particles.app.js', body: true, mode: 'client' },
        // { src: 'js/jquery.mb.YTPlayer.js', body: true, mode: 'client' },
        // { src: 'https://js.stripe.com/v3/', body: true, mode: 'client' },
        {
          src:
            'https://unicons.iconscout.com/release/v2.0.1/script/monochrome/bundle.js',
          body: true,
          mode: 'client',
        },
      ],
    },
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
      '@assets/css/bootstrap.min.css',
      '@assets/css/materialdesignicons.min.css',
      '@assets/css/pe-icon-7-stroke.css',
      '@assets/css/owl.carousel.min.css',
      '@assets/css/owl.theme.default.min.css',
      '@assets/scss/style.scss',
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
      // https://go.nuxtjs.dev/axios
      '@nuxtjs/axios',
      // https://go.nuxtjs.dev/content
      '@nuxt/content',
      '@nuxtjs/gtm',
      '@nuxtjs/robots',
      'vue-scrollto/nuxt',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},
    plugins: [{ src: '~/plugins/plugins', ssr: false },{ src: '~/plugins/meta.js' },],
    // Content module configuration: https://go.nuxtjs.dev/config-content
    content: {},
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
      // transpile: [/^@storefront-ui/],
    },
    router: {
      base: '/',
      trailingSlash: true,
      extendRoutes(routes, resolve) {
        routes.push({
          name: 'custom',
          path: '*',
          component: resolve(__dirname, 'pages/404.vue'),
        })
      },
    },
    robots: {
      UserAgent: '*',
      Disallow: process.env.APP_ENVIRONMENT != 'PRODUCTION' ? '/' : '',
    },
    publicRuntimeConfig: [
      {
        token: await getDirectusToken(),
        global: await getGlobalData(),
        plans: await getPlans(),
        plan_features: await getPlanFeatures(),
        pricing_page: await getPricingPage(),
        //questionnaire: await getQuestionnaire(),
        //service: await getServicesPage(),
        how_works: await getHowItWorksPage(),
        pages: await getPages(),
        blog: await getBlogs(),
        global_settings: await getGlobalSettings(),
        site_url: process.env.SITE_URL || 'https://xxxx.io',
      },
    ],
    generate: {
      // create an array of all routes for generating static pages for `Themes` and `Theme Demos`
      routes: async function () {
        let token = await getDirectusToken()
        return axios
          .get(
            'https://xxx.xxx.io/items/themes?filter[status][_eq]=published&fields=id&limit=-1&access_token=' +
            token
          )
          .then((res) => {
            let themes = res.data.data.map((theme) => {
              console.log('Generating static path /themes/' + theme.id)
              return {
                route: '/themes/' + theme.id,
              }
            })
            let demos = res.data.data.map((theme) => {
              console.log('Generating static path /themes/demos/' + theme.id)
              return {
                route: '/themes/demos/' + theme.id,
              }
            })
            return [themes, ...demos]
          })
      },
    },
    render: {
      // Setting up cache for 'static' directory - a year in milliseconds
      static: {
        maxAge: 60 * 60 * 24 * 365 * 1000,
      },
    },
  }
}
