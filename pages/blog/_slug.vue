<template>
  <div>
    <Header theme="light" />
    <div class="blog-details-page atf">
      <section class="">
        <div>
          <section class="blog-post-top" v-in-viewport>
            <div class="container">
              <div class="blog-cats">
                <nuxt-link
                  v-for="(cat, index) in blogData.categories"
                  :key="index"
                  :to="
                    '/blog/category/' +
                    cat.categories_id.name.toLowerCase().replace(/ /g, '-') +
                    '/'
                  "
                  class="btn-filter-options btn btn-sm mr-2 mb-2"
                >
                  <svg
                    id="done_black_24dp"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Path_671"
                      data-name="Path 671"
                      d="M0,0H24V24H0Z"
                      fill="none"
                    />
                    <path
                      id="Path_672"
                      data-name="Path 672"
                      d="M9,16.2,4.8,12,3.4,13.4,9,19,21,7,19.6,5.6Z"
                      fill="#4252fd"
                    />
                  </svg>
                  <span>{{ cat.categories_id.name }}</span>
                </nuxt-link>
              </div>
              <h1 class="h2">{{ blogData.title }}</h1>
              <div class="post-meta d-flex justify-content-between">
                <Author
                  :postDate="blogData.publish_on"
                  :authorImage="
                    getAssetsUrl() +
                    blogData.publish_by.avatar +
                    '/?fit=cover&width=70&height=70&quality=80'
                  "
                  :authorName="
                    blogData.publish_by.first_name +
                    ' ' +
                    blogData.publish_by.last_name
                  "
                  :content="blogData.description"
                />
                <LastUpdated
                  v-if="blogData.updated_on"
                  :date="blogData.updated_on"
                />
              </div>
              <div class="post-thumbnail">
                <img
                  :src="getAssetsUrl() + blogData.image"
                  :alt="blogData.title"
                  :title="blogData.title"
                  class="blog-list-item-thumbnail"
                />
              </div>
            </div>
          </section>
        </div>
      </section>
      <section class="blog-content" v-in-viewport>
        <div class="container blog-content-container">
          <article
            class="blog-content-wrapper"
            v-html="blogData.description"
          ></article>
          <BlogSidebar :totalClap="totalClap" @clapAdded="updateClap" />
        </div>
      </section>

      <section class="blog-post-tags" v-if="blogData.tags">
        <div class="container">
          <div class="tags-wrapper">
            <nuxt-link
              v-for="(tag, i) in blogData.tags"
              class="tag"
              v-bind:key="i"
              :to="'/blog/tags/' + tag.key + '/'"
              >{{ tag.value }}</nuxt-link
            >
          </div>
        </div>
      </section>

      <section class="blog-post-actions">
        <div class="container">
          <btn-clap :totalClap="totalClap" @clapAdded="updateClap" />
          <btn-share media="facebook" :url="getShareUrl('facebook')" />
          <btn-share media="linkedin" :url="getShareUrl('linkedin')" />
          <btn-share media="twitter" :url="getShareUrl('twitter')" />
        </div>
      </section>
      <section class="blog-post-subscribe" id="subscribe">
        <div class="container">
          <Subscribe />
        </div>
      </section>

      <section class="blog-recent-posts">
        <TitleWithDivider title="Recent Posts" />
        <div class="container recent-posts-container">
          <RecentPosts :posts="recentBlogs" :posts-to-show="3" />
        </div>
      </section>

      <section class="blog-comments">
        <TitleWithDivider :title="totalComments" />
        <div class="container">
          <Comments
            :comments="commentObject"
            :post_id="blogData.id"
            :slug="blogData.slug"
            status="approved"
            @newCommentAdded="updateComments()"
            id="comments"
          />
        </div>
      </section>
      <LoginPopup v-if="showLogin" />
      <SignupPopup v-if="showSignup" />
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      blogData: [],
      recentBlogs: [],
      categories: [],
      totalClap: 0,
      commentObject: [],
      totalComments: '0 Comments',
    }
  },
  created() {
    //console.log("Created");
    //this.allCategory = this.filterCategory;
  },
  async fetch() {
    //console.log("fetch");
    if (this.$config[0].blog.blogs.length > 0) {
      let slug = this.$route.params.slug
      let singleBlog = this.$config[0].blog.blogs.filter(function (e) {
        return e.slug == slug
      })
      //console.log(singleBlog[0].publish_on);
      this.blogData = singleBlog[0]

      var that = this
      let recBlogs = this.$config[0].blog.blogs.filter(function (e) {
        return e.id != that.blogData.id
      })
      //console.log(recBlogs.slice(0,9));
      this.recentBlogs = recBlogs
    }
  },
  async mounted() {
    //console.log('mounted');

    this.getClap()
    this.fetchApiData()
  },
  methods: {
    async updateClap() {
      console.log('clap updated!')
      let clapCount = this.totalClap
      let payload = { clap_count: ++clapCount }
      let claps = await this.updateItem('blogs', this.blogData.id, payload)
      //console.log(claps);
      if (claps) {
        ++this.totalClap
      }
    },
    async getClap() {
      console.log('clap getting! ')
      let claps = await this.getItem('blogs', this.blogData.id, ['clap_count'])
      //console.log(claps);
      this.totalClap = claps.clap_count
    },
    updateComments() {
      /* Fetch comments again when a new comment added */
      console.log('comments updated!')
      this.fetchApiData()
    },
    async fetchApiData() {
      const comments = await this.getPostComments(this.blogData.id)
      this.commentObject = comments[0]
      this.totalComments =
        comments[1] > 1 ? comments[1] + ' Comments' : comments[1] + ' Comment'
    },
  },
  computed: {
    filterCategory() {
      var cat_arr = []
      for (var i = 0; i < this.$config[0].blog.blogs.length; i++) {
        for (
          var j = 0;
          j < this.$config[0].blog.blogs[i].categories.length;
          j++
        ) {
          if (
            cat_arr.indexOf(
              this.$config[0].blog.blogs[i].categories[j].categories_id.name
            ) === -1
          ) {
            cat_arr.push(
              this.$config[0].blog.blogs[i].categories[j].categories_id.name
            )
          }
        }
      }
      //console.log(cat_arr);
      return cat_arr
    },
    showLogin() {
      return this.$store.state.showLogin
    },
    showSignup() {
      return this.$store.state.showSignup
    },
  },
  head() {
    if (this.blogData.seo) {
      return {
        title: this.blogData.seo.seo_title,
        meta: this.getPageMeta(
          this.blogData,
          this.$config[0].site_url + this.$route.path
        ),
      }
    }
  },
}
</script>

<style lang="scss" scoped>
</style>