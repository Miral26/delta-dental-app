<template>
  <div>
    <div id="sq-ccbox" v-show="show">
      <form id="payment-form" novalidate action="#" method="POST">
        <b-row>
          <b-col>
            <div class="row">
              <div class="col-md-12">
                <b-form-group class="mb-3">
                  <b-form-input
                    type="text"
                    v-model="customerCardForm.holder_name"
                    required
                    placeholder="Card Holder Name"
                  ></b-form-input>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <b-form-group class="mb-3">
                  <!-- <b-form-input
                    type="text"
                    v-model="customerCardForm.card_number"
                    required
                    placeholder="Card Number"
                  ></b-form-input> -->
                  <div :id="id + '-sq-card-number'" class="form-control"></div>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 col-lg-4">
                <b-form-group class="mb-3">
                  <!-- <b-form-input
                    type="text"
                    v-model="customerCardForm.expiry_date"
                    required
                    placeholder="MM/YY"
                  ></b-form-input> -->
                  <div
                    :id="id + '-sq-expiration-date'"
                    class="form-control"
                  ></div>
                </b-form-group>
              </div>
              <div class="col-md-4 col-lg-4">
                <b-form-group class="mb-3">
                  <!-- <b-form-input
                    type="password"
                    v-model="customerCardForm.cvv"
                    required
                    placeholder="CVV"
                  ></b-form-input> -->
                  <div :id="id + '-sq-cvv'" class="form-control"></div>
                </b-form-group>
              </div>
              <div class="col-md-4 col-lg-4">
                <b-form-group class="mb-3">
                  <!-- <b-form-input
                    type="text"
                    v-model="customerCardForm.postal"
                    placeholder="Postal"
                    required
                  ></b-form-input> -->
                  <div :id="id + '-sq-postal-code'" class="form-control"></div>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4 col-lg-4">
                <b-form-group class="mb-3">
                  <b-form-input
                    type="text"
                    v-model="customerCardForm.country"
                    placeholder="Country"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-4 col-lg-4">
                <b-form-group class="mb-3">
                  <b-form-input
                    type="text"
                    v-model="customerCardForm.first_name"
                    placeholder="First Name"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
              <div class="col-md-4 col-lg-4">
                <b-form-group class="mb-3">
                  <b-form-input
                    type="text"
                    v-model="customerCardForm.last_name"
                    placeholder="Last Name"
                    required
                  ></b-form-input>
                </b-form-group>
              </div>
            </div>
          </b-col>
        </b-row>

        <div v-if="errors.length" class="text-danger mt-3">
          <h4 for="errors" class="font-weight-bold">Errors</h4>
          <ul class="pl-4">
            <li class="error" v-for="error in errors" :key="error.message">
              {{ error }}
            </li>
          </ul>
        </div>

        <b-row class="mt-3">
          <b-col>
            <b-button
              size="sm"
              class="btn-radius"
              variant="primary"
              @click="requestCardNonce($event)"
            >
              Submit
            </b-button>
            <b-button
              size="sm"
              class="btn-radius ml-2"
              variant="primary"
              @click="$bvModal.hide('customer-card-add')"
            >
              Cancel
            </b-button>
          </b-col>
        </b-row>
      </form>
    </div>
    <p v-show="!show">Loading...</p>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "PaymentForm",
  data: function () {
    return {
      errors: [],
      masterpass: false,
      applePay: false,
      show: false,
      customerCardForm: {
        card_number: "",
        expiry_date: "",
        cvv: "",
        postal: "",
        holder_name: "",
        country: "",
        first_name: "",
        last_name: "",
      },
    };
  },
  props: {
    id: Number,
  },

  computed: {
    ...mapGetters(["getSelectedRecord", "getSelectedLocation"]),
  },

  mounted: function () {
    // console.log(this.getSelectedLocation.id);

    // let locationId = process.env.VUE_APP_SQUARE_APP_ID;
    let locationId = this.getSelectedLocation.id;
    let applicationId = process.env.VUE_APP_SQUARE_APP_ID;
    let that = this;

    this.paymentForm = new SqPaymentForm({
      autoBuild: false,
      applicationId: applicationId,
      locationId: locationId,
      inputClass: "sq-input",
      // Initialize the payment form elements

      // Customize the CSS for SqPaymentForm iframe elements
      inputStyles: [
        {
          //   fontSize: ".9em"
        },
      ],

      // Initialize the credit card placeholders
      cardNumber: {
        elementId: that.id + "-sq-card-number",
        placeholder: "Card number",
      },
      cvv: {
        elementId: that.id + "-sq-cvv",
        placeholder: "CVV",
      },
      expirationDate: {
        elementId: that.id + "-sq-expiration-date",
        placeholder: "MM / YY",
      },
      postalCode: {
        elementId: that.id + "-sq-postal-code",
        placeholder: "Zip Code",
      },

      // SqPaymentForm callback functions
      callbacks: {
        /*
         * callback function: methodsSupported
         * Triggered when: the page is loaded.
         */
        methodsSupported: function (methods) {
          // Only show the button if Apple Pay for Web is enabled
          // Otherwise, display the wallet not enabled message.
          //   that.applePay = methods.applePay;
          //   that.masterpass = methods.masterpass;
        },

        /*
         * Digital Wallet related functions
         */
        createPaymentRequest: function () {
          var paymentRequestJson;
          /* ADD CODE TO SET/CREATE paymentRequestJson */
          return paymentRequestJson;
        },
        validateShippingContact: function (contact) {
          var validationErrorObj;
          /* ADD CODE TO SET validationErrorObj IF ERRORS ARE FOUND */
          return validationErrorObj;
        },

        /*
         * callback function: cardNonceResponseReceived
         * Triggered when: SqPaymentForm completes a card nonce request
         */
        cardNonceResponseReceived: function (errors, nonce, cardData) {
          if (errors) {
            errors.forEach(function (error) {
              that.errors.push(error.message);
            });
            return;
          }
          // Assign the nonce value to the hidden form field
          //   document.getElementById("card-nonce").value = nonce;

          // POST the nonce form to the payment processing page
          that.onSubmit(nonce, cardData);
        },
        /*
         * callback function: paymentFormLoaded
         * Triggered when: SqPaymentForm is fully loaded
         */
        paymentFormLoaded: function () {
          // console.log("paymentFormLoaded");
          that.show = true;
          /* HANDLE AS DESIRED */
        },
      },
    });

    this.paymentForm.build();

    // add form initial values for edit call
    this.customerCardForm.holder_name = this.getSelectedRecord.holder_name;
  },

  methods: {
    ...mapActions(["addCard"]),

    requestCardNonce(event) {
      // Don't submit the form until SqPaymentForm returns with a nonce
      event.preventDefault();

      // Request a nonce from the SqPaymentForm object
      this.paymentForm.requestCardNonce();
    },

    onSubmit(nonce, cardData) {
      // send nonce to server
      axios
        .post(`insurance-claims/${this.id}/cards/`, {
          name: this.customerCardForm.holder_name,
          postal_code: cardData.billing_postal_code,
          card_last_digit: cardData.last_4,
          exp_month: cardData.exp_month,
          exp_year: cardData.exp_year,
          card_nonce: nonce,
          active: true,
          claim: this.id,
        })
        .then((response) => {
          // console.log("Res: "+ response);
          if (response.data.id) {
            // hide model
            this.$bvModal.hide("customer-card-add");
            this.addCard(response.data);
            this.resetForm();
          }
        })
        .catch((error) => {
          // console.log("Err: "+ error)
          //  this.makeToast("error", "Error! try again.");
        });
    },

    makeToast(variant = null, msg) {
      this.$bvToast.toast(msg, {
        title: ` ${variant || "default"}`,
        variant: variant,
        solid: true,
      });
    },

    resetForm() {
      this.customerCardForm = {
        card_number: "",
        expiry_date: "",
        cvv: "",
        postal: "",
        holder_name: "",
        country: "",
        first_name: "",
        last_name: "",
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
