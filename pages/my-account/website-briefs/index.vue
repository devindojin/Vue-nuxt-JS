<template>
  <div>
    <Header theme="light" />
    <admin-page>
      <admin-page-top> <h1 class="h2">Your briefs</h1></admin-page-top>
      <admin-page-content class-name="your-briefs">
        <div class="dashboard-table">
          <div class="table-row row m-0 th align-items-center">
            <div class="p-0 col-6">
              <div><span>Project name</span></div>
            </div>
            <div class="p-0 col-6">
              <div><span>Status</span></div>
            </div>
          </div>
          <div
            class="table-row align-items-center row m-0"
            v-for="project in allProjects"
            v-if="allProjects.length > 0"
          >
            <div class="p-0 col-6">
              <div>
                <nuxt-link :to="`/my-account/website-briefs/${project.id}/`"
                  ><span
                    >{{ project.id }} - {{ project.project_name }}</span
                  ></nuxt-link
                >
              </div>
            </div>
            <div class="p-0 col-6">
              <div class="pl-0">
                <BriefProgressBar :brief-steps="project.steps" />
              </div>
            </div>
          </div>
          <div
            class="table-row align-items-center row m-0"
            v-if="allProjects.length == '0'"
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
      allProjects: [],
      dummyBriefSteps: [
        { title: 'Personal info', status: 'completed' },
        { title: 'General Understanding', status: 'completed' },
        { title: 'Visual & Design', status: 'pending' },
      ],
    }
  },
  methods: {
    briefSteps() {
      var _data = []
      if (this.$config[0].questionnaire[0].section.length > 0) {
        for (
          let i = 0;
          i < this.$config[0].questionnaire[0].section.length;
          i++
        ) {
          _data.push({
            title: this.$config[0].questionnaire[0].section[i].title,
            status: 'pending',
          })
        }
      }
      return _data
    },
  },
  async fetch() {
    console.log('fetch')
    let token = await this.getToken()
    var status = null
    const projectRes = await fetch(
      'https://admin.supersites.io/items/projects/?sort=-id&fields=id,project_name&filter[user][_eq]=' +
        this.$store.state.currentUser.id +
        '&access_token=' +
        token
    )
    const pr = await projectRes.json()
    if (pr.data.length > 0) {
      for (let i = 0; i < pr.data.length; i++) {
        let briefRes = await fetch(
          'https://admin.supersites.io/items/questionnaire_submissions/?fields=steps&filter[project][_eq]=' +
            pr.data[i].id +
            '&access_token=' +
            token
        )
        let br = await briefRes.json()
        //console.log(br.data);
        if (br.data.length > 0) {
          //console.log(br.data[0].steps);
          status = br.data[0].steps
        } else {
          status = this.briefSteps()
        }
        this.allProjects.push({
          id: pr.data[i].id,
          project_name: pr.data[i].project_name,
          steps: status,
        })
      }
    } else {
      this.notFoundMessage = 'No briefs found.'
    }
  },
}
</script>

