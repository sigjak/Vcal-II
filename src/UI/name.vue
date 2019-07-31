<template>
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
</template>

<script>
export default {
  data() {
    return {
      userData: {
        fullname: ""
      }
    };
  }
};
</script>
