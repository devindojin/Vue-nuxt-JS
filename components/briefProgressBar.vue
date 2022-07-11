<template>
  <div class="brief-progress-bar d-flex align-items-center">
    <div class="d-flex align-items-center">
      <span
        class="stage-item"
        v-for="(step, index) in briefSteps"
        :class="step.status"
        :key="index"
        data-toggle="tooltip"
        data-placement="top"
        :title="step.title"
      >
      </span>
    </div>
    <div class="d-none d-md-flex">
      <span class="pl-3">
        <span v-if="completedSteps != briefSteps.length"
          >{{ completedSteps }}/{{ briefSteps.length }}</span
        >
        Completed</span
      >
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  props: {
    briefSteps: [Object, Array],
  },
  computed: {
    completedSteps() {
      return this.briefSteps.filter((s) => s.status == 'completed').length
    },
  },
  mounted() {
    $('[data-toggle="tooltip"]').tooltip()
  },
}
</script>

<style lang="scss" scoped>
</style>