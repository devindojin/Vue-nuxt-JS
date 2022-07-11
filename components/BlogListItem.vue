<template>
  <div class="blog-list-item">
    <nuxt-link :to="'/blog/' + post.slug + '/'">
      <img
        :src="getAssetsUrl() + post.image"
        :alt="post.title"
        :title="post.title"
        class="blog-list-item-thumbnail"
      />
    </nuxt-link>
    <h2 class="h3">
      <nuxt-link :to="'/blog/' + post.slug + '/'">{{ post.title }}</nuxt-link>
    </h2>
    <div class="col-lg-8 p-0 text-muted body3 mt-4" v-html="post.excerpt"></div>
    <div class="post-meta">
      <Author
        :postDate="post.publish_on"
        :authorImage="
          getAssetsUrl() +
          post.publish_by.avatar +
          '/?fit=cover&width=70&height=70&quality=80'
        "
        :authorName="
          post.publish_by.first_name + ' ' + post.publish_by.last_name
        "
        :content="post.description"
      />
    </div>
    <div class="blog-list-item-excerpt"></div>
  </div>
</template>

<script>
export default {
  props: {
    post: [Object, Array],
  },
}
</script>

<style lang="scss" scoped>
</style>