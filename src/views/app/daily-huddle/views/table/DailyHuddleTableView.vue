<template>
  <div>
    <div class="card-table table-responsive">
      <b-modal id="social-history" size="xl" hide-header hide-footer>
        <div>
          <b-col>
            <h3>{{ selectedSocialHistory }}</h3>
          </b-col>
        </div>
      </b-modal>
      <table class="table">
        <thead>
          <tr>
            <th :key="column" v-for="column in columns">
              <span>{{ column }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.id">
            <td>
              <span>{{ row.time }} <label>12 Apr</label></span>
            </td>
            <td>
              <span>{{ row.phone }}</span>
            </td>
            <td>
              <span
                ><i
                  class="i-Receipt c-pointer"
                  @click="openSocialHistory(row.insuranceExample)"
                ></i
              ></span>
            </td>
            <td>
              <span>{{ row.lastTreatment }}</span>
            </td>
            <td>
              <span>{{ row.pendingTreatment }}</span>
            </td>
            <td>
              <span>{{ row.insuranceExample }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "DailyHuddleTable",
  props: {
    columns: Array,
    rows: Array,
  },
  data() {
    return { selectedSocialHistory: null };
  },
  methods: {
    openSocialHistory(title) {
      console.log(`call`);
      this.selectedSocialHistory = title;
      this.$bvModal.show("social-history");
    },
  },
};
</script>