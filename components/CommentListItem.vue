<template>
  <div class="comment-list-item">
    <Author
      :postDate="comment.timeago"
      :authorImage="comment.user_pic"
      :authorName="comment.user_name"
      content=""
      isCommentAuthor="true"
      :isAuthenticated="isAuthenticated"
    />
    <p class="comment-text body3 text-muted">
      {{ comment.comments }}
    </p>
    <CommentMeta
      @reply="replyingToCommentHandler()"
      :comment_id="comment.id"
      :likes="comment.likes"
      :show_reply="true"
    />
    <CommentReplyForm
      v-if="replyingToComment"
      @cancel="cancelReplyingToCommentHandler()"
      :replying-to="comment.user_name"
      :id="comment.id"
      :slug="slug"
      :post_id="post_id"
      :status="status"
      @newReplyAdded="newReplyAdded()"
    />
    <CommentReplies
      v-if="comment.replies"
      :replies="comment.replies"
      :id="comment.id"
      :slug="slug"
      :status="status"
      :isAuthenticated="isAuthenticated"
      @newReplyAdded="newReplyAdded()"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      replyingToComment: false,
    }
  },

  props: {
    comment: [Array, Object],
    slug: String,
    title: String,
    post_id: Number,
    status: String,
    isAuthenticated: [Boolean, String],
  },
  methods: {
    replyingToCommentHandler() {
      this.replyingToComment = true
    },
    cancelReplyingToCommentHandler() {
      this.replyingToComment = false
    },
    newReplyAdded() {
      this.$emit('newReplyAdded')
    },
  },
}
</script>
