<template>
  <div class="comment-form" :class="{ isAuthenticated: isAuthenticated }">
    <client-only>
      <div class="auth-user-info">
        <div class="author" v-if="isAuthenticated">
          <div class="author-img">
            <AuthorImage
              v-if="currentUser.photoURL"
              :avatar="currentUser.photoURL"
            />
          </div>
          <a href="#" @click.prevent="logoutFB()" class="log-out-button">
            <span>Log out</span></a
          >
        </div>
      </div>
    </client-only>
    <form>
      <textarea
        class="form-textarea"
        name="comment_text"
        v-model="comment_text"
        id=""
        rows="1"
        placeholder="Post a comment"
        @focus="checkAuthentication()"
      ></textarea>
      <button
        type="button"
        @click.prevent="sendCommentHandler()"
        class="btn btn-primary w-100 mt-3"
      >
        Send message
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    post_id: Number,
    //slug: String,
    status: String,
  },
  data() {
    return {
      comment_text: '',
    }
  },
  methods: {
    async sendCommentHandler() {
      let response = await this.sendComments(
        this.$props.post_id,
        this.comment_text,
        0,
        this.$props.status
      )
      console.log(response)
      if (response) {
        this.comment_text = ''
        // Raise 'newCommentAdded' Event
        this.$emit('newCommentAdded')
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
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticatedFB
    },
    currentUser() {
      return this.$store.state.currentUserFB
    },
  },
}
</script>
