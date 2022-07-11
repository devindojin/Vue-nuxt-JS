<template>
  <div class="comment-list-item">
    <Author
      :postDate="reply.timeago"
      :authorImage="reply.user_pic"
      :authorName="reply.user_name"
      content=""
      isCommentAuthor="true"
      :isAuthenticated="isAuthenticated"
    />
    <p class="comment-text body3 text-muted">
      {{ reply.comments }}
    </p>
    <CommentMeta
      @reply="replyingToCommentHandler()"
      :comment_id="reply.id"
      :likes="reply.likes"
      :show_reply="false"
    />
    <CommentReplyForm
      v-if="replyingToComment"
      @cancel="cancelReplyingToCommentHandler()"
      :replying-to="reply.user_name"
      :id="id"
      :slug="slug"
      :title="title"
      :status="status"
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
    reply: [Array, Object],
    id: [String, Number],
    slug: String,
    title: String,
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
