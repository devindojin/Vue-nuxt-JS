<template>
  <div>
    <Header theme="light" />
    <admin-page>
      <admin-page-top>
        <h1 class="h2">Your themes</h1>
      </admin-page-top>
      <admin-page-content>
        <div class="dashboard-table">
          <div class="table-row row m-0 th align-items-center">
            <div class="col-2 p-0">
              <div><span>Date</span></div>
            </div>
            <div class="col-2 p-0">
              <div><span>Project ID</span></div>
            </div>
            <div class="col-4 p-0">
              <div><span>Project Name</span></div>
            </div>

            <div class="col-2 p-0">
              <div><span>Theme ID</span></div>
            </div>
            <div class="col-2 p-0">
              <div><span>Change</span></div>
            </div>
          </div>
          <div
            class="table-row row m-0 align-items-center"
            v-for="theme in themes"
            v-if="themes.length > 0"
          >
            <div class="p-0 col-2">
              <div>
                <span>{{
                  new Date(theme.date_created) | dateFormat('MM.DD.YYYY')
                }}</span>
              </div>
            </div>
            <div class="p-0 col-2">
              <div>
                <span>{{ theme.id }}</span>
              </div>
            </div>
            <div class="p-0 col-4">
              <div>
                <span>{{ theme.project_name }}</span>
              </div>
            </div>
            <div class="p-0 col-2">
              <div>
                <nuxt-link :to="'/themes/' + theme.selected_theme + '/'">{{
                  theme.selected_theme
                }}</nuxt-link>
              </div>
            </div>
            <div class="p-0 col-2">
              <div>
                <a
                  href="#"
                  v-if="theme.request_status != 'pending'"
                  @click.prevent="changeTheme(theme.selected_theme, theme.id)"
                  class="ss-btn ss-btn-gray"
                >
                  Change theme
                </a>
                <button
                  type="button"
                  class="ss-btn ss-btn-gray"
                  v-if="theme.request_status == 'pending'"
                >
                  {{ theme.request_status | capitalize }}
                </button>
              </div>
            </div>
          </div>
          <div
            class="table-row row m-0 align-items-center"
            v-if="themes.length == 0"
          >
            <div class="p-0 col-12 text-center">
              <div>{{ notFoundMessage }}</div>
            </div>
          </div>
        </div>
      </admin-page-content>
    </admin-page>

    <Footer />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      notFoundMessage: 'Loading...',
      themes: [],
    }
  },
  async fetch() {
    //console.log('fetch');
    let token = await this.getToken()
    const themesRes = await fetch(
      'https://admin.supersites.io/items/projects/?fields=id,order_id,user,date_created,selected_theme,project_name,design_customization&filter[user][_eq]=' +
        this.$store.state.currentUser.id +
        '&access_token=' +
        token
    )
    const th = await themesRes.json()
    //this.themes = th.data;
    //console.log(this.themes);
    if (th.data.length > '0') {
      for (let i = 0; i < th.data.length; i++) {
        let reqThemeRes = await fetch(
          'https://admin.supersites.io/items/theme_requests/?fields=id,new_theme,current_theme,status&filter[status][_eq]=pending&filter[project][_eq]=' +
            th.data[i].id +
            '&access_token=' +
            token
        )
        let br = await reqThemeRes.json()
        if (br.data.length > 0) {
          status = br.data[0].status
        } else {
          status = 'null'
        }
        this.themes.push({
          id: th.data[i].id,
          order_id: th.data[i].order_id,
          date_created: th.data[i].date_created,
          selected_theme: th.data[i].selected_theme,
          project_name: th.data[i].project_name,
          design_customization: th.data[i].design_customization,
          request_status: status,
        })
      }
    } else {
      this.notFoundMessage = 'No theme found.'
    }
  },
  methods: {
    changeTheme(current_theme_id, project_id) {
      console.log('changeTheme')
      var that = this
      let wrapper = document.createElement('input')
      wrapper.setAttribute('id', 'theme-input')
      wrapper.setAttribute('type', 'number')
      wrapper.setAttribute('class', 'swal-content__input')
      wrapper.setAttribute('placeholder', 'Please enter theme ID')
      wrapper.setAttribute('min', '100')
      swal({
        title: 'Are you sure?',
        //text: "okkkk",
        content: wrapper,
        buttons: {
          cancel: {
            text: 'Cancel',
            value: null,
            visible: true,
            className: '',
            closeModal: true,
          },
          confirm: {
            text: 'Submit',
            value: true,
            visible: true,
            className: '',
            closeModal: false,
          },
        },
      }).then((value) => {
        if (value) {
          let new_theme_id = document.getElementById('theme-input').value
          console.log(new_theme_id)
          if (new_theme_id != current_theme_id) {
            that.findTheme(new_theme_id, current_theme_id, project_id)
          } else {
            swal("Please don't enter current theme ID.", {
              buttons: false,
              timer: 3000,
            })
          }
        }
      })
      document.getElementsByClassName('swal-title')[0].innerHTML =
        'How to find theme ID?'
    },
    async findTheme(new_theme_id, current_theme_id, project_id) {
      let token = await this.getToken()
      const themeRes = await fetch(
        'https://admin.supersites.io/items/themes/?fields=id,status&filter[id][_eq]=' +
          new_theme_id +
          '&filter[status][_eq]=published&access_token=' +
          token
      )
      const theme = await themeRes.json()
      //console.log(theme.data);
      if (theme.data.length > 0) {
        this.sendRequests(theme.data[0].id, current_theme_id, project_id)
      } else {
        swal.stopLoading()
        swal.close()
        swal("Theme ID doesn't exist.Please enter correct one.", {
          buttons: false,
          timer: 3000,
        })
      }
    },
    async sendRequests(new_theme_id, current_theme_id, project_id) {
      //console.log(new_theme_id)
      let payload = {
        user_name: this.$store.state.currentUser.first_name,
        user_email: this.$store.state.currentUser.email,
        project: project_id,
        new_theme: new_theme_id,
        current_theme: current_theme_id,
        status: 'pending',
      }
      let response = await this.postItem('theme_requests', payload)
      //console.log(response)
      if (response) {
        swal.stopLoading()
        swal.close()
        this.themes = []
        this.$fetch()
        this.showNotification(
          'Theme request is sent to admin for approval',
          'success'
        )
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>