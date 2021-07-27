<template>
  <vue-perfect-scrollbar
    class="sidebar-panel rtl-ps-none ps scroll"
    @mouseleave.native="
      sidebarCompact();
      returnSelectedParentMenu();
    "
    @mouseenter.native="removeSidebarCompact"
    :class="{
      'vertical-sidebar-compact': getVerticalCompact.isSidebarCompact,
      'sidebar-full-collapse': getVerticalSidebar.isMobileCompact,
    }"
    :settings="{ suppressScrollX: true, wheelPropagation: false }"
  >
    <div
      class="
        gull-brand
        text-center
        d-flex
        align-items-center
        pl-2
        mb-4
        justify-content-center
      "
    >
      <img class="logo" src="@/assets/images/new-logo.png" />
    </div>

    <div class="close-mobile-menu" @click="mobileSidebar">
      <i class="text-16 text-primary i-Close-Window font-weight-bold"></i>
    </div>

    <div class="mt-5 main-menu">
      <div class="nav-menu">
        <ul class="ul-vertical-sidebar pl-4" id="menu">
          <li class="hover-menu" v-for="menu in sideMenu" :key="menu.title">
            <div>
              <router-link
                tag="a"
                class="has-arrow"
                :to="menu.redirectTo"
                :class="{
                  active: selectedParentMenu === menu.selectedParentMenu,
                }"
              >
                <i
                  :class="`${menu.icon} text-23 mr-2 icon font-weight-bold`"
                  v-b-popover.hover.right="menu.title"
                ></i>
                <span
                  class="text-14"
                  :class="{
                    'vertical-item-name': getVerticalCompact.isItemName,
                  }"
                  >{{ menu.title }}</span
                >
              </router-link>
            </div>
          </li>
        </ul>
      </div>

      <div class="sidenav-bottom">
        <div class="dropdown">
          <b-dropdown
            id="dropdown-1"
            right
            text="Right align"
            class="m-md-2 user col align-self-end"
            toggle-class="text-decoration-none"
            no-caret
            variant="button"
          >
            <template slot="button-content">
              <img
                src="@/assets/images/faces/0.png"
                id="userDropdown"
                alt
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              />
              <span>{{
                (loggedInUser && loggedInUser.full_name) || "Guest"
              }}</span>
              <i class="i-Arrow-Down"></i>
            </template>

            <div class="dropdown-menu-right" aria-labelledby="userDropdown">
              <div class="dropdown-header">
                {{ (loggedInUser && loggedInUser.full_name) || "Guest" }}
              </div>
              <!-- <a class="dropdown-item">Profile Update</a>
              <a class="dropdown-item">Change Password</a> -->
              <a class="dropdown-item" href="#" @click.prevent="logoutUser"
                >Sign out</a
              >
            </div>
          </b-dropdown>
        </div>
      </div>
    </div>
  </vue-perfect-scrollbar>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  computed: {
    ...mapGetters(["getVerticalCompact", "getVerticalSidebar", "loggedInUser"]),
  },
  data() {
    return {
      selectedParentMenu: "",
      sideMenu: [
        {
          title: "Claims",
          selectedParentMenu: "claims",
          icon: "i-Calendar-4",
          redirectTo: "/app/claims",
        },
        {
          title: "Payments",
          selectedParentMenu: "payments",
          icon: "i-Money-2",
          redirectTo: "/app/payments",
        },
        {
          title: "Patients",
          selectedParentMenu: "patients",
          icon: "i-Checked-User",
          redirectTo: "/app/patients",
        },
        {
          title: "Users",
          selectedParentMenu: "users",
          icon: "i-Love-User",
          redirectTo: "/app/users",
        },
        {
          title: "Insights",
          selectedParentMenu: "insights",
          icon: "i-Bar-Chart",
          redirectTo: "/app/insights",
        },
      ],
    };
  },
  mounted() {
    // console.log(`this.loggedInUser`, this.loggedInUser);
    this.toggleSelectedParentMenu();
    document.addEventListener("click", this.returnSelectedParentMenu);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.returnSelectedParentMenu);
  },
  methods: {
    ...mapActions([
      "signOut",
      "switchSidebar",
      "sidebarCompact",
      "removeSidebarCompact",
      "mobileSidebar",
    ]),

    toggleSelectedParentMenu() {
      const currentParentUrl = this.$route.path
        .split("/")
        .filter((x) => x !== "")[1];
      if (currentParentUrl !== undefined || currentParentUrl !== null) {
        this.selectedParentMenu = currentParentUrl.toLowerCase();
      } else {
        this.selectedParentMenu = "daily-huddle";
      }
    },
    returnSelectedParentMenu() {
      this.toggleSelectedParentMenu();
    },
    logoutUser() {
      this.signOut();
      setTimeout(() => {
        this.$router.push("/signIn");
      }, 600);
    },
  },
};
</script>
<style>
.logo {
  max-width: 100px;
}
</style>