<template>
  <div>
    <Header theme="light" />
    <div class="atf text-center full-height" v-if="loading">
      <Spinner />
    </div>
    <section class="atf full-height" v-if="!loading">
      <div class="container" v-if="allProjects.length > 0">
        <h1 class="h2"><strong>Projects progress</strong></h1>
        <ProjectSwitcher
          @update="selectProject($event)"
          :projects="allProjects"
          :currentProject="currentProject"
        />
        <div class="mt-3 pt-3">
          <ProjectStatus :project="currentProject" key="0" />
          <div class="mt-4">
            <Duedate :date="currentProject.date_created" />
          </div>
        </div>
      </div>
      <div
        class="container"
        v-if="allProjects.length == '0' && allProjects != []"
      >
        <h1 class="h2">
          <strong>No Projects Found</strong>
        </h1>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      loading: true,
      allProjects: [],
      currentProject: [],
    }
  },

  created() {
    // Set first project as default
    this.currentProject = this.dummyProjects[0]
  },
  async fetch() {
    console.log('fetch')
    let token = await this.getToken()
    //console.log(token);
    const projectRes = await fetch(
      'https://admin.supersites.io/items/projects/?sort=-id&filter[user][_eq]=' +
        this.$store.state.currentUser.id +
        '&access_token=' +
        token
    )
    const pr = await projectRes.json()
    this.allProjects = pr.data
    if (this.allProjects.length > 0) {
      this.currentProject = this.allProjects[0]
    }
    this.loading = false
  },
  methods: {
    selectProject(project) {
      // Set selected project
      this.currentProject = project
    },
  },
}
</script>