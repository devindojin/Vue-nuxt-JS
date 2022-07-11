<template>
  <div>
    <Header theme="light" />
    <AdditionalServices :show-title="false" :admin-services="true" />
    <Footer />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
}
</script>