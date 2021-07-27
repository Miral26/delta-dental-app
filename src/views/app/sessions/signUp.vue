<template>
  <!--  -->
  <div
    :style="{ backgroundImage: 'url(' + bgImage + ')' }"
    class="auth-layout-wrap"
  >
    <div class="auth-content">
      <div class="card o-hidden">
        <div class="row">
          <div
            class="col-md-6 text-center"
            style="background-size: cover"
            :style="{ backgroundImage: 'url(' + signInImage + ')' }"
          >
            <div class="pl-3 auth-right">
              <div class="auth-logo text-center mt-4 c-pointer">
                <img :src="logo" alt="" @click="$router.push('/')" />
              </div>
              <div class="flex-grow-1"></div>
              <div class="w-100 mb-30">
                <router-link
                  to="signIn"
                  class="
                    btn
                    btn-outline-primary
                    btn-outline-email
                    btn-block
                    btn-icon-text
                    btn-rounded
                  "
                  href="signin.html"
                >
                  <i class="i-Mail-with-At-Sign"></i> Sign in with Email
                </router-link>
                <a
                  class="
                    btn
                    btn-outline-primary
                    btn-outline-google
                    btn-block
                    btn-icon-text
                    btn-rounded
                  "
                >
                  <i class="i-Google-Plus"></i> Sign in with Google
                </a>
                <a
                  class="
                    btn
                    btn-outline-primary
                    btn-outline-facebook
                    btn-block
                    btn-icon-text
                    btn-rounded
                  "
                >
                  <i class="i-Facebook-2"></i> Sign in with Facebook
                </a>
              </div>
              <div class="flex-grow-1"></div>
            </div>
          </div>

          <b-col md="6">
            <div class="p-4">
              <h1 class="mb-3 text-18">Sign Up</h1>
              <b-form @submit.prevent="submit">
                <b-form-group label="Your First Name">
                  <b-form-input
                    class="form-control form-control-rounded"
                    label="Name"
                    v-model.trim="$v.fName.$model"
                  >
                  </b-form-input>

                  <b-alert
                    show
                    variant="danger"
                    class="error col mt-1"
                    v-if="!$v.fName.minLength"
                    >Name must have at least
                    {{ $v.fName.$params.minLength.min }} letters.</b-alert
                  >
                </b-form-group>

                <b-form-group label="Your Last Name">
                  <b-form-input
                    class="form-control form-control-rounded"
                    label="Name"
                    v-model.trim="$v.lName.$model"
                  >
                  </b-form-input>
                </b-form-group>

                <b-form-group label="Email">
                  <b-form-input
                    class="form-control form-control-rounded"
                    label="Name"
                    type="email"
                    v-model="email"
                  >
                  </b-form-input>
                </b-form-group>

                <b-form-group label="Password">
                  <b-form-input
                    class="form-control form-control-rounded"
                    label="Name"
                    type="password"
                    v-model.trim="$v.password.$model"
                  >
                  </b-form-input>

                  <b-alert
                    show
                    variant="danger"
                    class="error col mt-1"
                    v-if="!$v.password.minLength"
                    >Minimum
                    {{ $v.password.$params.minLength.min }} charaters.</b-alert
                  >
                </b-form-group>

                <b-form-group label="Repeat Password">
                  <b-form-input
                    class="form-control form-control-rounded"
                    label="Name"
                    type="password"
                    v-model.trim="$v.repeatPassword.$model"
                  >
                  </b-form-input>

                  <b-alert
                    show
                    variant="danger"
                    class="error col mt-1"
                    v-if="!$v.repeatPassword.sameAsPassword"
                    >Passwords must be identical.</b-alert
                  >
                </b-form-group>

                <b-button
                  type="submit"
                  block
                  variant="primary"
                  :disabled="submitStatus === 'PENDING' || $v.$invalid"
                  class="btn-rounded"
                  >Sign Up</b-button
                >
                <p v-once class="typo__p" v-if="submitStatus === 'OK'">
                  {{ makeToastTwo("success") }}
                </p>
                <p v-once class="typo__p" v-if="submitStatus === 'ERROR'">
                  {{ makeToast("danger") }}
                </p>
                <div v-once class="typo__p" v-if="submitStatus === 'PENDING'">
                  <div class="spinner sm spinner-primary mt-3"></div>
                </div>

                <div class="mt-3 text-center">
                  <router-link to="signIn" tag="a" class="text-muted">
                    <u>Back to Sign In</u>
                  </router-link>
                </div>
              </b-form>
            </div>
          </b-col>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
import { signUp } from "./APICalls";
export default {
  name: "siginUp",
  metaInfo: {
    title: "SignUp",
  },

  data() {
    return {
      fName: "",
      lName: "",
      email: "",
      password: "",
      repeatPassword: "",
      bgImage: require("@/assets/images/photo-wide-4.jpg"),
      logo: require("@/assets/images/new-logo.png"),
      signInImage: require("@/assets/images/photo-long-3.jpg"),
      submitStatus: null,
    };
  },

  validations: {
    fName: {
      required,
      minLength: minLength(4),
    },
    lName: {},
    password: {
      required,
      minLength: minLength(5),
    },
    repeatPassword: {
      sameAsPassword: sameAs("password"),
    },

    // add input
    // peopleAdd: {
    //   required,
    //   minLength: minLength(3),
    //   $each: {
    //     multipleName: {
    //       required,
    //       minLength: minLength(5)
    //     }
    //   }
    // },
    // validationsGroup:['peopleAdd.multipleName']
  },

  computed: {
    ...mapGetters(["loggedInUser", "loading", "error"]),
  },

  methods: {
    ...mapActions(["signUserUp"]),
    //   validate form
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        signUp({
          first_name: this.fName,
          last_name: this.lName,
          email: this.email,
          password1: this.password,
          password2: this.repeatPassword,
        })
          .then((resp) => {
            console.log(`resp`, resp);
            console.log(`resp.response`, resp.response);
            if (resp && resp.status === 200) {
              this.makeToast("success", resp.data.message);
              this.$router.push("/signIn");
            }
          })
          .catch((err) => {
            if (err && err.response && err.response.data) {
              localStorage.removeItem("userInfo"); // if the request fails, remove any possible user token if possible
              this.makeToast("danger", JSON.stringify(err.response.data));
            }
            localStorage.removeItem("userInfo"); // if the request fails, remove any possible user token if possible
          });
      }
    },
    makeToast(variant = null, msg = "Please fill the form correctly.") {
      this.$bvToast.toast(msg, {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true,
      });
    },
    makeToastTwo(variant = null) {
      this.$bvToast.toast("Successfully Created Account", {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true,
      });
    },

    inputSubmit() {
      console.log("submitted");
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


