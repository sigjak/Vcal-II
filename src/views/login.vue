<template>
  <div>
    <div class="container">
      <div class="d-flex justify-content-center align-items-center  vport">
        <form class="border  border-primary rounded logBg pr-5 pl-1 py-2">
          <div class="form-group px-5 pt-5 row ">
            <label class="text-light col-3">login</label>
            <div class="col-9">
              <input
                type="text"
                class="form-control "
                :class="{ 'is-invalid': $v.login.$invalid }"
                v-model.trim="login"
              />
              <div class="invalid-feedback">Use staff login</div>
            </div>
          </div>

          <div class="form-group row px-5">
            <label class="text-light col-3">password</label>
            <div class="col-9">
              <input
                type="password"
                class="form-control"
                :class="{ 'is-invalid': $v.password.$invalid }"
                v-model.trim="password"
              />
              <div class="invalid-feedback">Use staff password</div>
            </div>
          </div>

          <div class="row">
            <div class="col-4"></div>
            <div class="col-8 ">
              <button
                class=" btn btn-sm btn-primary  mb-3"
                @click.prevent="$router.push('/select')"
                :disabled="$v.login.$invalid || $v.password.$invalid"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
const stafflog = value => value === "jhstaff";
const staffpass = value => value === "1staff23";
export default {
  data() {
    return {
      login: "",
      password: ""
    };
  },
  validations: {
    login: {
      required,
      stafflog
    },
    password: {
      required,
      staffpass
    }
  }
};
</script>

<style scoped>
label {
  display: inline-block !important;
}
.vport {
  height: 80vh;
}
</style>
