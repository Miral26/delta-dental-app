<template>
  <v-select
    v-model="selected_patient"
    @search="onPatientSearch"
    :filterable="false"
    :options="rows"
    class="custom-search-select w-100"
  >
    <template slot="no-options"> No patient found </template>
    <template slot="option" slot-scope="option">
      <div>
        {{
          `${option.first_name} ${option.last_name} - ${option.date_of_birth} - ${option.phone_number}`
        }}
      </div>
    </template>
    <template slot="selected-option" slot-scope="option">
      <div>
        {{
          `${option.first_name} ${option.last_name} - ${option.date_of_birth} - ${option.phone_number}`
        }}
      </div>
    </template>
  </v-select>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PatientSearchSelect",
  props: ["value"],
  data() {
    return {
      selected_patient: null,
      rows: [],
    };
  },
  mounted() {
    this.listPatients({ limit: 500 }).then((data) => {
      this.rows = data.results;

      if (this.value) {
        let f = data.results.find((r) => r.id === this.value);
        if (f) this.selected_patient = f;
      }
    });
  },
  methods: {
    ...mapActions(["listPatients"]),

    onPatientSearch(search, loading) {
      loading(true);
      this.listPatients({ search })
        .then((data) => {
          this.rows = data.results;
          loading(false);
        })
        .catch((err) => {
          loading(false);
          console.log("failed to search patients:", err);
          this.$bvToast.toast(err.message, {
            title: `Failed to search patients`,
            variant: "danger",
            solid: true,
          });
        });
    },
  },
  watch: {
    selected_patient(val) {
      this.$emit("update", val);
    },
  },
};
</script>

<style>
#appointment___BV_modal_body_ .style-chooser .vs__search::placeholder,
#appointment___BV_modal_body_ .style-chooser .vs__dropdown-toggle {
  min-height: 50px;
  border-radius: 10px;
}
</style>