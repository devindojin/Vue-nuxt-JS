<template>
  <section
    class=""
    id="designs"
    @click="closeFiltersPopup(), closeBusinessPopup()"
  >
    <div class="container">
      <div class="mb-2 pt-4">
        <div class="gallery-filters-top" @click.stop="">
          <div>
            <a
              @click.prevent="openBusinessPopup()"
              href="#"
              class="btn-filters btn btn-sm mb-2"
            >
              <span
                ><small v-if="selectedBusiness.length">{{
                  selectedBusiness.length
                }}</small
                >Business Type</span
              >
              <svg
                id="expand_more_black_24dp"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  id="Path_1313"
                  data-name="Path 1313"
                  d="M24,24H0V0H24Z"
                  fill="none"
                  opacity="0.87"
                />
                <path
                  id="Path_1314"
                  data-name="Path 1314"
                  d="M16.59,8.59,12,13.17,7.41,8.59,6,10l6,6,6-6Z"
                  fill="#686E9A"
                />
              </svg>
            </a>
            <span class="px-2 px-md-3">or</span>
            <a
              @click.prevent="openFiltersPopup()"
              href="#"
              class="btn-filters btn btn-sm mb-2"
            >
              <svg
                v-if="!selectedCategories.length"
                id="label_black_24dp"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  id="Path_1315"
                  data-name="Path 1315"
                  d="M0,0H24V24H0Z"
                  fill="none"
                />
                <path
                  id="Path_1316"
                  data-name="Path 1316"
                  d="M17.63,5.84A1.994,1.994,0,0,0,16,5L5,5.01A2,2,0,0,0,3,7V17a2,2,0,0,0,2,1.99L16,19a1.994,1.994,0,0,0,1.63-.84L22,12,17.63,5.84ZM16,17H5V7H16l3.55,5Z"
                  fill="#686E9A"
                />
              </svg>

              <span v-if="!selectedCategories.length">Select tags</span>
              <span v-if="selectedCategories.length">
                <small>{{ selectedCategories.length }}</small>
                {{
                  selectedCategories.length == 1 ? 'Filter' : 'Filters'
                }}</span
              >
            </a>
          </div>
          <a
            @click.prevent="resetFilters()"
            href="#"
            class="mb-2 d-none d-md-block ss-btn ss-btn-gray ss-btn-small"
          >
            Remove Filters
          </a>
          <div class="filters-popup" v-if="showFiltersPopup">
            <div class="business-search">
              <div class="wrapper">
                <input
                  type="text"
                  name="tag-keyword"
                  id="tag-keyword"
                  v-model="tagKeyword"
                  placeholder="Search..."
                  ref="tagKeyword"
                />
                <svg
                  class="search-icon"
                  id="search_black_24dp"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path
                    id="Path_1327"
                    data-name="Path 1327"
                    d="M0,0H18V18H0Z"
                    fill="none"
                  />
                  <path
                    id="Path_1328"
                    data-name="Path 1328"
                    d="M12.375,11.25h-.592l-.21-.2a4.882,4.882,0,1,0-.525.525l.2.21v.592L15,16.118,16.118,15Zm-4.5,0A3.375,3.375,0,1,1,11.25,7.875,3.37,3.37,0,0,1,7.875,11.25Z"
                    transform="translate(-0.75 -0.75)"
                    fill="#686E9A"
                  />
                </svg>
                <a
                  href="#"
                  @click.prevent="tagKeyword = ''"
                  v-if="tagKeyword.length > 0"
                  class="close"
                  ><svg
                    id="close_black_24dp"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Path_1331"
                      data-name="Path 1331"
                      d="M0,0H24V24H0Z"
                      fill="none"
                    />
                    <path
                      id="Path_1332"
                      data-name="Path 1332"
                      d="M18.3,5.71a1,1,0,0,0-1.41,0L12,10.59,7.11,5.7A1,1,0,0,0,5.7,7.11L10.59,12,5.7,16.89A1,1,0,0,0,7.11,18.3L12,13.41l4.89,4.89a1,1,0,0,0,1.41-1.41L13.41,12,18.3,7.11A1,1,0,0,0,18.3,5.71Z"
                      fill="#686E9A"
                    /></svg
                ></a>
              </div>
            </div>

            <div class="popup-body">
              <div
                v-if="tagKeyword.length > 0 && filteredCategories.length == 0"
                class="tag-not-found"
              >
                <span
                  >No results found matching
                  <strong>"{{ tagKeyword }}"</strong></span
                >
              </div>
              <a
                v-for="(tag, index) in filteredCategories"
                :key="index"
                href="#"
                class="btn-filter-options btn btn-sm mr-2 mb-2"
                :class="[
                  selectedCategories.indexOf(tag) >= 0 ? 'selected' : '',
                ]"
                @click.prevent="selectCategory(tag)"
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
                <span>{{ tag.value }}</span></a
              >
            </div>
          </div>
          <div class="filters-popup business-popup" v-if="showBusinessPopup">
            <div class="business-search">
              <div class="wrapper">
                <input
                  type="text"
                  name="business-keyword"
                  id="business-keyword"
                  v-model="businessKeyword"
                  placeholder="Search..."
                  ref="businessKeyword"
                />
                <svg
                  class="search-icon"
                  id="search_black_24dp"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path
                    id="Path_1327"
                    data-name="Path 1327"
                    d="M0,0H18V18H0Z"
                    fill="none"
                  />
                  <path
                    id="Path_1328"
                    data-name="Path 1328"
                    d="M12.375,11.25h-.592l-.21-.2a4.882,4.882,0,1,0-.525.525l.2.21v.592L15,16.118,16.118,15Zm-4.5,0A3.375,3.375,0,1,1,11.25,7.875,3.37,3.37,0,0,1,7.875,11.25Z"
                    transform="translate(-0.75 -0.75)"
                    fill="#686E9A"
                  />
                </svg>
                <a
                  href="#"
                  @click.prevent="businessKeyword = ''"
                  v-if="businessKeyword.length > 0"
                  class="close"
                  ><svg
                    id="close_black_24dp"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Path_1331"
                      data-name="Path 1331"
                      d="M0,0H24V24H0Z"
                      fill="none"
                    />
                    <path
                      id="Path_1332"
                      data-name="Path 1332"
                      d="M18.3,5.71a1,1,0,0,0-1.41,0L12,10.59,7.11,5.7A1,1,0,0,0,5.7,7.11L10.59,12,5.7,16.89A1,1,0,0,0,7.11,18.3L12,13.41l4.89,4.89a1,1,0,0,0,1.41-1.41L13.41,12,18.3,7.11A1,1,0,0,0,18.3,5.71Z"
                      fill="#686E9A"
                    /></svg
                ></a>
              </div>
            </div>
            <div class="business-list">
              <div
                v-if="
                  businessKeyword.length > 0 &&
                  filteredBusinessTypes.length == 0
                "
                class="business-dropdown-item"
              >
                <span
                  >No results found matching
                  <strong>"{{ businessKeyword }}"</strong></span
                >
              </div>
              <a
                href="#"
                class="business-dropdown-item"
                v-for="business in filteredBusinessTypes"
                :class="[
                  selectedBusiness.indexOf(business.id) >= 0 ? 'selected' : '',
                ]"
                @click.prevent="selectBusiness(business.id)"
              >
                <svg
                  v-if="selectedBusiness.indexOf(business.id) >= 0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <g id="done_black_24dp" transform="translate(-3 -3)">
                    <path
                      id="Path_1323"
                      data-name="Path 1323"
                      d="M3,3H21V21H3Z"
                      fill="none"
                    />
                    <path
                      id="Path_1324"
                      data-name="Path 1324"
                      d="M9.8,15.2,7.2,12.6a.778.778,0,0,0-1.1,1.1l3.1,3.1a.785.785,0,0,0,1.1,0l7.9-7.9a.666.666,0,0,0,0-1c-.3-.2-.8-.3-1,0Z"
                      fill="#4252fd"
                    />
                  </g>
                </svg>
                <span>{{ business.name }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center" v-if="allThemes.length == 0">
        <DotsLoader />
      </div>
      <div
        class="text-center py-4 py-lg-5 mt-lg-4"
        v-if="visibleDesigns.length == 0 && allThemes.length > 0"
      >
        <div class="mt-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="116"
            height="116"
            viewBox="0 0 116 116"
          >
            <path
              id="sad"
              d="M58,116A58,58,0,0,1,16.988,16.988,58,58,0,0,1,99.012,99.012,57.622,57.622,0,0,1,58,116ZM58,9.062A48.938,48.938,0,1,0,106.937,58,48.993,48.993,0,0,0,58,9.062Zm22.628,71.2c-.337-.53-8.422-12.974-22.854-12.974S35.257,79.733,34.92,80.263a4.531,4.531,0,0,0,7.646,4.865c.056-.088,5.7-8.776,15.208-8.776s15.153,8.689,15.208,8.776a4.531,4.531,0,0,0,7.646-4.865ZM38.062,37.383A5.664,5.664,0,1,1,32.4,43.047,5.664,5.664,0,0,1,38.062,37.383Zm33.984,5.664a5.664,5.664,0,1,0,5.664-5.664A5.664,5.664,0,0,0,72.047,43.047Z"
              fill="#d9dbe1"
            />
          </svg>
          <h2 class="body1 font-weight-normal text-muted my-4">
            We're sorry, no matching results found.<br />Please adjust your
            search criteria and try again.
          </h2>
          <a
            @click.prevent="resetFilters()"
            href="#"
            class="mt-md-4 ss-btn ss-btn-primary ss-btn-primary-green"
            >Reset filters</a
          >
        </div>
      </div>
      <div class="row mt-3 px-2 px-md-0" id="gallery">
        <div
          class="col-md-6 px-2 px-md-3 col-xl-4 mb-5 mb-md-4 mt-md-2"
          v-for="(theme, index) in visibleDesigns"
        >
          <GalleryItem :theme="theme" @showFullImage="showFullImage(theme)" />
        </div>

        <Lightbox
          v-if="showLightbox && currentDesign"
          :thumbnails="currentDesign.full_images"
          @closeLightbox="closeLightbox()"
          @goToPrev="goToPrev()"
          @goToNext="goToNext()"
        />
      </div>

      <div class="gallery-load-more text-center mt-4">
        <div
          v-infinite-scroll="loadMore"
          infinite-scroll-distance="100"
          infinite-scroll-disabled="busy"
        >
          <div
            class="text-center"
            v-if="
              currentPage * designsPerPage < allThemes.length &&
              filteredDesigns > visibleDesigns
            "
          >
            <DotsLoader />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import _ from 'lodash'
export default {
  async mounted() {
    let token = await this.getToken()
    //console.log(token);
    //console.log(this.$config[0].themes)
    //this.businessTypes = this.$config[0].businessTypes
    //this.allThemes = this.$config[0].themes
    let businessTypes = await fetch(
      'https://admin.supersites.io/items/business_types?[status][_eq]=published&access_token=' +
        token
    )
    let allThemes = await fetch(
      'https://admin.supersites.io/items/themes?filter[status][_eq]=published&fields=*.*,full_images.directus_files_id.*,business_types.business_types_id.*&limit=-1&access_token=' +
        token
    )

    businessTypes = await businessTypes.json()
    businessTypes = businessTypes.data
    this.businessTypes = businessTypes
    allThemes = await allThemes.json()
    allThemes = allThemes.data
    this.allThemes = allThemes
    if (this.preSelectedTag) {
      this.allCategories.map((c) => {
        if (c.key == this.preSelectedTag) {
          this.selectedCategories.push(c)
          console.log('mounted')
          this.$forceUpdate()
        }
      })
    }
    if (this.preSelectedBusiness) {
      this.businessTypes.map((b) => {
        if (_.kebabCase(b.name) == this.preSelectedBusiness) {
          this.selectedBusiness.push(b.id)
          this.$forceUpdate()
        }
      })
    }
  },
  async fetch() {},
  props: {
    preSelectedTag: String,
    preSelectedBusiness: String,
  },
  data() {
    return {
      busy: false,
      showLightbox: false,
      showFiltersPopup: false,
      showBusinessPopup: false,
      currentDesign: null,
      activeCat: 'all',
      initialDesigns: 12,
      designsPerPage: 9,
      currentPage: 1,
      selectedCategories: [],
      selectedBusiness: [],
      businessTypes: [],
      allThemes: [],
      businessKeyword: '',
      tagKeyword: '',
      searchingTag: false,
    }
  },

  computed: {
    filteredBusinessTypes() {
      return this.businessKeyword.length < 1
        ? this.businessTypes
        : this.businessTypes.filter((b) =>
            b.name.toLowerCase().includes(this.businessKeyword.toLowerCase())
          )
    },

    allCategories() {
      if (this.allThemes.length > 0) {
        let allThemes = []
        this.allThemes.map((t) => {
          if (t.tags) {
            t.tags.map((t) => allThemes.push(t))
          }
        })
        return _.uniqWith(allThemes, _.isEqual)
      }
    },
    filteredCategories() {
      if (this.allCategories) {
        return this.tagKeyword.length < 1
          ? this.allCategories.slice(0, 50)
          : this.allCategories.filter((c) =>
              c.value.toLowerCase().includes(this.tagKeyword.toLowerCase())
            )
      }
    },
    filteredDesigns() {
      let designsByCat = []
      if (!this.selectedCategories.length && !this.selectedBusiness.length)
        return this.allThemes
      this.allThemes.map((theme) => {
        if (theme.tags) {
          theme.tags.map((tag) => {
            this.selectedCategories.map((c) => {
              if (tag.key == c.key) {
                designsByCat.push(theme)
              }
            })
          })
        }
      })
      let designsByBusiness = this.allThemes.filter((design) => {
        if (design.business_types.length > 0) {
          return this.selectedBusiness.find((c) =>
            design.business_types.find((e) => e.business_types_id.id == c)
          )
        }
      })

      return _.union(designsByCat, designsByBusiness)
    },
    visibleDesigns() {
      let designToShow =
        this.initialDesigns + this.designsPerPage * (this.currentPage - 1)
      return this.filteredDesigns.slice(0, designToShow)
    },
  },
  created() {
    this.$store.commit('hideOverflow', false)
  },

  methods: {
    loadMore() {
      if (!this.visibleDesigns.length) return
      this.busy = true
      setTimeout(() => {
        this.currentPage = this.currentPage + 1
        this.busy = false
      }, 500)
    },
    showFullImage(design) {
      this.showLightbox = true
      this.currentDesign = design
      this.$store.commit('hideOverflow', true)
    },
    closeLightbox() {
      this.showLightbox = false
      this.$store.commit('hideOverflow', false)
      setTimeout(() => {
        window.scrollTo(0, this.$store.state.scrollPos)
      }, 10)
    },
    goToNext() {
      this.filteredDesigns.indexOf(this.currentDesign) + 1 ==
      this.filteredDesigns.length
        ? (this.currentDesign = this.filteredDesigns[0])
        : (this.currentDesign =
            this.filteredDesigns[
              this.filteredDesigns.indexOf(this.currentDesign) + 1
            ])
    },
    goToPrev() {
      this.filteredDesigns.indexOf(this.currentDesign) == 0
        ? (this.currentDesign =
            this.filteredDesigns[this.filteredDesigns.length - 1])
        : (this.currentDesign =
            this.filteredDesigns[
              this.filteredDesigns.indexOf(this.currentDesign) - 1
            ])
    },
    selectCategory(category) {
      let selectedCat = category
      if (this.selectedCategories.indexOf(selectedCat) >= 0) {
        this.selectedCategories = this.selectedCategories.filter(
          (c) => c != selectedCat
        )
      } else {
        this.selectedCategories.push(selectedCat)
      }
      this.currentPage = 1
    },
    selectBusiness(business) {
      let selectedBusiness = business
      if (this.selectedBusiness.indexOf(selectedBusiness) >= 0) {
        this.selectedBusiness = this.selectedBusiness.filter(
          (c) => c != selectedBusiness
        )
      } else {
        this.selectedBusiness.push(selectedBusiness)
      }
      this.currentPage = 1
    },
    resetFilters() {
      this.selectedCategories = []
      this.selectedBusiness = []
      this.tagKeyword = ''
      this.businessKeyword = ''
    },
    closeFiltersPopup() {
      this.tagKeyword = ''
      this.showFiltersPopup = false
    },
    closeBusinessPopup() {
      this.businessKeyword = ''
      this.showBusinessPopup = false
    },
    openFiltersPopup() {
      this.showFiltersPopup = !this.showFiltersPopup
      this.closeBusinessPopup()
      if (this.showFiltersPopup) {
        this.$nextTick(function () {
          this.$refs.tagKeyword.focus()
        })
      }
    },
    openBusinessPopup() {
      this.showBusinessPopup = !this.showBusinessPopup
      this.closeFiltersPopup()
      if (this.showBusinessPopup) {
        this.$nextTick(function () {
          this.$refs.businessKeyword.focus()
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>