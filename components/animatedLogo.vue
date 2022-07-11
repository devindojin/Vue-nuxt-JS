<template>
  <div class="animated-logo" :class="{ bouncing }">
    <span class="dot red"></span><span class="dot yellow"></span
    ><span class="dot green"></span
    ><span id="logo-type-writer">
      <span class="Typewriter__wrapper"> Supersites </span>
    </span>
  </div>
</template>

<script>
// import Typewriter from 'typewriter-effect/dist/core'
export default {
  data() {
    return {
      bouncing: false,
    }
  },
  methods: {
    // bounce() {
    //   this.bouncing = false
    //   setTimeout(() => {
    //     this.bouncing = true
    //   }, 100)
    // },
  },
  mounted() {
    // var tw = document.getElementById('logo-type-writer')
    // var typewriter = new Typewriter(tw, {
    //   loop: true,
    //   delay: 200,
    //   deleteSpeed: 20,
    // })
    // typewriter
    //   .changeDelay(200)
    //   .callFunction(() => {
    //     this.bounce()
    //   })
    //   .pauseFor(1200)
    //   .typeString('supersites')
    //   .pauseFor(800)
    //   .callFunction(() => {
    //     this.bounce()
    //   })
    //   .pauseFor(1200)
    //   .deleteAll(20)
    //   .changeDelay(80)
    //   .typeString('Ditch DIY, GO Pro')
    //   .pauseFor(800)
    //   .callFunction(() => {
    //     this.bounce()
    //   })
    //   .start()
  },
}
</script>

<style lang="scss" scoped>
</style>