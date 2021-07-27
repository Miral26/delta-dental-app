<template>
  <div>
    <div class="main-content table-list">
      <div class="wrapper" v-if="getPayments">
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
            perPageDropdown: [50, 100, 500],
          }"
          styleClass="tableOne vgt-table"
          :selectOptions="{
            enabled: false,
            selectionInfoClass: 'table-alert__box',
          }"
          :rows="getPayments"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'action'">
              <a
                v-b-tooltip.hover
                class="
                  d-inline-block
                  btn-radius btn btn-primary btn-sm
                  text-white
                "
                title="Charge Date / Payment Amount is Missing"
                style="cursor: not-allowed"
                v-if="
                  !props.row.charge &&
                  (!props.row.charge_date || props.row.amount <= 0)
                "
              >
                Charge now
              </a>

              <a
                v-if="
                  !props.row.charge &&
                  props.row.charge_date &&
                  props.row.amount > 0
                "
                class="
                  btn-radius btn btn-primary
                  text-white
                  btn-sm
                  d-inline-block
                "
                @click.prevent="
                  () => {
                    charge(props.row);
                  }
                "
              >
                Charge now
              </a>

              <a
                v-if="!props.row.charge"
                class="
                  btn-radius btn btn-primary
                  text-white
                  btn-sm
                  d-inline-block
                  ml-2
                "
                @click.prevent="
                  () => {
                    sendReminder(props.row);
                  }
                "
              >
                Remind
              </a>

              <!-- <a
                v-b-tooltip.hover
                class="o-hidden d-inline-block c-pointer"
                title="Charge Date / Payment Amount is Missing"
                v-if="
                  !props.row.charge &&
                  (!props.row.charge_date || props.row.amount <= 0)
                "
              >
                <i class="i-Start text-25 text-danger mr-2"></i>
              </a> -->

              <!-- <a
                v-b-tooltip.hover
                class="o-hidden d-inline-block c-pointer"
                title="Charge Now"
                v-if="
                  !props.row.charge &&
                  props.row.charge_date &&
                  props.row.amount > 0
                "
              >
                <i
                  class="i-Start text-25 text-info mr-2"
                  @click="
                    () => {
                      charge(props.row);
                    }
                  "
                ></i>
              </a>
              <a
                v-b-tooltip.hover
                class="o-hidden d-inline-block c-pointer"
                title="Send Reminder"
                v-if="!props.row.charge"
              >
                <i
                  class="i-Clock-Forward text-25 text-info mr-2"
                  @click="sendReminder(props.row)"
                ></i>
              </a> -->
            </span>
            <span v-else-if="props.column.field == 'amount'">
              {{ props.row.amount ? `$${props.row.amount}` : "" }}
            </span>
            <span v-else-if="props.column.field == 'invoice_preview'">
              <a class="o-hidden d-inline-block" v-if="props.row.invoice_url">
                <a
                  class="btn-radius btn btn-primary text-white btn-sm"
                  variant="primary"
                  :href="props.row.invoice_url"
                  target="_blank"
                >
                  View
                </a>
              </a>
            </span>
            <span
              v-else-if="props.column.field == 'charge'"
              class="d-block text-center"
            >
              <b-badge
                variant="success"
                class="text-white p-1"
                v-if="title === 'Completed' && props.row.charge"
                >Charged</b-badge
              >

              <b-badge
                variant="light"
                class="text-white p-1"
                 v-else-if="title === 'Pending' && !props.row.charge"
                >Scheduled</b-badge
              >

              <b-badge
                variant="danger"
                class="text-white p-1"
                v-else-if="title === 'Overdue'"
                >Failed</b-badge
              >

              <!-- <i
                class="fa fa-check-circle-o fa-2x text-success"
                aria-hidden="true"
                v-if="title === 'Completed' && props.row.charge"
                title="Card Charged"
                v-b-tooltip.hover
              ></i>
              <i
                class="fa fa-clock-o fa-2x text-light"
                aria-hidden="true"
                v-else-if="title === 'Pending' && !props.row.charge"
                title="Card charge is scheduled"
                v-b-tooltip.hover
              ></i>
              <i
                class="fa fa-times-circle-o fa-2x text-danger"
                aria-hidden="true"
                v-else-if="title === 'Overdue'"
                title="Card charge failed"
                v-b-tooltip.hover
              ></i> -->
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["title", "list"],
  data() {
    return {
      columns: [
        {
          label: "Name",
          field: "full_name",
        },
        {
          label: "Charge Date",
          field: "charge_date",
        },
        {
          label: "Payment Amount",
          field: "amount",
        },
        // {
        //   label: "Status",
        //   field: "status",
        // },
        {
          label: "Charge Status",
          field: "charge",
        },
        {
          label: "Invoice Preview",
          field: "invoice_preview",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
    };
  },
  computed: mapGetters(["getPayments", "getSelectedTab"]),
  methods: {
    ...mapActions(["setRecord", "chargeNow", "remindPatient"]),

    charge(data) {
      this.chargeConfirmationPopup().then((result) => {
        if (result.value) {
          this.chargeNow(data);
        }
      });
    },

    sendReminder(data) {
      this.reminderConfirmationPopup().then((result) => {
        if (result.value) {
          this.remindPatient(data);
        }
      });
    },

    chargeConfirmationPopup() {
      return this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, charge now!",
      });
    },

    reminderConfirmationPopup() {
      return this.$swal({
        title: "Are you sure?",
        text: "It will generate and send invoice to patient.",
        type: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, send now!",
      });
    },
  },
};
</script>