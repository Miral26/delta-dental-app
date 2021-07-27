<template>
  <div class="main-content" v-if="!loading">
    <b-row>
      <b-col lg="12" xl="12" md="12">
        <div class="d-flex justify-content-between">
          <div class="d-flex align-items-center mb-4">
            <div class="mr-3 page-title">
              <h3 class="font-weight-bold m-0">Claims</h3>
            </div>
          </div>
        </div>

        <div class="delta-dental-tab">
          <b-tabs content-class="mt-1">
            <b-tab
              title="In Progress"
              :active="getSelectedTab === 'inProgress'"
              @click="setTab('inProgress')"
            >
              <div class="mb-20">
                <Table title="In Progress" list="claims" />
              </div>
            </b-tab>
            <b-tab
              title="Pending"
              :active="getSelectedTab === 'pending'"
              @click="setTab('pending')"
            >
              <div class="mb-20">
                <Table title="Pending" list="claims" />
              </div>
            </b-tab>
            <b-tab
              title="Completed"
              :active="getSelectedTab === 'completed'"
              @click="setTab('completed')"
            >
              <div class="mb-20">
                <Table title="Completed" list="claims" />
              </div>
            </b-tab>
          </b-tabs>
        </div>

        <b-modal
          id="add-delta-dental"
          size="lg"
          hide-header
          hide-footer
          no-close-on-backdrop
        >
          <div>
            <b-col>
              <b-form @submit.prevent="submit">
                <div class="row">
                  <div class="col-md-6">
                    <b-form-group class="mb-3" label="Patient*">
                      <patient-search-select
                        @update="onPatientSelect"
                        :value="form.patient"
                      ></patient-search-select>

                      <b-alert
                        show
                        variant="danger"
                        v-if="!$v.form.patient.required && formErrors"
                        class="mt-2"
                        >This is a required field.</b-alert
                      >
                    </b-form-group>
                  </div>
                  <div class="col-md-6">
                    <b-form-group class="mb-3" label="Status*">
                      <b-dropdown
                        class="default-dropdown mb-2 mr-5"
                        :text="
                          form.status === ''
                            ? 'Please select status'
                            : form.status
                        "
                      >
                        <b-dropdown-item value @click="form.status = ''"
                          >Please select status</b-dropdown-item
                        >
                        <b-dropdown-item
                          value="PENDING"
                          @click="form.status = 'PENDING'"
                          >Pending</b-dropdown-item
                        >
                        <b-dropdown-item
                          value="COMPLETED"
                          @click="form.status = 'COMPLETED'"
                          >Completed</b-dropdown-item
                        >
                      </b-dropdown>

                      <b-alert
                        variant="danger"
                        :show="!$v.form.status.required && formErrors"
                        >This is a required field.</b-alert
                      >
                    </b-form-group>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <b-form-group class="mb-3" label="Appointment Date*">
                      <b-form-datepicker
                        :date-format-options="{
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                        }"
                        v-model="$v.form.appointment_date.$model"
                        reset-button
                      ></b-form-datepicker>

                      <b-alert
                        variant="danger"
                        :show="!$v.form.appointment_date.required && formErrors"
                        >This is a required field.</b-alert
                      >
                    </b-form-group>
                  </div>
                  <div class="col-md-6">
                    <!-- <b-form-group
                      class="mb-3"
                      label="Appointment Location"
                      v-if="getSelectedLocation"
                    >
                      <b-form-input
                        type="text"
                        required
                        v-model="getSelectedLocation.name"
                        readonly
                      ></b-form-input>
                    </b-form-group>-->

                    <b-form-group class="mb-3" label="Appointment Location*">
                      <b-dropdown
                        class="default-dropdown mb-2 mr-5"
                        :text="selectedFormLoc"
                      >
                        <b-dropdown-item
                          value
                          @click="form.square_location_id = ''"
                          >Please select</b-dropdown-item
                        >
                        <b-dropdown-item
                          :value="loc.id"
                          @click="form.square_location_id = loc.id"
                          v-for="loc in getLocations"
                          :key="loc.id"
                          >{{ loc.name }}</b-dropdown-item
                        >
                      </b-dropdown>

                      <b-alert
                        variant="danger"
                        :show="
                          !$v.form.square_location_id.required && formErrors
                        "
                        >This is a required field.</b-alert
                      >
                    </b-form-group>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <b-form-group class="mb-3" label="Charge Date">
                      <b-form-datepicker
                        :date-format-options="{
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                        }"
                        :min="new Date()"
                        v-model="form.charge_date"
                        reset-button
                      ></b-form-datepicker>
                    </b-form-group>
                  </div>
                  <div class="col-md-6">
                    <b-form-group class="mb-3" label="Payment Amount">
                      <b-form-input
                        type="text"
                        v-model="form.amount"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <b-form-group class="mb-3" label="Notes">
                      <b-form-textarea
                        rows="7"
                        v-model="form.notes"
                      ></b-form-textarea>
                    </b-form-group>
                  </div>

                  <div class="col-md-6">
                    <b-form-group class="mb-3" label="File Attachments">
                      <div class="d-flex flex-wrap" v-if="getSelectedRecord && getSelectedRecord.attachments_detail">
                        <a
                          v-for="file in getSelectedRecord.attachments_detail"
                          :key="file.id"
                          class="mr-2 mb-2"
                          :href="file.file"
                          target="_blank"
                          title="View in new tab"
                        >
                          <img :src="file.file" :alt="file.id" width="80" />
                        </a>
                      </div>

                      <vue-dropzone
                        ref="myVueDropzone"
                        id="dropzone"
                        :options="dropzoneOptions"
                        @vdropzone-success="fileUploaded"
                      ></vue-dropzone>
                    </b-form-group>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <b-button
                      type="submit"
                      size="sm"
                      class="btn-radius"
                      variant="primary"
                      :disabled="getLoading"
                    >
                      <div class="d-flex">
                        <span :class="getLoading ? 'mr-3' : ''">
                          {{
                            getLoading
                              ? "Saving..."
                              : form.id
                              ? "Update"
                              : "Save"
                          }}
                        </span>
                        <span class="spinner" v-if="getLoading"></span>
                      </div>
                    </b-button>
                    <b-button
                      size="sm"
                      class="btn-radius ml-2"
                      variant="outline-primary"
                      @click="
                        $bvModal.hide('add-delta-dental');
                        resetForm();
                      "
                      >Cancel</b-button
                    >
                  </div>
                </div>
              </b-form>
            </b-col>
          </div>
        </b-modal>

        <b-modal id="notes-view" size="xl" hide-footer>
          <div>
            <b-col>
              <b-form>
                <b-form-group class="col-md-12 mb-3" label="Notes">
                  <b-form-textarea
                    rows="10"
                    max-rows="10"
                    plaintext
                    :value="getSelectedRecord && getSelectedRecord.notes"
                    required
                    placeholder="Notes"
                  ></b-form-textarea>
                </b-form-group>
              </b-form>
            </b-col>
          </div>
        </b-modal>

        <!-- <b-modal id="appointment-location-view" size="xl" hide-footer>
          <div>
            <b-col>
              <b-form>
                <b-form-group
                  class="col-md-12 mb-3"
                  label="Appointment Location"
                >
                  <b-form-textarea
                    rows="10"
                    max-rows="10"
                    plaintext
                    :value="appointmentLocation"
                    required
                    placeholder="Appointment Location"
                  ></b-form-textarea>
                </b-form-group>
              </b-form>
            </b-col>
          </div>
        </b-modal>-->

        <b-modal id="view-attachments" hide-header hide-footer>
          <div class="wrapper" v-if="getSelectedRecord && getSelectedRecord.attachments_detail">
            <vue-good-table
              :columns="attachments_table_columns"
              :search-options="{
                enabled: false,
                placeholder: 'Search',
                selectionInfoClass: ' flex-column flex-sm-row',
              }"
              :pagination-options="{
                enabled: false,
                mode: 'records',
              }"
              styleClass="tableOne vgt-table"
              :selectOptions="{
                enabled: false,
                selectionInfoClass: 'table-alert__box',
              }"
              :rows="getSelectedRecord.attachments_detail"
            >
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'action'">
                  <a
                    v-b-tooltip.hover
                    class="o-hidden d-inline-block c-pointer"
                    title="Delete"
                  >
                    <i
                      class="i-Close-Window text-25 text-danger"
                      @click="
                        confirmationPopup().then((result) => {
                          if (result.value) removeAttachment(props.row);
                        })
                      "
                    ></i>
                  </a>
                </span>
                <span
                  v-else-if="props.column.field == 'file'"
                  class="truncate d-block"
                >
                  <a
                    v-b-tooltip.hover
                    class="o-hidden d-inline-block c-pointer mr-2"
                    title="View in new tab"
                    target="_blank"
                    :href="props.row.file"
                  >
                    <img :src="props.row.file" class="img-thumbnail" />
                  </a>
                </span>
              </template>
            </vue-good-table>
          </div>
        </b-modal>
      </b-col>
    </b-row>
  </div>
  <Loader v-else />
</template>
<script>
import Table from "./table";

import PatientSearchSelect from "../../../components/patient/PatientSearchSelect.vue";
import PaymentForm from "./payment-form.vue";
import { required, minLength, email } from "vuelidate/lib/validators";

import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import Loader from "../../../components/loader/loader";

export default {
  components: {
    Table,
    PaymentForm,
    PatientSearchSelect,
    vueDropzone: vue2Dropzone,
    Loader,
  },
  data() {
    return {
      actionLoading: false,
      patientError: false,
      formErrors: false,
      loading: false,

      form: {
        patient: "",
        appointment_date: new Date(),
        square_location_id: "",
        status: "",
        charge_date: null,
        amount: "",
        notes: "",
        attachments: [],
      },

      dropzoneOptions: {
        url: "https://api.ditchdelta.com/api/attachments/",
        thumbnailWidth: 150,
        maxFilesize: 5,
        headers: {
          "Cache-Control": null,
          "X-Requested-With": null,
        },
      },

      attachments_table_columns: [
        {
          label: "File",
          field: "file",
        },
        {
          label: "Action",
          field: "action",
          tdClass: "text-right",
          thClass: "text-right",
        },
      ],
    };
  },
  validations: {
    form: {
      patient: { required },
      status: { required },
      appointment_date: { required },
      square_location_id: { required },
    },
  },
  computed: {
    ...mapGetters([
      "getClaimAdded",
      "getClaimUpdated",
      "getClaimDeleted",
      "getSelectedTab",
      "getSelectedRecord",
      "getSelectedLocation",
      "getLocations",
      "loggedInUser",
      "errors",
      "cardCharged",
      "getLoading",
      "getStatusUpdated"
    ]),

    selectedFormLoc() {
      if (this.form.square_location_id) {
        let loc = this.getLocations.find(
          (l) => l.id === this.form.square_location_id
        );

        if (loc) return loc.name;
      }

      return "Please select";
    },
  },
  watch: {
    getClaimAdded(val) {
      if (val) {
        this.$bvModal.hide("add-delta-dental");
        this.makeToast("success", "Claim added successfully.");
        this.resetForm();
      }
    },
    getClaimUpdated(val) {
      if (val) {
        this.$bvModal.hide("add-delta-dental");
        this.makeToast("success", "Claim updated successfully.");
        this.resetForm();
      }
    },
    getStatusUpdated(val) {
      if (val) {
        this.makeToast("success", "Status updated successfully.");
        this.setRecord(null);
        this.resetForm();
      }
    },
    getClaimDeleted(val) {
      if (val) {
        // this.$bvModal.hide("add-delta-dental");
        this.makeToast("success", "Claim deleted successfully.");
        this.setRecord(null);
        this.resetForm();
      }
    },
    errors(val) {
      if (val) {
        if (val.message) this.makeToast("danger", val.message);

        if (val.data) this.makeToast("danger", val.data);
      }
    },
    getSelectedLocation(val) {
      if (val) {
        this.fetch();
      }
    },
    getSelectedRecord(val) {
      if(val)
        this.form = { ...val };
    },
    cardCharged(val) {
      if (val) {
        this.fetch();
        this.makeToast("success", "Card Charged successfully.");
      }
    },
  },
  methods: {
    ...mapActions([
      "fetchClaims",
      "createClaim",
      "updateClaim",
      "setTab",
      "setRecord",
    ]),

    fetch() {
      this.loading = true;

      if (this.getSelectedLocation && this.getSelectedLocation.id)
        this.fetchClaims(this.getSelectedLocation.id);

      setTimeout(() => {
        this.loading = false;
      }, 500);
    },

    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return (this.formErrors = true);
      }

      if (!this.form.patient) {
        return (this.patientError = true);
      }

      this.formErrors = false;
      this.patientError = false;

      let data = {
        ...this.form,
        appointment_date: this.formatDate(this.form.appointment_date),
        charge_date: this.form.charge_date
          ? this.formatDate(this.form.charge_date)
          : null,
        // square_location_id: this.form.square_location_id,
        user: this.loggedInUser.id,
      };

      if (this.form.id) {
        return this.updateClaim(data);
      }

      this.createClaim(data);
    },

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

    makeToast(variant = null, msg) {
      this.$bvToast.toast(msg, {
        title: ` ${variant || "default"}`,
        variant: variant,
        solid: true,
      });
    },

    resetForm() {
      this.form = {
        patient: "",
        status: "",
        appointment_date: new Date(),
        square_location_id: "",
        charge_date: null,
        amount: 0,
        notes: "",
        attachments: [],
      };

      this.formErrors = false;
      this.patientError = false;
      this.setRecord(null);
    },

    formatDate(date, format = "YYYY-MM-DD") {
      return moment(date).format(format);
    },

    onPatientSelect(val) {
      this.form.patient = val ? val.id : "";

      if (this.form.patient) this.patientError = false;
    },

    fileUploaded(file, response) {
      console.log(file, response);
      // attach files to claim object

      this.form.attachments.push(response.id);
    },

    removeAttachment(file) {
      axios
        .delete(`/attachments/${file.id}/`)
        .then((response) => {
          console.log(response);

          if (response.status === 204) {
            this.makeToast("success", "Attachment removed!");
            this.$bvModal.hide("view-attachments");
            this.fetch();
          }
        })
        .catch((error) => {
          console.log(error.response);
          this.makeToast("danger", "Error! Cannot delete attachment.");
        });
    },
  },
  mounted() {
    this.setTab("inProgress");
    this.fetch();

    this.dropzoneOptions.headers.Authorization = `Bearer ${this.loggedInUser.access}`;
  },
};
</script>
<style>
.wrapper {
  /* max-height: 500px; */
  overflow-y: auto;
}
.delta-dental-tab span {
  color: #9badbf;
  font-weight: normal;
}
.delta-dental-tab span.active-tab {
  color: #355677;
}
.huddle-tab {
  background-color: #eaf4fb;
  padding: 20px;
  border-radius: 10px;
}
.tabs .nav-tabs {
  border: 0;
}
.tabs .nav-tabs .nav-item .nav-link {
  border: 0;
  background-color: transparent;
  position: relative;
  font-weight: bold;
  color: #05070b;
  padding: 10px 10px 5px;
}
.tabs .nav-tabs .nav-item .nav-link.active:before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  width: 20px;
  height: 2px;
  background-color: #6cdcd4;
  margin: 0 auto;
}
.tabs .nav-tabs .nav-item .nav-link.active {
  color: #6cdcd4;
  border: 0;
  background-color: transparent;
}

#notes-view .form-control-plaintext,
#appointment-location-view .form-control-plaintext {
  border: 2px solid #e5f4f8;
  border-radius: 5px;
  border-width: 1px;
}
#add-delta-dental .b-form-datepicker.focus {
  box-shadow: none;
}
#add-delta-dental .b-form-datepicker .btn {
  padding: 7px 10px;
}
</style>