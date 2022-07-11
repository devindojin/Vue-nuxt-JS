<template>
  <div>
    <Header theme="light" />
    <div class="atf text-center full-height" v-if="!renderComponent">
      <Spinner />
    </div>
    <div v-if="renderComponent">
      <section class="atf" v-if="!editMode">
        <div class="container">
          <ProjectStatus :project="projects" />
          <div class="mt-4">
            <Duedate :date="projects.date_created" v-if="renderComponent" />
          </div>
        </div>
      </section>
      <QuestionnaireContent
        :project="projects"
        @transition="setSection($event)"
        @editMode="editModeHandler($event)"
        v-if="renderComponent"
        :class="!editMode ? 'mt-lg-5 pt-lg-5' : 'atf'"
      />
    </div>

    <Footer />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  middleware: 'auth',
  data() {
    return {
      projects: null,
      //activeSection: 0,
      renderComponent: true,
      editMode: true,
    }
  },
  mounted() {
    //console.log('br mounted')
  },
  created() {
    //console.log('br created')
    this.projects = this.dummyProjects[0]
  },
  async fetch() {
    //console.log('br fetch')
    await this.getProjectDetail(this.$route.params.slug)
  },
  methods: {
    async getProjectDetail(project_id) {
      this.renderComponent = false
      var that = this
      await axios({
        method: 'post',
        timeout: 5000,
        url: 'https://admin.supersites.io/custom/data7-endpoint/projects/',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          user_id: that.$store.state.currentUser.id,
          project_id: project_id,
        },
      })
        .then((res) => {
          //console.log(res.data)
          if (res.data.status == '2') {
            this.projects = res.data.data
            this.renderComponent = true
          } else if (res.data.status == '1') {
            this.showNotification(res.data.data, 'error')
            this.$router.push('/my-account/website-briefs/')
          }
        })
        .catch((err) => console.error(err))
    },
    setSection(event) {
      this.activeSection = event
    },
    editModeHandler(event) {
      this.editMode = event
    },
  },
}
</script>
