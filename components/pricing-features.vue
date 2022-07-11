<template>
  <div class="row">
    <div class="col-lg-12">
      <table class="table pricing-table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col" v-for="(pricing, j) in pricingItems" :key="j">
              {{ pricing.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(feature, i) in features" :key="i">
            <td>
              <strong class="text-dark">{{ feature.title }}</strong>
              <p class="text-muted mt-1">
                {{ feature.description }}
              </p>
            </td>
            <td>
              <span v-if="feature.starter_type == 'text'">{{
                feature.starter_text
              }}</span>
              <span v-if="feature.starter_type == 'icon'">{{
                feature.starter_icon | capitalize
              }}</span>
            </td>
            <td>
              <span v-if="feature.personal_type == 'text'">{{
                feature.personal_text
              }}</span>
              <span v-if="feature.personal_type == 'icon'">{{
                feature.personal_icon | capitalize
              }}</span>
            </td>
            <td>
              <span v-if="feature.ultimate_type == 'text'">{{
                feature.ultimate_text
              }}</span>
              <span v-if="feature.ultimate_type == 'icon'">{{
                feature.ultimate_icon | capitalize
              }}</span>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <button
                type="button"
                class="btn btn-outline-dark w-100 border-2 mt-4"
              >
                Select
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-outline-dark w-100 border-2 mt-4"
              >
                Select
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-outline-dark w-100 border-2 mt-4"
              >
                Select
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    pricingItems: [Array, Object],
    features: [Array, Object],
  },
}
</script>
<style lang="scss" scoped>
table.pricing-table {
  border-collapse: collapse;
  & td {
    border-top: none !important;
    border-left: solid 1px #d9dbe1;
    text-align: center;
    vertical-align: middle;
    &:first-child {
      border: none !important;
      width: 350px;
      text-align: left;
    }
  }
  & tfoot td {
    border: none !important;
  }
  & tr {
    border: none !important;
  }
  & th {
    text-align: center;
    border-width: 1px !important;
  }
}
</style>