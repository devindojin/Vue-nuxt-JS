<template>
  <div class="recent-post-item-container">
    <RecentPostItem v-for="(post, index) in posts.slice(0,postsToShow)" :key="index" :post="post" />
  </div>
</template>

<script>
export default {
  props: {
    posts: [Array, Object],
    postsToShow: Number,
  },
}
</script>
