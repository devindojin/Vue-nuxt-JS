<template>
  <div class="recent-post-item">
    <div>
      <nuxt-link :to="'/blog/'+post.slug+'/'">
		  <img
			  class="recent-post-img"
			  :src="getAssetsUrl() + post.image"
			  :alt="post.title"
		  />
	  </nuxt-link>
      <h5 class="recent-post-title">
        <nuxt-link :to="'/blog/'+post.slug+'/'"
          >{{post.title}}</nuxt-link>
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post : [ Object, Array ],
  },
  data() {
    return {
    }
  },
}
</script>
