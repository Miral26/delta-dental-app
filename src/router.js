import Vue from "vue";
import store from "./store";
// import {isMobile} from "mobile-device-detect";
import Router from "vue-router";
import authenticate from "./auth/authenticate";
import unAuthenticate from "./auth/unAuthenticate";

Vue.use(Router);

import AppView from './views/app/index.vue'
import VerticalSidebar from './containers/layouts/verticalSidebar'
// import Landing from './containers/layouts/landing/landing.vue'
// import Contact from './containers/layouts/contact/contact.vue'
// import BookAppointment from './views/app/virtual-consults/virtual-consults.vue'
import DeltaDental from './views/app/delta-dental/delta-dental.vue'
import Payments from './views/app/payments/payments.vue'
import Patients from './views/app/patients/patients.vue'
import Users from './views/app/users/users.vue'
import Insights from './views/app/insights/insights.vue'
import signIn from './views/app/sessions/signIn'
import signUp from './views/app/sessions/signUp.vue'
// import forgot from './views/app/sessions/forgot.vue'
// import ResetPassword from './views/app/sessions/ResetPassword.vue'

function route(name, path, component, meta = {}, children = []) {
  return { name, path, component, meta, children }
}

// create new router
const routes = [
  {
    path: "/",
    beforeEnter: unAuthenticate,
    // component: Landing,
    redirect: "/signIn"
  },
  // {
  //   path: "/contact",
  //   name: "Contact",
  //   component: Contact,
  // },
  // {
  //   path: "/book-appointment",
  //   name: "Book Appointment",
  //   component: BookAppointment,
  // },
  {
    path: "/signIn",
    name: "Authentication",
    beforeEnter: unAuthenticate,
    component: signIn,
  },
  {
    path: "/signUp",
    // name: "Authentication",
    beforeEnter: unAuthenticate,
    component: signUp,
  },
  // {
  //   path: "/forgot",
  //   name: "Authentication",
  //   beforeEnter: unAuthenticate,
  //   component: forgot,
  // },
  // {
  //   path: "/reset-password",
  //   name: "Authentication",
  //   beforeEnter: unAuthenticate,
  //   component: ResetPassword,
  // },
  {
    path: "/app",
    name: "HomePageDashboard",
    component: AppView,
    beforeEnter: authenticate,
    redirect: "./app/claims",
    children: [
      {
        path: "/app/claims",
        component: DeltaDental,
      },
      {
        path: "/app/payments",
        component: Payments,
      },
      {
        path: "/app/patients",
        component: Patients,
      },
      {
        path: "/app/users",
        component: Users,
      },
      {
        path: "/app/insights",
        component: Insights,
      },
    ]
  },
  route("vertical-sidebar", 'vertical-sidebar', VerticalSidebar),
  {
    path: "*",
    component: () => import("./views/app/pages/notFound")
  }
];

const router = new Router({
  mode: "history",
  linkActiveClass: "open",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});


router.afterEach(() => {
  // Remove initial loading
  const preLoading = document.getElementById("page-loader");
  if (preLoading) {
    preLoading.classList.add('hide')
  }
  // Complete the animation of the route progress bar.
  // if (isMobile) {
  if (window.innerWidth <= 1200) {
    // console.log("mobile");
    store.dispatch("changeSidebarProperties");
    if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
      store.dispatch("changeSecondarySidebarProperties");
    }

    if (store.getters.getCompactSideBarToggleProperties.isSideNavOpen) {
      store.dispatch("changeCompactSidebarProperties");
    }
  } else {
    if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
      store.dispatch("changeSecondarySidebarProperties");
    }

    // store.state.sidebarToggleProperties.isSecondarySideNavOpen = false;
  }
});

export default router;
