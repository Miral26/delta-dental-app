<template>
  <div class="d-flex align-items-center">
    <div class="form-group">
      <input
        type="file"
        id="file"
        ref="file"
        v-on:change="handleFileUpload()"
      />
    </div>

    <button v-on:click="submitFile()" class="btn btn-primary">Submit</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  /* Defines the data used by the component */
  data() {
    return {
      file: "",
    };
  },

  methods: {
    /* Submits the file to the server */
    submitFile() {
      /* Initialize the form data */
      let formData = new FormData();

      /* Add the form data we need to submit */
      formData.append("file", this.file);

      /* Make the request to the POST /single-file URL */
      axios
        .post("attachments/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function () {
          console.log("SUCCESS!!");
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },

    /* Handles a change on the file upload */
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
  },
};
</script>