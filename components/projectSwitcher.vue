<template>
  <div class="project-switcher pt-2 pt-md-0">
    <a
      @click.prevent="showProjectsDropdown = !showProjectsDropdown"
      href="#"
      class="btn-filters btn btn-sm mt-4 mt-md-5"
      ><span>{{ currentProject.id }} - {{ currentProject.project_name }}</span>
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

    <div class="filters-popup business-popup" v-if="showProjectsDropdown">
      <div class="business-list">
        <a
          href="#"
          class="business-dropdown-item"
          v-for="project in projects"
          @click.prevent="
            $emit('update', project), (showProjectsDropdown = false)
          "
        >
          <span>{{ project.id }} - {{ project.project_name }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    projects: [Array, Object],
    currentProject: [Array, Object],
  },
  mounted() {
    //console.log(this.$props.projects)
  },
  data() {
    return {
      showProjectsDropdown: false,
    }
  },
}
</script>

<style lang="scss" scoped>
</style>