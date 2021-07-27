<template>
  <div v-if="!getLoading">
    <div class="main-content table-list">
      <div class="mb-3 page-title">
        <h3 class="font-weight-bold m-0">Operatories</h3>
      </div>
      <div class="wrapper">
        <vue-good-table
          :columns="columns"
          :line-numbers="true"
          :search-options="{
            enabled: true,
            placeholder: 'Search operatory',
            selectionInfoClass: ' flex-column flex-sm-row',
          }"
          :pagination-options="{
            enabled: true,
            mode: 'records',
          }"
          styleClass="tableOne vgt-table"
          :selectOptions="{
            enabled: false,
            selectionInfoClass: 'table-alert__box',
          }"
          :rows="opratoryList"
        >
          <div slot="table-actions" class="mb-3">
            <b-button
              variant="primary"
              @click="$bvModal.show('add-operatory')"
              class="btn-rounded d-sm-block d-none"
            >
              Add Operatory
            </b-button>
          </div>
        </vue-good-table>
      </div>

      <b-modal id="add-operatory" size="xl" hide-header hide-footer>
        <div>
          <b-col>
            <b-form>
              <b-form-group class="col-md-12 mb-3" label="Name">
                <b-form-input
                  type="text"
                  required
                  placeholder="Name"
                ></b-form-input>
              </b-form-group>
              <b-form-group class="col-md-12 mb-3" label="Description">
                <b-form-input
                  type="text"
                  required
                  placeholder="Description"
                ></b-form-input>
              </b-form-group>
              <b-form-group class="col-md-12 mb-3">
                <div class="align-items-center">
                  <label class="checkbox checkbox-outline-primary">
                    <input type="checkbox" checked />
                    <span class="checkmark"></span>Status</label
                  >
                </div>
              </b-form-group>
              <div class="col-md-12">
                <b-button
                  size="sm"
                  class="btn-radius"
                  variant="primary"
                  @click="save()"
                >
                  Save
                </b-button>
                <b-button
                  size="sm"
                  class="btn-radius ml-2"
                  variant="outline-primary"
                  @click="cancel()"
                >
                  Cancel
                </b-button>
              </div>
            </b-form>
          </b-col>
        </div>
      </b-modal>
    </div>
  </div>
  <Loader v-else />

</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "../../../components/loader/loader";
// const STORAGE_KEY = 'invoice';
export default {
  data() {
    return {
      input: [
        {
          name: "",
        },
      ],

      columns: [
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Description",
          field: "description",
        },
        {
          label: "Status",
          field: "status",
        },
      ],
      newTodo: "",
    };
  },
  components: { Loader },
  computed: mapGetters(["opratoryList","getLoading"]),
  methods: {
    ...mapActions(["addOperatory", "setLoading"]),
  },
  mounted() {
    this.setLoading(true);
    setTimeout(() => {
      this.setLoading(false);
    }, 2000);
  },
};
</script>