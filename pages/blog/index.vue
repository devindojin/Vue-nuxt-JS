<template>
  <div>
    <Header theme="light" />
    <div class="blog-details-page atf">
      <section>
        <div class="container">
          <h1 class="h2">{{ $config[0].blog.blogPage.heading }}</h1>
          <div class="blog-cats mt-4 pt-2 pt-md-3 mt-lg-5 pt-lg-0">
            <nuxt-link
              v-for="(cat, index) in allCategory"
              :key="index"
              :to="
                '/blog/category/' + cat.toLowerCase().replace(/ /g, '-') + '/'
              "
              class="btn-filter-options btn btn-sm mr-2 mb-2"
              :class="[index == -2 ? 'selected' : '']"
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
              <span>{{ cat }}</span>
            </nuxt-link>
          </div>
          <div class="blog-list mt-4 pt-md-2 mt-lg-4 pt-lg-3">
            <BlogListItem
              v-for="(post, index) of visibleBlogs"
              :post="post"
              :key="index"
            />
          </div>
          <div
            v-infinite-scroll="loadMore"
            infinite-scroll-distance="100"
            infinite-scroll-disabled="busy"
          >
            <div
              class="text-center"
              v-if="currentPage * blogsPerPage < $config[0].blog.blogs.length"
            >
              <DotsLoader />
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      allCategory: [],
      busy: false,
      initialBlogs: 6,
      blogsPerPage: 9,
      currentPage: 1,
    }
  },
  created() {
    console.log('Created')
    this.allCategory = this.filterCategory
  },
  methods: {
    loadMore() {
      if (!this.$config[0].blog.blogs.length) return
      this.busy = true
      setTimeout(() => {
        this.currentPage = this.currentPage + 1
        this.busy = false
      }, 500)
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
    visibleBlogs() {
      let blogToShow =
        this.initialBlogs + this.blogsPerPage * (this.currentPage - 1)
      return this.$config[0].blog.blogs.slice(0, blogToShow)
    },
  },
  head() {
    if (this.$config[0].blog.blogPage) {
      return {
        title: this.$config[0].blog.blogPage.seo.seo_title,
        meta: this.getPageMeta(
          this.$config[0].blog.blogPage,
          this.$config[0].site_url + this.$route.path
        ),  
      }
    }
  },
}
</script>

<style lang="scss" scoped>
</style>