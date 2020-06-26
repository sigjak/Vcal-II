<template>
  <div>
    <div class="form-group">
      <label class="text-white col-form-label  ">Full Name</label>
      <input
        type="text"
        :class="{ 'is-invalid': $v.userData.fullname.$invalid }"
        class="form-control "
        id="fullname"
        placeholder="Enter Full Name"
        v-model.trim="userData.fullname"
      />
      <div class="invalid-feedback">
        Full name required
      </div>
    </div>
    <div class="row form-group">
      <div class="col-md-6">
        <label for="email" class=" text-white col-form-label">Email</label>
        <input
          type="email"
          :class="{ 'is-invalid': $v.userData.email.$invalid }"
          class="form-control"
          id="email"
          placeholder="Email"
          v-model.trim="userData.email"
        />
        <div class="invalid-feedback">
          Email required.
        </div>
      </div>
      <div class="col-md-6">
        <label for="repeatEmail" class="text-white col-form-label"
          >Verify Email</label
        >
        <input
          type="email"
          class="form-control"
          id="repeatEmail"
          placeholder="Verify email"
          :class="{ 'is-invalid': $v.userData.repeatEmail.$invalid }"
          v-model.trim="userData.repeatEmail"
        />
        <div
          v-if="$v.userData.repeatEmail.$invalid && !$v.userData.email.$invalid"
          class="invalid-feedback"
        >
          Verification required.
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class=" text-light ">Account</label>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">101</span>
        </div>
        <input
          type="text"
          :class="{ 'is-invalid': $v.userData.account.$invalid }"
          class="form-control"
          id="account"
          placeholder="This account willl be charged!"
          v-model.trim="userData.account"
        />
        <div class="invalid-feedback">
          Account required.
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class=" text-light ">Supervisor</label>

      <input
        type="text"
        class="form-control"
        id="supervisor"
        placeholder="...if applicable"
        v-model.trim="userData.supervisor"
      />
    </div>

    <div class="form-group">
      <label class="text-light ">Comments</label>
      <textarea
        class="form-control "
        :class="{ 'is-invalid': $v.userData.comments.$invalid }"
        :placeholder="plholder"
        id="comments"
        cols="30"
        rows="5"
        v-model.trim="userData.comments"
      ></textarea>
      <div class="invalid-feedback">
        Some basic info...
      </div>
    </div>

    <div class="row">
      <div class="col-2">
        <input
          type="submit"
          value="Submit"
          class="btn btn-primary"
          :disabled="$v.userData.$invalid || userData.dates.length <= 0"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { sameAs, email, required, minLength } from "vuelidate/lib/validators";

export default {
  props: ["userData", "kind"],

  validations: {
    userData: {
      status: {
        required,
        minLength: minLength(1)
      },
      fullname: {
        required,
        minLength: minLength(5)
      },
      email: {
        required,
        email
      },
      repeatEmail: {
        required,
        email,
        sameAsEmail: sameAs("email")
      },
      account: {
        required,
        moLength: minLength(4)
      },
      comments: {
        required,
        minLength: minLength(6)
      }
    }
  },
  computed: {
    plholder() {
      let pl =
        "Provide some basic info on travel, destination, how to contact GSM mobile etc.";
      switch (this.kind) {
        case "instrument":
          pl =
            "Provide info on what is to be analyzed, number of samples, sample preparations etc.";
          break;
        case "vidimelur":
          pl =
            "Further information as needed and where to send the invoice if applicable";
          break;
        case "thin_sections":
          pl = "Provide info on sample comp, when needed etc.";
          break;
      }
      return pl;
    }
  }
};
</script>
