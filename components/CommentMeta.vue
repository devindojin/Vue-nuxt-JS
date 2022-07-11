<template>
  <div class="comment-meta">
    <div class="comment-actions">
      <BtnLike :liked="likesData" @likeAction="likeHandler()" :likes="likesData"   />
      <BtnReply title="Reply" @reply="replying()" v-if="show_reply"  />
    </div>
    <div>
      <!--<BtnReport title="Report" />-->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment_id: [String, Number],
    likes: [String, Number],
    slug: String,
    show_reply: Boolean,
  },
  data() {
    return {
      like_status: 0,
      likesData: this.$props.likes,
    }
  },

  methods: {
	 replying() { 
		this.$emit("reply");
    },
	async likeHandler() {
      this.like_status = 1;
	  let likeCount = this.likesData;
	  let payload = { likes: ++likeCount};
	  let likes = await this.updateItem("blog_comments",this.$props.comment_id,payload);
	  //console.log(likes);
	  if(likes){
		this.likesData = likes.likes;
	  }else{
          //this.errors.push(e)
          this.like_status = 0;
          console.log(e);
		  this.showNotification(e, 'error');
      }
    },
  },
}
</script>
