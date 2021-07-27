<template>
  <div class="h-100">
    <div class="main-content table-list">
      <div class="wrapper">
        <vue-good-table
          :columns="columns"
          :line-numbers="true"
          :search-options="{
            enabled: true,
            placeholder: 'Search',
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
          :rows="rows"
        >
          <div slot="table-actions" class="mb-3">
            <b-button
              variant="primary"
              @click="
                () => {
                  $bvModal.show('add-location');
                }
              "
              class="btn-rounded d-sm-block d-none"
            >
              Add Location
            </b-button>
          </div>
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
                      if (result.value) removeCard(props.row);
                    })
                  "
                ></i>
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
import * as moment from "moment";
// const STORAGE_KEY = 'invoice';
export default {
  data() {
    return {
      moment,
      columns: [
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Phone",
          field: "phone",
        },
        {
          label: "City",
          field: "city",
        },
        {
          label: "Actions",
          field: "action",
        },
      ],
      rows: [
        {
          id: 1,
          name: "Locaion 1",
          phone: "+(0391) 895621",
          city: "New York",
        },
        {
          id: 2,
          name: "Locaion 2",
          phone: "+(0391) 895621",
          city: "New York 1",
        },
        {
          id: 3,
          name: "Locaion 3",
          phone: "+(0391) 895621",
          city: "New York 3",
        },
        {
          id: 4,
          name: "Locaion 4",
          phone: "+(0391) 895621",
          city: "New York 4",
        },
      ],
    };
  },
  computed: mapGetters([]),
  methods: {
    ...mapActions([]),
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