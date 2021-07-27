<template>
  <div>
    <div class="main-content table-list">
      <div class="wrapper">
        <vue-good-table
          :columns="columns"
          :search-options="{
            enabled: true,
            placeholder: 'Search',
            selectionInfoClass: ' flex-column flex-sm-row',
          }"
          :pagination-options="{
            enabled: true,
            mode: 'records',
            perPage: 50,
            perPageDropdown: [50, 100, 500]
          }"
          styleClass="tableOne vgt-table"
          :selectOptions="{
            enabled: false,
            selectionInfoClass: 'table-alert__box',
          }"
          :rows="patients"
        >
          <div slot="table-actions" class="mb-3">
            <b-button
              variant="primary"
              @click="
                () => {
                  $bvModal.show('add-patient');
                }
              "
              class="btn-rounded d-sm-block d-none"
            >
              Create
            </b-button>
          </div>

          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'action'">
              <a
                v-b-tooltip.hover
                class="o-hidden d-inline-block c-pointer"
                title="Edit"
              >
                <i
                  class="i-Eraser-2 text-25 text-info mr-2"
                  @click="
                    () => {
                      onPatientEdit(props.row);
                    }
                  "
                ></i>
              </a>
              <!-- <a
                v-b-tooltip.hover
                class="o-hidden d-inline-block c-pointer"
                title="Delete"
              >
                <i
                  class="i-Close-Window text-25 text-danger"
                  @click="
                    confirmationPopup().then((result) => {
                      if (result.value) onPatientDelete(props.row);
                    })
                  "
                ></i>
              </a> -->
            </span>
            <span v-else-if="props.column.field == 'subscriber'">
              <a class="o-hidden d-inline-block">
                <b-button
                  size="sm"
                  class="btn-radius"
                  variant="primary"
                  @click="
                    () => {
                      setPatientData(props.row);
                      $bvModal.show('subscriber-info-view');
                    }
                  "
                >
                  View
                </b-button>
              </a>
            </span>
            <span v-else-if="props.column.field == 'location'">
              <a class="o-hidden d-inline-block">
                <b-button
                  size="sm"
                  class="btn-radius"
                  variant="primary"
                  @click="
                    () => {
                      setPatientData(props.row);
                      $bvModal.show('home-office-view');
                    }
                  "
                >
                  View
                </b-button>
              </a>
            </span>
            <span v-else-if="props.column.field == 'customer_card'">
              <a class="o-hidden d-inline-block" v-if="props.row.cards && props.row.cards.length < 1">
                <b-button
                  size="sm"
                  class="btn-radius mr-2"
                  variant="primary"
                  @click="
                    () => {
                      setPatientData(props.row);
                      $bvModal.show('patient-card-add');
                    }
                  "
                >
                  Add
                </b-button>
              </a>
              <a
                class="o-hidden d-inline-block"
                v-if="props.row.cards && props.row.cards.length"
              >
                <b-button
                  size="sm"
                  class="btn-radius"
                  variant="primary"
                  @click="
                    () => {
                      setPatientData(props.row);
                      $bvModal.show('patient-card-view');
                    }
                  "
                >
                  View
                </b-button>
              </a>
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
// const STORAGE_KEY = 'invoice';
export default {
  props: {
    patients: Array,
    onPatientEdit: Function,
    onPatientDelete: Function,
  },
  data() {
    return {
      columns: [
        {
          label: "Name",
          field: "full_name",
        },
        {
          label: "Date of Birth",
          field: "date_of_birth",
        },
        {
          label: "Phone",
          field: "phone_number",
        },
        {
          label: "Email",
          field: "email",
        },
        {
          label: "Home Office",
          field: "location",
        },
        {
          label: "Group #",
          field: "group_id",
        },
        {
          label: "Subscriber Info",
          field: "subscriber",
        },
        {
          label: "Customer Card",
          field: "customer_card",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
    };
  },
  mounted() {
    console.log(`this.patients ===>`, this.patients);
  },
  computed: mapGetters(["getPatients"]),
  methods: {
    ...mapActions([
      "savePatient",
      "updatePatient",
      "removePatient",
      "setPatientData",
      "setDefaultPatientForm",
      "setPatientForm",
    ]),
    confirmationPopup() {
      return this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
    },
  },
};
</script>