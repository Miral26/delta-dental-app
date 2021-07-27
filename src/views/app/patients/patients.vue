<template>
  <div class="main-content" v-if="!loading">
    <b-row>
      <b-col lg="12" xl="12" md="12">
        <div class="d-flex justify-content-between">
          <div class="d-flex align-items-center mb-4">
            <div class="mr-3 page-title">
              <h3 class="font-weight-bold m-0">Patients</h3>
            </div>
          </div>
        </div>

        <Table
          :patients="patients"
          :onPatientEdit="onPatientEdit"
          :onPatientDelete="onPatientDelete"
        />

        <b-modal
          id="add-patient"
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
                    <b-form-group class="mb-3" label="First Name">
                      <b-form-input
                        type="text"
                        v-model.trim="$v.patientForm.first_name.$model"
                      ></b-form-input>

                      <b-alert
                        show
                        variant="danger"
                        v-if="!$v.patientForm.first_name.required && formErrors"
                        class="mt-2"
                        >This is a required field.</b-alert
                      >
                      <b-alert
                        show
                        variant="danger"
                        v-if="
                          !$v.patientForm.first_name.minLength && formErrors
                        "
                        class="mt-2"
                        >Minimum 4 letters allowed.</b-alert
                      >
                    </b-form-group>
                  </div>
                  <!-- <div class="col-md-4">
                    <b-form-group class="mb-3" label="Middle Name">
                      <b-form-input
                        type="text"
                        v-model.trim="$v.patientForm.middle_name.$model"
                      ></b-form-input>
                    </b-form-group>
                  </div>-->
                  <div class="col-md-6">
                    <b-form-group class="mb-3" label="Last Name">
                      <b-form-input
                        type="text"
                        v-model.trim="$v.patientForm.last_name.$model"
                      ></b-form-input>

                      <b-alert
                        show
                        variant="danger"
                        v-if="!$v.patientForm.last_name.required && formErrors"
                        class="mt-2"
                        >This is a required field.</b-alert
                      >
                      <b-alert
                        show
                        variant="danger"
                        v-if="!$v.patientForm.last_name.minLength && formErrors"
                        class="mt-2"
                        >Minimum 4 letters allowed.</b-alert
                      >
                    </b-form-group>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <b-form-group class="mb-3" label="Email Address">
                      <b-form-input
                        type="text"
                        v-model.trim="$v.patientForm.email.$model"
                      ></b-form-input>

                      <b-alert
                        show
                        variant="danger"
                        v-if="!$v.patientForm.email.required && formErrors"
                        class="mt-2"
                        >This is a required field.</b-alert
                      >
                    </b-form-group>
                  </div>
                  <div class="col-md-6">
                    <b-form-group
                      class="mb-3"
                      label="Date of Birth (YYYY-MM-DD)"
                    >
                      <!-- <b-form-input
                        type="text"
                        v-model.trim="$v.patientForm.date_of_birth.$model"
                      ></b-form-input> -->

                      <input
                        class="form-control"
                        type="text"
                        v-model.trim="$v.patientForm.date_of_birth.$model"
                        @input="acceptDOB"
                      />

                      <b-alert
                        show
                        variant="danger"
                        v-if="
                          !$v.patientForm.date_of_birth.required && formErrors
                        "
                        class="mt-2"
                        >This is a required field.</b-alert
                      >
                    </b-form-group>
                    <!-- <b-form-group class="mb-3" label="Date of Birth">
                      <b-form-datepicker
                        :date-format-options="{
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                        }"
                        :max="new Date()"
                        v-model="$v.patientForm.date_of_birth.$model"
                      ></b-form-datepicker>

                      <b-alert
                        show
                        variant="danger"
                        v-if="
                          !$v.patientForm.date_of_birth.required && formErrors
                        "
                        class="mt-2"
                        >This is a required field.</b-alert
                      >
                    </b-form-group> -->
                  </div>
                  <!-- <div class="col-md-4">
                    <b-form-group class="mb-3" label="Gender">
                      <b-dropdown
                        class="default-dropdown"
                        :text="patientForm.gender || 'Select a gender'"
                      >
                        <b-dropdown-item @click="patientForm.gender = ''"
                          >Select a gender</b-dropdown-item
                        >
                        <b-dropdown-item @click="patientForm.gender = 'MALE'"
                          >Male</b-dropdown-item
                        >
                        <b-dropdown-item @click="patientForm.gender = 'FEMALE'"
                          >Female</b-dropdown-item
                        >
                      </b-dropdown>
                    </b-form-group>
                  </div>-->
                </div>

                <div class="row">
                  <!-- <div class="col-md-4">
                    <b-form-group class="mb-3" label="Nick Name">
                      <b-form-input
                        type="text"
                        v-model.trim="$v.patientForm.nick_name.$model"
                      ></b-form-input>
                    </b-form-group>
                  </div>-->
                  <div class="col-md-6">
                    <b-form-group class="mb-3" label="Phone">
                      <!-- <b-form-input
                        type="text"
                        v-model.trim="$v.patientForm.phone_number.$model"
                        @input="acceptNumber"
                      ></b-form-input> -->

                      <input
                        class="form-control"
                        type="text"
                        v-model.trim="$v.patientForm.phone_number.$model"
                        @input="acceptNumber"
                      />

                      <b-alert
                        show
                        variant="danger"
                        v-if="
                          !$v.patientForm.phone_number.required && formErrors
                        "
                        class="mt-2"
                        >This is a required field.</b-alert
                      >

                      <b-alert
                        show
                        variant="danger"
                        v-if="
                          !$v.patientForm.phone_number.minLength && formErrors
                        "
                        class="mt-2"
                        >Minimum 10 letters allowed.</b-alert
                      >
                    </b-form-group>
                  </div>

                  <div class="col-md-6">
                    <b-form-group class="mb-3" label="Home Office">
                      <b-dropdown
                        class="default-dropdown"
                        :text="selectedFormLoc"
                      >
                        <b-dropdown-item
                          value
                          @click="patientForm.square_location_id = ''"
                          >Please select</b-dropdown-item
                        >
                        <b-dropdown-item
                          :value="loc.id"
                          @click="patientForm.square_location_id = loc.id"
                          v-for="loc in getLocations"
                          :key="loc.id"
                          >{{ loc.name }}</b-dropdown-item
                        >
                      </b-dropdown>

                      <b-alert
                        variant="danger"
                        :show="
                          !$v.patientForm.square_location_id.required &&
                          formErrors
                        "
                        class="mt-2"
                        >This is a required field.</b-alert
                      >
                    </b-form-group>
                  </div>

                  <!-- <div class="col-md-6">
                    <b-form-group class="mb-3" label="Home Office">
                      <b-form-input
                        type="text"
                        v-model="$v.patientForm.location.$model"
                      ></b-form-input>

                      <b-alert
                        show
                        variant="danger"
                        v-if="!$v.patientForm.location.required && formErrors"
                        class="mt-2"
                        >This is a required field.</b-alert
                      >
                    </b-form-group>
                  </div> -->

                  <!-- <div class="col-md-4">
                    <b-form-group class="mb-3" label="Cell">
                      <b-form-input
                        type="text"
                        v-model.trim="$v.patientForm.cell.$model"
                      ></b-form-input>
                    </b-form-group>
                  </div>-->
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <b-form-group class="mb-3" label="Group #">
                      <b-form-input
                        type="text"
                        v-model.trim="$v.patientForm.group_id.$model"
                      ></b-form-input>

                      <b-alert
                        show
                        variant="danger"
                        v-if="!$v.patientForm.group_id.required && formErrors"
                        class="mt-2"
                        >This is a required field.</b-alert
                      >
                    </b-form-group>
                  </div>

                  <div class="col-md-6">
                    <b-form-group class="mb-3" label="Subscriber Name">
                      <b-form-input
                        type="text"
                        v-model="$v.patientForm.subscriber_name.$model"
                      ></b-form-input>

                      <b-alert
                        show
                        variant="danger"
                        v-if="
                          !$v.patientForm.subscriber_name.required && formErrors
                        "
                        class="mt-2"
                        >This is a required field.</b-alert
                      >
                    </b-form-group>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <b-form-group class="mb-3" label="Subscriber Id">
                      <b-form-input
                        type="text"
                        v-model.trim="$v.patientForm.subscriber_id.$model"
                      ></b-form-input>

                      <b-alert
                        show
                        variant="danger"
                        v-if="
                          !$v.patientForm.subscriber_id.required && formErrors
                        "
                        class="mt-2"
                        >This is a required field.</b-alert
                      >
                    </b-form-group>
                  </div>

                  <div class="col-md-6">
                    <b-form-group
                      class="mb-3"
                      label="Subscriber Date of Birth (YYYY-MM-DD)"
                    >
                      <!-- <b-form-datepicker
                        :date-format-options="{
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                        }"
                        :max="new Date()"
                        v-model="$v.patientForm.subscriber_dob.$model"
                      ></b-form-datepicker> -->
                      <!-- <b-form-input
                        type="text"
                        v-model.trim="$v.patientForm.subscriber_dob.$model"
                      ></b-form-input> -->

                      <input
                        class="form-control"
                        type="text"
                        v-model.trim="$v.patientForm.subscriber_dob.$model"
                        @input="acceptSubDOB"
                      />

                      <b-alert
                        show
                        variant="danger"
                        v-if="
                          !$v.patientForm.subscriber_dob.required && formErrors
                        "
                        class="mt-2"
                        >This is a required field.</b-alert
                      >
                    </b-form-group>
                  </div>

                  <!-- <div class="col-md-4">
                    <b-form-group class="mb-3" label="Home Office">
                      <b-form-input
                        type="text"
                        v-model.trim="$v.patientForm.home_office.$model"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-4">
                    <b-form-group class="mb-3" label="Other Notes">
                      <b-form-input
                        type="text"
                        v-model.trim="$v.patientForm.other_notes.$model"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-4">
                    <b-form-group class="mb-3" label="Insurance Policy#">
                      <b-form-input
                        type="text"
                        v-model.trim="$v.patientForm.insurance_policy.$model"
                      ></b-form-input>
                    </b-form-group>
                  </div>-->
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <b-button
                      type="submit"
                      size="sm"
                      class="btn-radius"
                      variant="primary"
                      :disabled="actionLoading"
                    >
                      <div class="d-flex">
                        <span :class="actionLoading ? 'mr-3' : ''">
                          {{
                            actionLoading
                              ? "Saving..."
                              : patientForm.id
                              ? "Update"
                              : "Save"
                          }}
                        </span>
                        <span class="spinner" v-if="actionLoading"></span>
                      </div>
                    </b-button>
                    <b-button
                      size="sm"
                      class="btn-radius ml-2"
                      variant="outline-primary"
                      @click="
                        resetForm();
                        $bvModal.hide('add-patient');
                      "
                      >Cancel</b-button
                    >
                  </div>
                </div>
              </b-form>
            </b-col>
          </div>
        </b-modal>

        <b-modal
          id="subscriber-info-view"
          size="xl"
          title="Subscriber Info"
          hide-footer
        >
          <div>
            <b-col>
              <p>
                ID: {{ getPatientData.subscriber_id }}
                <br />
                Name: {{ getPatientData.subscriber_name }}
                <br />
                Date of Birth: {{ getPatientData.subscriber_dob }}
              </p>
            </b-col>
          </div>
        </b-modal>

        <b-modal
          id="home-office-view"
          size="xl"
          title="Home Office"
          hide-footer
        >
          <div>
            <b-col>
              <p>{{ getHomeOffice }}</p>
            </b-col>
          </div>
        </b-modal>

        <b-modal
          id="patient-card-add"
          size="lg"
          title="Add Payment Details"
          hide-footer
        >
          <PaymentForm :id="getPatientData.id" />
        </b-modal>

        <b-modal
          id="patient-card-view"
          size=""
          title="View Payment Details"
          hide-footer
        >
          <div
            class="wrapper"
            v-if="getPatientData && getPatientData.cards.length"
          >
            <div
              class="card px-4 py-3 my-4"
              style="
                background-color: #6cdcd4;
                box-shadow: 0px 20px 20px #ccc;
                pointer-events: none;
                max-width: 340px;
                margin: auto;
              "
            >
              <p class="text-right font-weight-bold" style="font-size: 26px">
                VISA
              </p>
              <div class="mt-4" style="font-size: 24px">
                **** **** **** {{ getPatientData.cards[0].card_last_digit }}
              </div>
              <div
                class="d-flex justify-content-between mt-3"
                style="font-size: 18px"
              >
                <span>{{ getPatientData.cards[0].name }}</span>
                <span>{{
                  `${zeroPad(
                    getPatientData.cards[0].exp_month,
                    2
                  )}/${getPatientData.cards[0].exp_year.substr(-2)}`
                }}</span>
              </div>
            </div>

            <div class="text-right border-top pt-3">
              <b-button
                size="sm"
                variant="danger"
                @click="
                  confirmationPopup().then((result) => {
                    if (result.value) removeCard(getPatientData.cards[0]);
                  })
                "
                >Remove Card</b-button
              >
            </div>

            <!-- <vue-good-table
              :columns="card_list_table_columns"
              :line-numbers="false"
              :search-options="{
                enabled: false,
                placeholder: 'Search Card',
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
              :rows="getPatientData.cards"
            >
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'expiry_date'">{{
                  `${props.row.exp_month}/${props.row.exp_year}`
                }}</span>

                <span v-else-if="props.column.field == 'action'">
                  <a
                    v-b-tooltip.hover
                    class="o-hidden d-inline-block c-pointer"
                    title="Delete"
                  >
                    <i
                      class="i-Close-Window text-25 text-danger"
                      @click="
                        confirmationPopup().then((result) => {
                          if (result.value) removeCard(props.row);
                        })
                      "
                    ></i>
                  </a>
                </span>
              </template>
            </vue-good-table> -->
          </div>
        </b-modal>
      </b-col>
    </b-row>
  </div>
  <Loader v-else />
</template>
<script>
import Table from "./table";
import { required, minLength, email } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
import Loader from "../../../components/loader/loader";
import PaymentForm from "./payment-form.vue";
import {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "./APICalls";
import axios from "axios";

export default {
  components: {
    Table,
    Loader,
    PaymentForm,
  },
  data() {
    return {
      formErrors: false,
      loading: false,
      actionLoading: false,
      patientForm: {
        first_name: "",
        last_name: "",
        email: "",
        date_of_birth: null,
        phone_number: "",
        group_id: "",
        subscriber_name: "",
        subscriber_id: "",
        subscriber_dob: null,
        // location: "",
        square_location_id: "",
      },
      patients: [],
      customerCardForm: {
        card_number: "",
        expiry_date: "",
        cvv: "",
      },
      card_list_table_columns: [
        {
          label: "Holder Name",
          field: "name",
        },
        {
          label: "Card Last 4 Digits",
          field: "card_last_digit",
        },
        {
          label: "Exp Date",
          field: "expiry_date",
        },
        {
          label: "Postal Code",
          field: "postal_code",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
    };
  },
  validations: {
    patientForm: {
      first_name: { required, minLength: minLength(1) },
      last_name: { required, minLength: minLength(1) },
      email: { required, email: email() },
      date_of_birth: { required },
      phone_number: { required, minLength: minLength(10) },
      group_id: { required },
      // location: { required },
      square_location_id: { required },
      subscriber_name: { required },
      subscriber_id: { required },
      subscriber_dob: { required },
    },
  },
  computed: {
    ...mapGetters([
      "getSelectedLocation",
      "loggedInUser",
      "getPatientData",
      "getCardAdded",
      "getLocations",
    ]),
    selectedFormLoc() {
      if (this.patientForm.square_location_id) {
        let loc = this.getLocations.find(
          (l) => l.id === this.patientForm.square_location_id
        );

        if (loc) return loc.name;
      }

      return "Please select";
    },
    getHomeOffice() {
      if (!this.getLocations.length || !this.getPatientData.square_location_id)
        return "";

      return this.getLocations.find(
        (l) => l.id === this.getPatientData.square_location_id
      ).name;
    },
  },
  watch: {
    getCardAdded(val) {
      if (val) {
        this.fetch();
        this.makeToast("success", "Card Added");
      }
    },
    // getSelectedLocation(val) {
    //   if (val) {
    //     this.fetch();
    //   }
    // },
  },
  methods: {
    submit() {
      // validate form
      this.$v.$touch();
      if (this.$v.$invalid) {
        return (this.formErrors = true);
      }

      this.patientForm.user = this.loggedInUser.id;
      // this.patientForm.location = this.getSelectedLocation.id;

      if (this.patientForm) {
        this.actionLoading = true;
        if (this.patientForm.id) {
          const updatedObj = { ...this.patientForm };
          const patientId = updatedObj.id;
          updatedObj.id;
          updatePatient(updatedObj, patientId)
            .then((result) => {
              const patientsData = this.patients.slice(0);
              const patientIndex = patientsData.findIndex(
                (p) => p.id === result.id
              );
              if (patientIndex > -1) {
                patientsData[patientIndex] = {
                  ...result,
                  id: patientId,
                  full_name: `${result.first_name} ${result.last_name}`,
                };
                this.patients = patientsData;
              }
              this.$bvModal.hide("add-patient");
              this.actionLoading = false;
              this.resetForm();
              this.makeToast("success", "Patient updated successfully!");
            })
            .catch((error) => {
              this.makeToast("danger", "Form Error! Failed to update patient.");
              this.actionLoading = false;
            });
        } else {
          createPatient(this.patientForm)
            .then((result) => {
              this.patients.push({
                ...result,
                full_name: `${result.first_name} ${result.last_name}`,
              });
              this.$bvModal.hide("add-patient");
              this.actionLoading = false;
              this.resetForm();
              this.makeToast("success", "Patient added successfully!");
            })
            .catch((error) => {
              // console.log(error.response);
              this.makeToast("danger", "Form Error! Failed to create patient.");
              this.actionLoading = false;
            });
        }
      }
    },
    onPatientEdit(data) {
      this.patientForm = { ...data };
      this.$bvModal.show("add-patient");
    },
    onPatientDelete(data) {
      this.actionLoading = true;
      if (data && data.id) {
        deletePatient(data.id).then((result) => {
          if (result) {
            const patientIndex = this.patients.findIndex(
              (p) => p.id === data.id
            );
            if (patientIndex > -1) {
              this.patients.splice(patientIndex, 1);
            }
          }
          this.actionLoading = false;
        });
      }
    },
    makeToast(variant = null, msg) {
      this.$bvToast.toast(msg, {
        title: ` ${variant || "default"}`,
        variant: variant,
        solid: true,
      });
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
    removeCard(card) {
      axios
        .delete(`patient/${this.getPatientData.id}/cards/${card.id}/`)
        .then((response) => {
          // console.log(response.data);

          this.$bvModal.hide("patient-card-view");
          this.makeToast("success", "Card Removed");
          this.fetch();
        })
        .catch((error) => {
          // console.log("Error! Can't remove card", error)
          this.makeToast("danger", "Error! Can't remove card.");
        });
    },

    async fetch() {
      this.loading = true;

      await getPatients(this.getSelectedLocation.id).then((result) => {
        this.patients = (result && result.results) || [];

        this.patients.map(
          (p) => (p.full_name = `${p.first_name} ${p.last_name}`)
        );

        this.loading = false;
      });
    },

    resetForm() {
      this.patientForm = {
        first_name: "",
        last_name: "",
        email: "",
        date_of_birth: null,
        phone_number: "",
        group_id: "",
        subscriber_name: "",
        subscriber_id: "",
        subscriber_dob: null,
        square_location_id: "",
      };

      this.formErrors = false;
    },

    zeroPad(num, places) {
      var zero = places - num.toString().length + 1;
      return Array(+(zero > 0 && zero)).join("0") + num;
    },

    acceptNumber() {
      var x = this.patientForm.phone_number
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);

      this.patientForm.phone_number = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    },

    acceptDOB() {
      var x = this.patientForm.date_of_birth
        .replace(/\D/g, "")
        .match(/(\d{0,4})(\d{0,2})(\d{0,2})/);

      this.patientForm.date_of_birth = !x[2]
        ? x[1]
        : x[1] + "-" + x[2] + (x[3] ? "-" + x[3] : "");
    },

    acceptSubDOB() {
      var x = this.patientForm.subscriber_dob
        .replace(/\D/g, "")
        .match(/(\d{0,4})(\d{0,2})(\d{0,2})/);

      this.patientForm.subscriber_dob = !x[2]
        ? x[1]
        : x[1] + "-" + x[2] + (x[3] ? "-" + x[3] : "");
    },
  },
  mounted() {
    if (this.getSelectedLocation && this.getSelectedLocation.id) this.fetch();
  },
};
</script>
<style>
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
  padding: 10px 5px 5px;
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
#add-delta-dental .b-form-datepicker > .btn {
  padding: 7px 10px;
}
</style>
