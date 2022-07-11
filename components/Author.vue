<template>
  <div class="author">
    <div class="author-img">
      <AuthorImage :avatar="authorImage" />
    </div>
    <div class="author-info">
      <div class="author-name">
        <h4>{{ authorName }}</h4>
      </div>
      <div class="author-post-meta">
        <div v-if="!isCommentAuthor">
          <AuthorPostDate :date="postDate" />
          <AuthorPostReadTime :time="totalReadTime" />
        </div>
        <a
          href="#"
          v-if="isCommentAuthor && isAuthenticated"
          @click.prevent="logoutFB()"
          class="log-out-button"
        >
          <span>Log out</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    postDate: String,
    authorImage: String,
    authorName: String,
    readTime: String,
    content: String,
    claps: [String, Number],
    isCommentAuthor: {
      type: [String, Boolean],
      default: false,
    },
    isAuthenticated: {
      type: [String, Boolean],
      default: false,
    },
  },
  methods: {
    readingTime(content) {
      if (!content) return
      let minutes = 0
      const contentString = JSON.stringify(content)
      const words = contentString.split(' ').length
      const wordsPerMinute = 200
      minutes = Math.ceil(words / wordsPerMinute)
      return minutes
    },
    logout() {
      this.$store.commit('logOutUser')
      this.$router.push('/')
    },
  },
  data() {
    return {
      totalReadTime: '',
    }
  },
  mounted() {
    if (typeof window !== 'undefined') {
      this.totalReadTime = this.readingTime(this.$props.content) + ' min'
    }
  },
}
</script>
