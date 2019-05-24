<template>
  <div>
    <img src="../images/header_01.png" class="img-fluid" />
    <h5 class="display-3 text-center mt-5">Select</h5>
    <div class="container  ">
      <div class="wrapper border boder-light rounded   p-4 ">
        <div class="row ">
          <div class="col-md-6 d-flex justify-content-around mt-2 p-0">
            <button class="btn btn-primary">Microprobe</button>
            <button class="btn  btn-primary">FTIR</button>
            <button class="btn btn-primary">SEM</button>
          </div>
          <div class="col-md-6 d-flex justify-content-around mt-2 p-0">
            <button class="btn btn-primary">Gas Detectors</button>
            <button class="btn btn-primary ">Víðimelur</button>
            <button class="btn btn-primary">Some text</button>
          </div>
        </div>
        <div class="row ">
          <div class="col-md-6 d-flex justify-content-around mt-2 p-0">
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'ampm',
                  params: { unit: 'Microprobe', table: 'probeuse' }
                }"
              >
                Microprobe</router-link
              >
            </div>
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'ampm',
                  params: { unit: 'FTIR', table: 'ftir' }
                }"
              >
                FTIR</router-link
              >
            </div>
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'ampm',
                  params: { unit: 'SEM', table: 'sem' }
                }"
              >
                SEM</router-link
              >
            </div>
          </div>
          <div class="col-md-6 d-flex justify-content-around mt-2 p-0">
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'ampm',
                  params: { unit: 'Thin sections', table: 'thin_sections' }
                }"
              >
                Thin sections</router-link
              >
            </div>
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'cars',
                  params: { unit: 'Blue Hilux', table: 'blue_hilux' }
                }"
              >
                Blue Hilux</router-link
              >
            </div>

            <button class="btn btn-primary">Some text</button>
          </div>
        </div>
        <div class="row ">
          <div class="col-lg-12 d-flex justify-content-around  mt-2 p-0">
            <button class=" btn btn-primary">Microprobe</button>
            <button class=" btn  btn-primary">FTIR</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.btn {
  width: 100px;
  font-size: 12px !important;
}

.wrapper {
  margin-top: 10% !important;
  max-width: 1200px;
}
</style>
