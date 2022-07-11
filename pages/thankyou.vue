<template>
  <div>
    <Header theme="light" />
    <ThankYouHero />
    <AdditionalServices />
    <Footer />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
}
</script>
