<template>
  <div class="main-content">
    <!-- <breadcumb :page="'Dashboard'" :folder="'Version 1'" /> -->
    <b-row>
      <b-col lg="9" md="8">
        <!--  <b-card header="Daily Huddle" header-bg-variant="transparent">-->
        <div class="mb-3 page-title">
          <h3 class="font-weight-bold m-0">Schedule</h3>
        </div>

        <div class="schedule-vue-sample">
          <div class="control-section">
            <div class="schedule-container">
              <ejs-schedule
                id="Schedule"
                ref="ScheduleObj"
                :height="calenderHieght"
                :cssClass="cssClass"
                :selectedDate="dateSelected"
                :eventSettings="eventSettings"
                :eventRendered="onEventRendered"
                :group="group"
                :currentView="currentView"
                :actionBegin="onActionBegin"
                :actionComplete="onActionComplete"
                :renderCell="onRenderCell"
              >
                <e-header-rows>
                  <e-header-row
                    option="Day"
                    :template="dayHeaderTemplate"
                  ></e-header-row>
                </e-header-rows>
                <e-views>
                  <e-view option="Day"></e-view>
                  <!-- <e-view option="Week"></e-view>
                  <e-view option="Month"></e-view> -->
                  <!-- <e-view option="TimelineDay"></e-view>
            <e-view option="TimelineWeek"></e-view>
            <e-view option="TimelineMonth"></e-view> -->
                </e-views>
                <e-resources>
                  <e-resource
                    field="DoctorId"
                    title="Doctors"
                    name="Doctor"
                    :dataSource="employeeDataSource"
                    textField="Text"
                    idField="Id"
                    groupIDField="GroupId"
                    colorField="Color"
                  >
                  </e-resource>
                </e-resources>
              </ejs-schedule>
            </div>
          </div>
        </div>
      </b-col>
      <b-col lg="3" md="4">
        <div class="mb-3 page-title">
          <h3 class="font-weight-bold m-0">Appointment Requests</h3>
        </div>
        <div class="appointment-list">
          <div class="appointment-card" v-for="num in [1, 2, 3]" :key="num">
            <div class="appointment-date-time">
              <span>Mar 19, 2021</span>
              <span>5:00 PM - 6:00 PM</span>
            </div>
            <div class="appointment-title">He - Ryan Smith</div>
            <div class="contact-info">
              <span>melissa.luvisi@gmail.com</span>
              <span>(310)487-4291</span>
            </div>
            <div class="submitted-date">
              <span>Submitted on 3/17/21</span>
              <i class="fa fa-calendar-check-o"></i>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
    <!-- <b-row>
      <b-col md="12 mt-4">
        <b-button
          class="btn-radius"
          variant="primary ripple m-1"
          v-b-modal.new-appointment
          ><i class="fa fa-plus mr-1"></i> New Appointment</b-button
        >
        <b-button class="btn-radius" variant="outline-primary ripple ml-2"
          >Schedule template</b-button
        >
      </b-col>
    </b-row> -->

    <b-modal id="new-appointment" size="xl">
      <div class="appointment-head">
        <h2>New Appointment</h2>
        <div class="head-right">
          <i
            class="i-Add-User cursor-pointer header-icon d-none d-sm-inline-block font-weight-bold"
            v-b-popover.hover.bottom="'Add Patient'"
          >
          </i>
          <div class="search-bar">
            <i class="search-icon text-muted i-Magnifi-Glass1"></i>
            <input
              type="text"
              placeholder="Search a Patient"
              v-model="headerSearch"
            />
          </div>
        </div>
      </div>
      <div class="appointment-body">
        <b-tabs>
          <b-tab title="Appoitment" active>
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
                          v-model="dateSelected"
                          class="datepicker-input"
                        ></b-form-datepicker>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <b-form-timepicker
                          id="timepicker-placeholder"
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
                    <b-form-input
                      type="text"
                      required
                      placeholder="Secondary"
                    ></b-form-input>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <b-dropdown
                      class="provider-dropdown mb-2 mr-5"
                      text="Staff"
                    >
                      <b-dropdown-item @click="selectedProvider = ''"
                        >Staff</b-dropdown-item
                      >
                    </b-dropdown>
                  </div>
                </div>
              </div>
              <div class="row">
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
            <div class="mb-20">
              <h5 class="font-weight-bold mb-3">Treatments</h5>
              <b-tabs content-class="mt-1">
                <b-tab title="Selected" active>
                  <div class="treatments-wrap pt-4 mt-5">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <b-dropdown
                            class="provider-dropdown mb-2 mr-5"
                            text="Recurrence"
                          >
                            <b-dropdown-item @click="selectedProvider = ''"
                              >Recurrence</b-dropdown-item
                            >
                          </b-dropdown>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <b-form-input
                            type="text"
                            required
                            placeholder="Location"
                          ></b-form-input>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <h6 class="font-weight-bold mb-3">Teledentistry</h6>
                      <label class="checkbox checkbox-outline-primary">
                        <input type="checkbox" checked />
                        <span>Meet patient on HIPAA secured video</span>
                        <span class="checkmark"></span>
                      </label>
                      <div class="form-group">
                        <b-dropdown
                          class="provider-dropdown mb-2 mr-5"
                          text="Select HellpPatient Service"
                        >
                          <b-dropdown-item @click="selectedProvider = ''"
                            >Select HellpPatient Service</b-dropdown-item
                          >
                        </b-dropdown>
                      </div>
                      <h6 class="font-weight-bold mb-3">Save The Date</h6>
                      <label class="checkbox checkbox-outline-primary">
                        <input type="checkbox" checked />
                        <span
                          >(HelloPatient - message sent via e-mail/text)</span
                        >
                        <span class="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </b-tab>
                <b-tab title="Template"> </b-tab>
              </b-tabs>
            </div>
            <div class="row">
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
          </b-tab>
          <b-tab title="Insurance">
            <div class="mb-20">
              <div></div>
            </div>
          </b-tab>
          <b-tab title="History">
            <div class="mb-20">
              <div></div>
            </div>
          </b-tab>
          <b-tab title="Patient Notes">
            <div class="mb-20">
              <div></div>
            </div>
          </b-tab>
          <b-tab title="Recall/Frequency">
            <div class="mb-20">
              <div></div>
            </div>
          </b-tab>
          <b-tab title="SOC">
            <div class="mb-20">
              <div></div>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </b-modal>
  </div>
</template>
<style>
.schedule-vue-sample .block-events.e-schedule .template-wrap {
  width: 100%;
}

.schedule-vue-sample
  .block-events.e-schedule
  .e-vertical-view
  .e-resource-cells {
  height: 58px;
}

.schedule-vue-sample
  .block-events.e-schedule
  .e-timeline-view
  .e-resource-left-td,
.schedule-vue-sample
  .block-events.e-schedule
  .e-timeline-month-view
  .e-resource-left-td {
  width: 170px;
}

.schedule-vue-sample
  .block-events.e-schedule
  .e-resource-cells.e-child-node
  .employee-category,
.schedule-vue-sample
  .block-events.e-schedule
  .e-resource-cells.e-child-node
  .employee-name {
  padding: 5px;
}

.schedule-vue-sample .block-events.e-schedule .employee-image {
  width: 45px;
  height: 40px;
  float: left;
  border-radius: 50%;
  margin-right: 10px;
}

.schedule-vue-sample .block-events.e-schedule .employee-name {
  font-size: 13px;
}

.schedule-vue-sample .block-events.e-schedule .employee-designation {
  font-size: 10px;
}
.appointment-list {
  height: -moz-calc(100vh - 255px);
  height: -webkit-calc(100vh - 255px);
  height: calc(100vh - 255px);
  overflow-y: auto;
}
.appointment-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 40px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 5%);
}
.appointment-card:last-child {
  margin-bottom: 0;
}
.appointment-date-time span {
  color: #00c5b4;
  display: block;
  font-size: 16px;
}
.appointment-title {
  color: #12395f;
  font-weight: bold;
  font-size: 17px;
}
.contact-info span {
  color: #c7cadd;
  display: block;
  font-size: 16px;
}
.contact-info {
  margin-top: 10px;
}
.submitted-date {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 15px;
  color: #c7cadd;
}
.submitted-date i {
  color: #00c5b4;
  font-size: 20px;
}
</style>

<script>
import Vue from "vue";
import { createElement, compile, extend } from "@syncfusion/ej2-base";
import { getWeekNumber, getWeekLastDate } from "@syncfusion/ej2-schedule";
import {
  SchedulePlugin,
  Day,
  TimelineViews,
  TimelineMonth,
  Month,
  Week,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-vue-schedule";

Vue.use(SchedulePlugin);

const weekHeaderVue = Vue.component("week-header", {
  template: '<span class="week">{{getWeekDetails(data)}}</span>',
  data() {
    return {
      data: {},
    };
  },
  methods: {
    getWeekDetails: function (value) {
      return "Week " + getWeekNumber(getWeekLastDate(value.date, 0));
    },
  },
});

export default {
  data() {
    return {
      blockData: [
        {
          Id: 1,
          Subject: "Not Available",
          StartTime: new Date(2018, 7, 1, 10, 0),
          EndTime: new Date(2018, 7, 1, 12, 0),
          IsAllDay: false,
          IsBlock: true,
          DoctorId: 1,
        },
        {
          Id: 2,
          Subject: "Not Available",
          StartTime: new Date(2018, 7, 1, 16, 0),
          EndTime: new Date(2018, 7, 1, 20, 0),
          IsAllDay: false,
          IsBlock: true,
          DoctorId: 2,
        },
        {
          Id: 3,
          Subject: "Not Available",
          StartTime: new Date(2018, 7, 1, 12, 0),
          EndTime: new Date(2018, 7, 1, 14, 0),
          IsAllDay: false,
          IsBlock: true,
          DoctorId: 3,
        },
        {
          Id: 4,
          Subject: "Not Available",
          StartTime: new Date(2018, 7, 4, 11, 0),
          EndTime: new Date(2018, 7, 5, 10, 0),
          IsAllDay: true,
          IsBlock: true,
          DoctorId: 4,
        },
        {
          Id: 5,
          Subject: "Not Available",
          StartTime: new Date(2018, 7, 10, 11, 0),
          EndTime: new Date(2018, 7, 12, 10, 0),
          IsAllDay: false,
          IsBlock: true,
          DoctorId: 5,
        },
        {
          Id: 6,
          Subject: "Not Available",
          StartTime: new Date(2018, 7, 8),
          EndTime: new Date(2018, 7, 11),
          IsAllDay: false,
          IsBlock: true,
          DoctorId: 6,
        },
        {
          Id: 9,
          Subject: "Client Meeting",
          StartTime: new Date(2018, 7, 3, 8, 0),
          EndTime: new Date(2018, 7, 3, 10, 30),
          IsAllDay: false,
          DoctorId: 3,
        },
        {
          Id: 10,
          Subject: "Conference",
          StartTime: new Date(2018, 7, 2, 13, 30),
          EndTime: new Date(2018, 7, 2, 15, 0),
          IsAllDay: false,
          DoctorId: 4,
        },
        {
          Id: 11,
          Subject: "Employee Recruitment",
          StartTime: new Date(2018, 7, 1, 10, 0),
          EndTime: new Date(2018, 7, 1, 13, 0),
          IsAllDay: false,
          DoctorId: 5,
        },
        {
          Id: 12,
          Subject: "Data Analyzing",
          StartTime: new Date(2018, 7, 1, 15, 0),
          EndTime: new Date(2018, 7, 1, 17, 0),
          IsAllDay: false,
          DoctorId: 6,
        },
        {
          Id: 13,
          Subject: "Content Writting",
          StartTime: new Date(2018, 7, 2, 14, 0),
          EndTime: new Date(2018, 7, 2, 16, 0),
          IsAllDay: false,
          DoctorId: 1,
        },
        {
          Id: 14,
          Subject: "Meeting",
          StartTime: new Date(2018, 7, 1, 9, 0),
          EndTime: new Date(2018, 7, 1, 11, 0),
          IsAllDay: false,
          DoctorId: 4,
        },
        {
          Id: 15,
          Subject: "Not Available",
          StartTime: new Date(2018, 7, 29, 11, 0),
          EndTime: new Date(2018, 7, 31, 10, 0),
          IsAllDay: false,
          IsBlock: true,
          DoctorId: 4,
        },
        {
          Id: 16,
          Subject: "Not Available",
          StartTime: new Date(2018, 7, 12),
          EndTime: new Date(2018, 7, 15),
          IsAllDay: false,
          IsBlock: true,
          DoctorId: 3,
        },
      ],
      eventSettings: {
        dataSource: extend([], this.blockData, null, true),
      },
      headerSearch: "",
      dateSelected: new Date(2018, 7, 1),
      currentView: "Day",
      calenderHieght: window.innerHeight - 255,
      cssClass: "block-events",
      group: {
        enableCompactView: true,
        resources: ["Doctor"],
      },
      dayHeaderTemplate(e) {
        console.log(`e`, e);
        return {
          template: weekHeaderVue,
        };
      },
      employeeDataSource: [
        {
          Text: "OP - 1",
          Id: 1,
          GroupId: 1,
          Color: "#bbdc00",
          Designation: "Content writer",
        },
        {
          Text: "OP - 2",
          Id: 2,
          GroupId: 2,
          Color: "#9e5fff",
          Designation: "Designer",
        },
        {
          Text: "OP - 3",
          Id: 3,
          GroupId: 1,
          Color: "#bbdc00",
          Designation: "Software Engineer",
        },
        {
          Text: "OP - 4",
          Id: 4,
          GroupId: 2,
          Color: "#9e5fff",
          Designation: "Support Engineer",
        },
        {
          Text: "Other Office",
          Id: 5,
          GroupId: 1,
          Color: "#bbdc00",
          Designation: "Human Resource",
        },
      ],
    };
  },

  computed: {},
  methods: {
    getWeather: function (value) {
      switch (value.getDay()) {
        case 0:
          return '<img class="weather-image" src="source/schedule/images/weather-clear.svg"/><div class="weather-text">25°C</div>';
        case 1:
          return '<img class="weather-image" src="source/schedule/images/weather-clouds.svg"/><div class="weather-text">18°C</div>';
        case 2:
          return '<img class="weather-image" src="source/schedule/images/weather-rain.svg"/><div class="weather-text">10°C</div>';
        case 3:
          return '<img class="weather-image" src="source/schedule/images/weather-clouds.svg"/><div class="weather-text">16°C</div>';
        case 4:
          return '<img class="weather-image" src="source/schedule/images/weather-rain.svg"/><div class="weather-text">8°C</div>';
        case 5:
          return '<img class="weather-image" src="source/schedule/images/weather-clear.svg"/><div class="weather-text">27°C</div>';
        case 6:
          return '<img class="weather-image" src="source/schedule/images/weather-clouds.svg"/><div class="weather-text">17°C</div>';
        default:
          return null;
      }
    },
    onRenderCell: function (args) {
      // console.log(`args`, args)
      let scheduleObj = this.$refs.ScheduleObj;
      if (
        args.elementType === "dateHeader" &&
        scheduleObj.ej2Instances.currentView === "Day"
      ) {
        if (args.groupIndex !== 0) {
          console.log(`args`, args);
          args.element.remove();
        }
      }
    },
    onEventRendered: function (args) {
      let categoryColor = args.data.CategoryColor;
      if (!args.element || !categoryColor) {
        return;
      }
      args.element.style.backgroundColor = categoryColor;
    },
    onActionBegin: function (args) {
      if (args.requestType === "toolbarItemRendering") {
        let userIconItem = {
          align: "Right",
          prefixIcon: "i-Full-Screen",
          cssClass: "e-schedule-user-icon full-screen-view",
        };
        args.items.push(userIconItem);
      }
    },
    onActionComplete: function (args) {
      let scheduleElement = document.getElementById("Schedule");
      if (args.requestType === "toolBarItemRendered") {
        let userIconEle = scheduleElement.querySelector(
          ".e-schedule-user-icon"
        );
        userIconEle.onclick = () => {
          const element = document.querySelector(".schedule-container");

          if (element.classList.contains("full-screen")) {
            element.classList.remove("full-screen");
            const fullScreenElement = document.querySelector(
              ".full-screen-view button .i-Close-Window"
            );
            fullScreenElement.classList.add("i-Full-Screen");
            fullScreenElement.classList.remove("i-Close-Window");
          } else {
            const fullScreenElement = document.querySelector(
              ".full-screen-view button .i-Full-Screen"
            );
            element.classList.add("full-screen");
            fullScreenElement.classList.remove("i-Full-Screen");
            fullScreenElement.classList.add("i-Close-Window");
          }
        };
      }
      let userContentEle = createElement("div", {
        className: "e-profile-wrapper",
      });
      scheduleElement.parentElement.appendChild(userContentEle);
      const template = '<div class="name">Full Screen</div>';
      compile(template);
    },
    // function to handle the CheckBox change event
    onChange: function (args) {
      this.$refs.ScheduleObj.ej2Instances.showHeaderBar = args.checked;
    },
  },
  provide: {
    schedule: [
      Day,
      TimelineViews,
      TimelineMonth,
      Month,
      Week,
      Resize,
      DragAndDrop,
    ],
  },
};
</script>