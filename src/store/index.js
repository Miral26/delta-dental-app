import Vuex from "vuex";
import Vue from "vue";
import largeSidebar from "./modules/largeSidebar";
import compactSidebar from "./modules/compactSidebar";
import config from "./modules/config";
import authData from "./modules/authData";
import claim from "./modules/claim";
import verticalSidebar from "./modules/verticalSidebar";
import location from "./modules/location";
import patient from "./modules/patient";
import card from "./modules/card";

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    largeSidebar,
    compactSidebar,
    config,
    authData,
    verticalSidebar,
    claim,
    location,
    patient,
    card,
  },
});
