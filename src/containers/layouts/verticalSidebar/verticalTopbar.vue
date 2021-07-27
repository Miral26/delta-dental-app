<template>
  <div class="mb-30">
    <header class="main-header vertical-header d-flex">
      <div class="menu-toggle vertical-toggle" @click="mobileSidebar">
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div class="header-toggle">
        <!-- <div class="search-bar">
          <i class="search-icon text-muted i-Magnifi-Glass1"></i>
          <input
            type="text"
            placeholder="Search a Patient"
            v-model="headerSearch"
          />
        </div> -->

        <!-- Header Icons -->
        <div class="d-flex">
          <!-- <i
            class="
              i-File-Clipboard-File--Text
              cursor-pointer
              header-icon
              d-none d-sm-inline-block
              font-weight-bold
            "
            @click="openAppointmentModal"
            v-b-popover.hover.bottom="'Add Appointment'"
          >
          </i> -->
          <!-- <i
            class="
              i-Add-User
              cursor-pointer
              header-icon
              d-none d-sm-inline-block
              font-weight-bold
            "
            v-b-popover.hover.bottom="'Add Patient'"
          >
          </i> -->
          <!-- <i
            class="i-Magnifi-Glass- cursor-pointer header-icon d-none d-sm-inline-block font-weight-bold"
            v-b-popover.hover.bottom="'Advanced Patient Search'"
          >
          </i> -->
        </div>
      </div>

      <div class="header-part-right">
        <div class="dropdown location">
          <b-dropdown
            id="dropdown"
            text="Dropdown Button"
            toggle-class="text-decoration-none"
            no-caret
            variant="button"
          >
            <template slot="button-content">
              <i
                class="i-Home1 header-icon"
                role="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></i>
              <span
                class="text-14 cursor-pointer truncate d-inline-block text-left"
                style="text-decoration: none"
              >
                {{ getSelectedLocation && getSelectedLocation.name }}
                <i
                  class="
                    i-Arrow-Down
                    text-20
                    cursor-pointer
                    header-icon
                    d-sm-inline-block
                  "
                  v-b-popover.hover.bottom="'Client - Location'"
                >
                </i>
              </span>
            </template>
            <div class="menu-icon-grid p-3 border-dark">
              <div class="form-group w-100">
                <b-form>
                  <div class="form-group">
                    <b-form-select
                      id="input-3"
                      v-model="location"
                      :options="getLocations"
                      required
                      value-field="id"
                      text-field="name"
                    >
                    </b-form-select>
                  </div>
                </b-form>
              </div>
            </div>
          </b-dropdown>
        </div>

        <a class="o-hidden d-inline-block">
          <b-button
            size="sm"
            class="btn-radius ml-2"
            variant="primary"
            @click="
              confirmationPopup().then((result) => {
                if (result.value) runCron();
              })
            "
            >Run daily job</b-button
          >
        </a>

        <!-- <a
          v-b-tooltip.hover
          class="d-flex ml-2 p-2 rounded c-pointer"
          title="Run Daily Job"
          style="background-color: #e5f4f8; color: #00c5b4"
        >
          <i
            class="i-Restore-Window text-20"
            @click="
              confirmationPopup().then((result) => {
                if (result.value) runCron();
              })
            "
          ></i>
        </a> -->
      </div>
    </header>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import * as moment from "moment";
import { mixin as clickaway } from "vue-clickaway";
import Util from "@/utils";
import axios from "axios";

export default {
  mixins: [clickaway],
  computed: {
    ...mapGetters([
      "getVerticalCompact",
      "getVerticalSidebar",
      "getSideBarToggleProperties",
      "getLocations",
      "getSelectedLocation",
    ]),
  },
  data() {
    return {
      isloading: false,
      location: null,
      isMegaMenuOpen: false,
      megaMenuOptions: [
        {
          id: 1,
          title: "Schedule Template",
          icon: "i-Shop-4",
          route: "/app/schedule-template",
        },
        {
          id: 2,
          title: "Users",
          icon: "i-Checked-User",
          route: "/app/users",
        },
        {
          id: 3,
          title: "Locations",
          icon: "i-Drop",
          route: "/app/locations",
        },
        {
          id: 4,
          title: "Location Hours",
          icon: "i-File-Clipboard-File--Text",
          route: "/app/location-hours",
        },
        {
          id: 5,
          title: "Operatories",
          icon: "i-Shop-4",
          route: "/app/operatories",
        },
        {
          id: 6,
          title: "Delta Dental",
          icon: "i-Ambulance",
          route: "/app/delta-dental",
        },
      ],
      dateSelected: new Date(),
      headerSearch: "",
      appointmentData: {
        headerSearch: "",
        selectedTime: moment().format("HH:MM:ss"),
        selectedDate: new Date(2018, 7, 1),
      },
      options2: [
        { value: "1", text: "aa" + " - " + "1" },
        { value: "2", text: "ab" + " - " + "2" },
        { value: "3", text: "bc" + " - " + "3" },
        { value: "4", text: "cd" + " - " + "4" },
        { value: "5", text: "de" + " - " + "5" },
      ],

      cloudBase: {
        clinic: "Cloud Based...",
        clinics: ["Cloud Based...", "Clinic1", "Clinic2", "Clinic3"],
        location: 'null',
        locations: [
          { text: "Select Location", value: null },
          "USD",
          "Canada",
          "Africa",
          "Australia",
        ],
      },
    };
  },
  mounted() {
    // this.setLocations();
  },
  watch: {
    getSelectedLocation(val) {
      if (val) {
        this.location = val.id;
      }
    },
    location(val) {
      if (val) {
        this.setSelectedLocation(val);
      }
    },
  },
  methods: {
    ...mapActions([
      "signOut",
      "switchSidebar",
      "sidebarCompact",
      "removeSidebarCompact",
      "mobileSidebar",
      "setAppointmentData",
      "setLocations",
      "setSelectedLocation",
    ]),
    openAppointmentModal() {
      this.setAppointmentData({
        headerSearch: "",
        selectedTime: moment().format("HH:MM:ss"),
        selectedDate: new Date(),
      });
      this.$bvModal.show("new-appointment");
    },
    handleFullScreen() {
      Util.toggleFullScreen();
    },
    closeMegaMenu() {
      this.isMegaMenuOpen = false;
      // console.log(this.isMouseOnMegaMenu);
      // if (!this.isMouseOnMegaMenu) {
      //   this.isMegaMenuOpen = !this.isMegaMenuOpen;
      // }
    },
    toggleMegaMenu() {
      this.isMegaMenuOpen = !this.isMegaMenuOpen;
    },
    runCron() {
      if (this.isloading) return;

      this.isloading = true;

      axios
        .get("insurance-claims/batch-run/")
        .then((response) => {
          console.log("resp: ", response);
          this.makeToast("success", "Cron job ran successfully.");
          this.isloading = false;
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        })
        .catch((error) => {
          console.log("error: ", error);
          this.makeToast("danger", "Error running cron job.");
          this.isloading = false;
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
        confirmButtonText: "Yes, run it!",
      });
    },
    makeToast(variant = null, msg) {
      this.$bvToast.toast(msg, {
        title: `${variant || "Default"}`,
        variant: variant,
        solid: true,
      });
    },
  },
};
</script>

<style scoped>
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>