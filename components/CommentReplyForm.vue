<template>
  <div class="comment-reply-form mt-5">
    <span class="in-reply-to">
      In Reply to
      <mark>@{{ replyingTo }}</mark>
    </span>
    <textarea
      class="form-textarea"
      name=""
      id=""
      rows="1"
      placeholder="Post a comment"
      v-model="commentContent"
    ></textarea>
    <div class="comment-reply-form-buttons mt-2">
      <button
        href="#"
        class="ss-btn ss-btn-outline mr-2"
        @click.prevent="cancel"
      >
        Cancel
      </button>
      <button href="#" class="ss-btn ss-btn-primary" @click.prevent="postReply">
        Reply
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentContent: '',
    }
  },
  props: {
    replyingTo: String,
    slug: String,
    post_id: Number,
    id: [String, Number],
    status: String,
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    async postReply() {
      if (this.commentContent != '') {
        let response = await this.sendComments(
          this.$props.post_id,
          this.commentContent,
          this.$props.id,
          this.$props.status
        )
        //console.log(response);
        if (response) {
          this.commentContent = ''
          this.$emit('cancel')
          this.$emit('newReplyAdded')
          if (process.isClient) {
            if (response.data.status == 'pending') {
              this.showNotification(
                'Your comment is under moderation.It will publish when approved. ',
                'info'
              )
            } else {
              this.showNotification('Comment is added successfully', 'success')
            }
          }
        } else {
          if (process.isClient) {
            this.showNotification(response.data.errors[0].message, 'error')
          }
        }
      }
    },
  },
}
</script>
