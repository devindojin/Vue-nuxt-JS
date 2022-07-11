<template>
  <div class="tab" :class="{ lines, tabIcon, green }">
    <div class="tab-wrapper">
      <div class="tab-icon">
        <span class="tab-number" v-if="number && showSteps">{{ number }}</span>
        <div class="tab-icon-wrapper">
          <div class="svg" v-html="icon"></div>
        </div>
      </div>
      <h4 class="h4" v-if="title && !tabIcon">{{ title }}</h4>
      <h4 class="h6 mt-4" v-if="title && tabIcon">{{ title }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    number: [String, Number],
    icon: String,
    title: String,
    showSteps: Boolean,
    tabIcon: Boolean,
    green: Boolean,
    color: String,
    lines: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
