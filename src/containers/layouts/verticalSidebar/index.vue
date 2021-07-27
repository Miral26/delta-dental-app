<template>
  <div class="app-admin-wrap layout-sidebar-vertical clearfix sidebar-full">
    <verticalSidebar />
    <main>
      <div
        class="
          main-content-wrap
          mt-0
          bg-off-white
          d-flex
          flex-column flex-grow-1
        "
        :class="{
          'vertical-sidebar': getVerticalSidebar.isVerticalSidebar,
          compact: getVerticalSidebar.isVerticalCompact,
        }"
      >
        <verticalTopbar />

        <transition name="page" mode="out-in" v-if="getSelectedLocation">
          <router-view />
        </transition>
        <div v-else>
          No location found, please go to square dashboard and add their to
          continue.
        </div>
        <div class="flex-grow-1"></div>
        <!-- <appFooter /> -->
      </div>
    </main>
  </div>
</template>
<script>
import verticalSidebar from "./verticalSidebar";
import verticalTopbar from "./verticalTopbar";
import appFooter from "../common/footer";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "VerticalSidebar",
  components: {
    verticalSidebar,
    verticalTopbar,
    appFooter,
  },
  computed: {
    ...mapGetters(["getVerticalSidebar", "getSelectedLocation"]),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["setLocations"]),
  },
  mounted() {
    this.setLocations();
  },
};
</script>