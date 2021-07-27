<template>
  <div
    class="auth-layout-wrap"
    :style="{ backgroundImage: 'url(' + bgImage + ')' }"
  >
    <div class="auth-content">
      <div class="card o-hidden">
        <div class="row">
          <div class="col-md-6">
            <div class="p-4">
              <div class="auth-logo text-center mb-30 c-pointer">
                <img :src="logo" @click="$router.push('/')" />
              </div>
              <h1 class="mb-3 text-18">Sign In</h1>
              <b-form @submit.prevent="formSubmit">
                <b-form-group label="Email Address" class="text-12">
                  <b-form-input
                    class="form-control-rounded"
                    type="text"
                    v-model="email"
                    email
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Password" class="text-12">
                  <b-form-input
                    class="form-control-rounded"
                    type="password"
                    v-model="password"
                  ></b-form-input>
                </b-form-group>

                <!-- <b-button block to="/" variant="primary btn-rounded mt-2"
                  >Sign In</b-button
                > -->
                <b-button
                  type="submit"
                  tag="button"
                  class="btn-rounded btn-block mt-2"
                  variant="primary mt-3"
                  :disabled="loading"
                >
                  Sign In
                  <span v-if="loading">...</span>
                </b-button>
                <!-- <div v-once class="typo__p" v-if="loading">
                  <div class="spinner sm spinner-primary mt-3"></div>
                </div> -->
                <b-button
                  to="signUp"
                  block
                  variant="primary mt-2"
                  class="btn-rounded"
                  >Create an account</b-button
                >
              </b-form>

              <div class="mt-3 text-center">
                <router-link to="forgot" tag="a" class="text-muted">
                  <u>Forgot Password?</u>
                </router-link>
              </div>
            </div>
          </div>

          <b-col
            md="6"
            class="text-center"
            style="backgroundsize: cover"
            :style="{ backgroundImage: 'url(' + signInImage + ')' }"
          >
            <div class="pr-3 auth-right">
              <router-link
                to="signUp"
                class="
                  btn
                  btn-rounded
                  btn-outline-primary
                  btn-outline-email
                  btn-block
                  btn-icon-text
                "
                href="signup.html"
              >
                <i class="i-Mail-with-At-Sign"></i> Sign up with Email
              </router-link>
              <a
                class="
                  btn
                  btn-rounded
                  btn-outline-primary
                  btn-outline-google
                  btn-block
                  btn-icon-text
                "
              >
                <i class="i-Google-Plus"></i> Sign up with Google
              </a>
              <a
                class="
                  btn
                  btn-rounded
                  btn-outline-primary
                  btn-block
                  btn-icon-text
                  btn-outline-facebook
                "
              >
                <i class="i-Facebook-2"></i> Sign up with Facebook
              </a>
            </div>
          </b-col>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { signIn } from "./APICalls";
export default {
  name: "signIn",
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "SignIn",
  },
  data() {
    return {
      email: "",
      password: "",
      userId: "",
      bgImage: require("@/assets/images/photo-wide-4.jpg"),
      logo: require("@/assets/images/new-logo.png"),
      signInImage: require("@/assets/images/photo-long-3.jpg"),
    };
  },
  computed: {
    validation() {
      return this.userId.length > 4 && this.userId.length < 13;
    },
    ...mapGetters(["loggedInUser", "loading", "error"]),
  },

  methods: {
    ...mapActions(["login", "setUser"]),
    formSubmit() {
      if (this.email === "devin@gmail.com" && this.password === "devin@123") {
        const userInfo = {
          authenticatedUser: { id: "123", name: "Devin" },
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo)); // store the token in localstorage
        setTimeout(() => {
          this.$router.push("/app/delta-dental");
          this.makeToast("success", "Login successfully!");
        }, 1000);
      } else {
        this.makeToast("danger", "Invalid login credentials");
      }
      // signIn({ email: this.email, password: this.password })
      //   .then((resp) => {
      //     console.log(`resp signin`, resp);
      //     if (resp && resp.status === 200) {
      //       this.setUser(resp.data.authenticatedUser);
      //       const userInfo = {
      //         access: resp.data.access,
      //         refresh: resp.data.refresh,
      //         authenticatedUser: resp.data.authenticatedUser,
      //       };
      //       localStorage.setItem("userInfo", JSON.stringify(userInfo)); // store the token in localstorage
      //       setTimeout(() => {
      //         this.$router.push("/app/delta-dental");
      //         this.makeToast("success", resp.data.message);
      //       }, 1000);
      //     } else {
      //       this.makeToast("danger", "Invalid login credentials");
      //     }
      //   })
      //   .catch((error) => {
      //     this.makeToast("danger", "Invalid login credentials");
      //     localStorage.removeItem("userInfo"); // if the request fails, remove any possible user token if possible
      //   });
    },
    makeToast(variant = null, msg) {
      this.$bvToast.toast(msg, {
        title: ` ${variant || "default"}`,
        variant: variant,
        solid: true,
      });
    },
  },
  watch: {
    loggedInUser(val) {
      if (val && val.access) {
        this.makeToast("success", "Successfully Logged In");
        setTimeout(() => {
          this.$router.push({ name: "HomePageDashboard" });
        }, 500);
      }
    },
    error(val) {
      if (val != null) {
        this.makeToast("warning", val.message);
      }
    },
  },
};
</script>

<style>
.spinner.sm {
  height: 2em;
  width: 2em;
}
</style>
