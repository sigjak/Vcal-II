<template>
  <div>
    <h5 class="display-3 test text-center text-light mt-5">Select:</h5>
    <div class="container">
      <div class="wrapper border border-light rounded py-3">
        <div class="row justify-content-center">
          <div class="col-md-4 d-flex justify-content-around mt-2 p-0">
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'instruments',
                  params: { unit: 'Microprobe', table: 'probeuse' }
                }"
              >Microprobe</router-link>
            </div>
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'instruments',
                  params: { unit: 'Thin sections', table: 'thin_sections' }
                }"
              >Thin sections</router-link>
            </div>
          </div>

          <div class="col-md-4 d-flex justify-content-around mt-2 px-0">
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'ampm',
                  params: { unit: 'SEM', table: 'sem' }
                }"
              >SEM</router-link>
            </div>
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'ampm',
                  params: { unit: 'FTIR', table: 'ftir' }
                }"
              >FTIR</router-link>
            </div>
          </div>

          <div class="col-md-4 d-flex justify-content-around mt-2 p-0">
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'instruments',
                  params: { unit: 'ICP MS', table: 'icpms' }
                }"
              >ICP MS</router-link>
            </div>
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'instruments',
                  params: { unit: 'ICP OES', table: 'icpoes' }
                }"
              >ICP OES</router-link>
            </div>
            <!--
              

               <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'instruments',
                  params: { unit: 'ICP MS', table: 'icpms' }
                }"
              >
                ICP MS</router-link
              >
            </div>-->
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-4 d-flex justify-content-around mt-2 p-0">
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'instruments',
                  params: { unit: 'MassSpec AES', table: 'massaes' }
                }"
              >MassSpec AES</router-link>
            </div>
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'instruments',
                  params: { unit: 'IC 1000', table: 'ic1000' }
                }"
              >IC 1000</router-link>
            </div>
          </div>
          <div class="col-md-4 d-flex justify-content-around mt-2 p-0">
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'instruments',
                  params: { unit: 'IC 2000', table: 'ic2000' }
                }"
              >IC 2000</router-link>
            </div>
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'cars',
                  params: { unit: 'Viking A', table: 'viking_a' }
                }"
              >Viking A</router-link>
            </div>
          </div>
          <div class="col-md-4 d-flex justify-content-around mt-2 p-0">
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'cars',
                  params: { unit: 'Viking B', table: 'viking_b' }
                }"
              >Viking B</router-link>
            </div>
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'cars',
                  params: { unit: 'Warrior', table: 'warrior' }
                }"
              >Warrior</router-link>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-4 d-flex justify-content-around mt-2 p-0">
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'cars',
                  params: { unit: 'Open Trailer', table: 'opentrailer' }
                }"
              >Open Trailer</router-link>
            </div>
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'cars',
                  params: { unit: 'Closed Trailer', table: 'closedtrailer' }
                }"
              >Closed Trailer</router-link>
            </div>
          </div>
          <div class="col-md-4 d-flex justify-content-around mt-2 p-0">
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'cars',
                  params: { unit: 'Small Trailer', table: 'smalltrailer' }
                }"
              >Small Trailer</router-link>
            </div>
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'houses',
                  params: { unit: 'First Aid', table: 'firstaid' }
                }"
              >First Aid</router-link>
            </div>
          </div>
          <div class="col-md-4 d-flex justify-content-around mt-2 p-0">
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'houses',
                  params: { unit: 'Gas Detectors', table: 'gasdetect' }
                }"
              >Gas Detectors</router-link>
            </div>
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'houses',
                  params: { unit: 'Iridium Sat Phones', table: 'iridium' }
                }"
              >IR Sat Phones</router-link>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-4 d-flex justify-content-around mt-2 p-0">
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'cars',
                  params: { unit: 'Red Hilux', table: 'red_hilux' }
                }"
              >Red Hilux</router-link>
            </div>
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'cars',
                  params: { unit: 'Blue Hilux', table: 'blue_hilux' }
                }"
              >Blue Hilux</router-link>
            </div>
          </div>
          <div class="col-md-4 d-flex justify-content-around mt-2 p-0">
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'houses',
                  params: { unit: 'Dyngja', table: 'dyngja' }
                }"
              >Dyngja</router-link>
            </div>
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'houses',
                  params: { unit: 'Helluhraun', table: 'helluhraun' }
                }"
              >Helluhraun</router-link>
            </div>
          </div>
          <div class="col-md-4 d-flex justify-content-around mt-2 p-0">
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'houses',
                  params: { unit: 'Víðimelur', table: 'vidimelur' }
                }"
              >Víðimelur</router-link>
            </div>
            <div>
              <button class="btn btn-primary">Storage</button>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-4 d-flex justify-content-around mt-2 p-0">
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'instruments',
                  params: { unit: 'ICP-OES-II', table: 'icpoes2' }
                }"
              >ICP-OES II</router-link>
            </div>
            <div>
              <router-link
                class="btn btn-primary"
                :to="{
                  name: 'instruments',
                  params: { unit: 'MC-ICP-MS', table: 'mcicpms' }
                }"
              >MC-ICP-MS</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn {
  width: 100px;
  font-size: 11px !important;

  padding-left: 0px !important;
  padding-right: 0px !important;
}

.wrapper {
  max-width: 800px;
  margin-top: 5% !important;
  padding-left: 30px;
  padding-right: 30px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 768px) {
  .test {
    font-size: 2.5rem;
  }
}
</style>
