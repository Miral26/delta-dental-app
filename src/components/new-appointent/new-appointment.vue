<template>
  <div>
    <div class="appointment-head">
      <h2>New Appointment</h2>
      <div class="head-right">
        <div class="search-bar">
          <i class="search-icon text-muted i-Magnifi-Glass1"></i>
          <input
            type="text"
            placeholder="Search a Patient"
            v-model="getAppointmentData.headerSearch"
          />
        </div>
      </div>
    </div>
    <div class="appointment-body">
      <b-tabs>
        <b-tab title="Appoitment" active>
          <div class="appointment-container">
            <div class="mb-20">
              <div class="row">
                <div class="col-md-9">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <b-form-datepicker
                          :date-format-options="{
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          }"
                          id="new-appointment-date-selector"
                          v-model="getAppointmentData.selectedDate"
                          class="datepicker-input"
                        ></b-form-datepicker>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <b-form-timepicker
                          id="timepicker-placeholder"
                          class="icon-none default-timepicker"
                          placeholder="Choose a time"
                          local="en"
                        ></b-form-timepicker>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <div class="input-icon"><i class="fa fa-arrows-h"></i></div>
                    <b-form-input
                      type="text"
                      required
                      placeholder="Duration"
                    ></b-form-input>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <b-form-input
                      type="text"
                      required
                      placeholder="Location"
                    ></b-form-input>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <b-form-input
                      type="text"
                      required
                      placeholder="Operatory"
                    ></b-form-input>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <b-form-input
                      type="text"
                      required
                      placeholder="Provider"
                    ></b-form-input>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <b-dropdown
                      class="provider-dropdown mb-2 mr-5"
                      text="Status"
                    >
                      <b-dropdown-item @click="selectedProvider = ''"
                        >Status</b-dropdown-item
                      >
                    </b-dropdown>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <b-dropdown
                      class="provider-dropdown mb-2 mr-5"
                      text="Appointment Reason"
                    >
                      <b-dropdown-item>Appointment Reason</b-dropdown-item>
                    </b-dropdown>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <b-dropdown
                      class="color-option mb-2 mr-5"
                      text="Color Options"
                    >
                      <b-dropdown-item @click="selectedProvider = ''"
                        >Color Options</b-dropdown-item
                      >
                    </b-dropdown>
                  </div>
                </div>
              </div>
            </div>
            <div class="row appointment-form-btn">
              <div class="col-md-12 text-right">
                <div class="appointment-btn">
                  <b-button
                    class="btn-radius"
                    variant="outline-primary ripple ml-2"
                    >More Option</b-button
                  >
                  <b-button class="btn-radius" variant="primary ripple m-1"
                    >Save</b-button
                  >
                </div>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab title="Patient Notes">
          <div class="mb-20">
            <div>
              <b-form-group class="col-md-12 mb-3">
                <b-form-textarea
                  rows="5"
                  max-rows="5"
                  required
                  placeholder="Patient Notes"
                ></b-form-textarea>
              </b-form-group>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "New-Appointment",
  data() {
    return {
      selectedProvider: "",
    };
  },
  computed: {
    ...mapGetters(["getAppointmentData"]),
  },
};
</script>