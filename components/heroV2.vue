<template>
  <section class="home-hero-v2">
    <div class="container text-center">
      <h1 class="h1">No more DIY Websites</h1>
      <div class="mt-3 mt-md-4 text-muted text-center">
        <p>
          Get professionally designed and fully managed,<br />affordable
          websites starting at $99/Month.
        </p>
      </div>
      <a href="#" class="ss-btn ss-btn-primary ss-btn-wide">Browse themes</a>
    </div>
    <div class="hero-cards" :class="{ isReady }">
      <div class="hero-card-item" v-for="(card, index) in visibleCards">
        <div class="wrapper">
          <div class="img original">
            <img :src="card" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="d-none">
      <img :src="card" alt="" v-for="card in heroCards" />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      heroCards: [
        'animation/hero-image-1.jpg',
        'animation/hero-image-2.jpg',
        'animation/hero-image-3.jpg',
        'animation/hero-image-4.jpg',
        'animation/hero-image-5.jpg',
        'animation/hero-image-6.jpg',
        'animation/hero-image-7.jpg',
        'animation/hero-image-8.jpg',
        'animation/hero-image-9.jpg',
        'animation/hero-image-10.jpg',
      ],
      visibleCards: [],
      isReady: false,
      replacingCardIndex: null,
      cardsToDisplay: 6,
      nextImg: null,
    }
  },

  methods: {
    randomize() {
      let hiddenCards = this.heroCards.filter(
        (c) => !this.visibleCards.includes(c)
      )
      let hiddenCardsRandomIndex = Math.floor(
        Math.random() * (this.heroCards.length - this.cardsToDisplay)
      )
      let visibleCardsRandomIndex = Math.floor(
        Math.random() * this.cardsToDisplay
      )
      setTimeout(() => {
        this.replacingCardIndex = visibleCardsRandomIndex
      }, 0)
      setTimeout(() => {
        this.nextImg = hiddenCards[hiddenCardsRandomIndex]
        this.$forceUpdate()
      }, 200)
      setTimeout(() => {
        this.visibleCards[visibleCardsRandomIndex] =
          hiddenCards[hiddenCardsRandomIndex]
        this.nextImg = null
        this.$forceUpdate()
      }, 3500)
      setTimeout(() => {
        this.replacingCardIndex = null
      }, 3500)
    },
  },
  mounted() {
    let shuffled = this.heroCards.sort(function () {
      return 0.5 - Math.random()
    })
    this.visibleCards = shuffled.slice(0, this.cardsToDisplay)
    // setInterval(() => {
    //   this.randomize()
    // }, 7000)
    // let fetch = setInterval(() => {
    //   if (document.readyState == 'complete') {
    //     this.isReady = true
    //     clearInterval(fetch)
    //   }
    // }, 300)
  },
  props: {
    superscript: String,
    title: String,
    description: String,
    image: String,
    cta_title: String,
    cta_url: String,
  },
}
</script>
