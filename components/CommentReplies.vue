<template>
  <div class="comment-replies">
    <CommentReplyItem
      v-for="(reply, index) in replies"
      :reply="reply"
      :key="index"
      :id="id"
      :slug="slug"
      :status="status"
      :isAuthenticated="isAuthenticated"
      @newReplyAdded="newReplyAdded()"
    />
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    replies: [Array, Object],
    id: [String, Number],
    slug: String,
    status: String,
    isAuthenticated: [Boolean, String],
  },

  methods: {
    newReplyAdded() {
      this.$emit('newReplyAdded')
    },
  },
}
</script>
