<template>
  <div>
    <div id="sq-ccbox" class="py-4">
      <b-row>
        <b-col
          lg="6"
          class="d-flex justify-content-center align-items-center mb-5 mb-lg-0"
        >
          <div
            class="card px-4 py-3"
            style="
              background-color: #6cdcd4;
              box-shadow: 0px 20px 20px #ccc;
              pointer-events: none;
            "
          >
            <p class="text-right font-weight-bold" style="font-size: 26px">
              VISA
            </p>
            <div class="mt-4" style="font-size: 24px">1456 1298 6574 1287</div>
            <div
              class="d-flex justify-content-between mt-3"
              style="font-size: 18px"
            >
              <span class="truncate">{{
                customerCardForm.holder_name
                  ? customerCardForm.holder_name
                  : "JACK SPARROW"
              }}</span>
              <span>02/25</span>
            </div>
          </div>
        </b-col>
        <b-col>
          <div class="payment-form-placeholder" v-show="!show">
            <div
              class="spinner-bubble spinner-bubble-primary m-5"
              style="color: #6cdcd4"
            ></div>
          </div>
          <form
            id="payment-form"
            novalidate
            action="#"
            method="POST"
            class="mx-md-3 ml-lg-0 mr-lg-3"
          >
            <b-row>
              <b-col>
                <div class="row">
                  <div class="col-12">
                    <h4>Payment Details</h4>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <b-form-group class="mb-3" label="Name on Card">
                      <b-form-input
                        type="text"
                        v-model="customerCardForm.holder_name"
                        required
                        placeholder="JACK SPARROW"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <b-form-group class="mb-3" label="Card Number">
                      <div
                        :id="id + '-sq-card-number'"
                        class="form-control"
                      ></div>
                    </b-form-group>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4 col-lg-4">
                    <b-form-group class="mb-3" label="Valid Through">
                      <div
                        :id="id + '-sq-expiration-date'"
                        class="form-control"
                      ></div>
                    </b-form-group>
                  </div>
                  <div class="col-md-4 col-lg-4">
                    <b-form-group class="mb-3" label="CVV">
                      <div :id="id + '-sq-cvv'" class="form-control"></div>
                    </b-form-group>
                  </div>
                  <div class="col-md-4 col-lg-4">
                    <b-form-group class="mb-3" label="Postal Code">
                      <div
                        :id="id + '-sq-postal-code'"
                        class="form-control"
                      ></div>
                    </b-form-group>
                  </div>
                </div>
              </b-col>
            </b-row>

            <b-row v-if="errors.length" class="text-danger">
              <b-col>
                <h4 for="errors" class="font-weight-bold">Errors</h4>
                <ul class="pl-4">
                  <li
                    class="error"
                    v-for="error in errors"
                    :key="error.message"
                  >
                    {{ error }}
                  </li>
                </ul>
              </b-col>
            </b-row>

            <b-row class="mt-3">
              <b-col>
                <b-button
                  size="sm"
                  class="btn-radius"
                  variant="primary"
                  @click="requestCardNonce($event)"
                  >Submit</b-button
                >
                <b-button
                  size="sm"
                  class="btn-radius ml-2"
                  variant="primary"
                  @click="$bvModal.hide('patient-card-add')"
                  >Cancel</b-button
                >
              </b-col>
            </b-row>
          </form>
        </b-col>
      </b-row>
    </div>
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
      },
    };
  },
  props: {
    id: Number,
  },

  computed: {
    ...mapGetters(["getSelectedRecord", "getSelectedLocation"]),
  },

  mounted() {
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
        placeholder: "1456 1298 6574 1287",
      },
      cvv: {
        elementId: that.id + "-sq-cvv",
        placeholder: "123",
      },
      expirationDate: {
        elementId: that.id + "-sq-expiration-date",
        placeholder: "02/25",
      },
      postalCode: {
        elementId: that.id + "-sq-postal-code",
        placeholder: "123456",
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
    // this.customerCardForm.holder_name = this.getPatientData.holder_name;
  },

  methods: {
    ...mapActions(["addCard"]),

    requestCardNonce(event) {
      // Don't submit the form until SqPaymentForm returns with a nonce
      event.preventDefault();
      this.errors = [];

      // Request a nonce from the SqPaymentForm object
      this.paymentForm.requestCardNonce();
    },

    async onSubmit(nonce, cardData) {
      let data = {
        name: this.customerCardForm.holder_name,
        postal_code: cardData.billing_postal_code,
        card_last_digit: cardData.last_4,
        exp_month: cardData.exp_month,
        exp_year: cardData.exp_year,
        card_nonce: nonce,
        active: true,
        patient: this.id,
      };
      // send nonce to server
      axios
        .post(`patient/${this.id}/cards/`, data)
        .then((response) => {
          // console.log("Res: "+ response);
          if (response.data.id) {
            // hide model
            this.$bvModal.hide("patient-card-add");
            this.addCard(response.data);
            this.resetForm();
          }
        })
        .catch((error) => {
          // console.log("Err: ", error);
          this.makeToast("danger", "This is not a valid card. Please modify the details before adding to account.");
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
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
}
.payment-form-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
</style>
