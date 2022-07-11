<template>
  <div class="blog-comments-container">
    <CommentForm
      :post_id="post_id"
      :status="status"
      @newCommentAdded="newCommentAdded"
    />
    <CommentListItem
      v-for="(comment, index) in orderedComments"
      :key="index"
      :comment="comment"
      :post_id="post_id"
      :status="status"
      :isAuthenticated="isAuthorized"
      @newReplyAdded="newCommentAdded()"
    />
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  beforeCreate() {
    //this.$store.dispatch('retrieveUser')
  },
  props: {
    comments: [Array, Object],
    firebase: [Array, Object],
    post_id: Number,
    slug: String,
    status: String,
  },
  computed: {
    isAuthorized() {
      return this.$store.state.isAuthenticatedFB
    },
    orderedComments() {
      return _.orderBy(this.$props.comments, ['id'], ['desc'])
    },
  },
  methods: {
    newCommentAdded() {
      this.$emit('newCommentAdded')
    },
  },
  mounted() {
    console.log('comments mounted')
  },
}
</script>
