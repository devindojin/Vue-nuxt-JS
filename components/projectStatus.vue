<template>
  <div class="questionnaire-tabs project-status">
    <div class="questionnaire-tabs-wrapper">
      <IconWithText
        v-for="(stage, index) in orderedStages"
        :title="stage.title"
        :number="stage.order_number"
        :class="stageStatus(stage.title)"
        :lines="true"
        :key="index"
        :showSteps="true"
        :icon="stage.icon"
        :green="true"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  props: {
    project: [Object, Array],
  },
  computed: {
    orderedStages: function () {
      return _.orderBy(this.$config[0].global.stages, 'order_number')
    },
  },
  methods: {
    stageStatus(title) {
      return this.project[_.snakeCase(title)]
    },
  },
}
</script>

<style lang="scss" scoped>
</style>