<template>
    <Header/>
  <div class="container">
    <div class="my-5">
      <button @click="goBack" class="px-4 py-2 card-bg custom-color border d-flex gap-3 radius-5 box-shadow">
        <span class="material-icons-round">arrow_back</span>
        <span class="">Back</span>
      </button>
    </div>
    <div class="row d-flex align-items-center">
      <div class="col-12 col-lg-6 p-lg-e-5">
        <img class="img-fluid" :src="country?.flag" :alt="country?.name">
      </div>
      <div class="col-12 col-lg-6 p-5">
        <h3 class="nun-bold custom-color mb-4">{{country?.name}}</h3>
        <div class="d-flex flex-column flex-lg-row">
          <div class="w-50 flex-wrap">
            <p class="nun-bold weight-600 custom-color">nativeName:   <span class="nun-reg">{{ country?.nativeName }}</span></p>
            <p class="nun-bold weight-600 custom-color">population:   <span class="nun-reg">{{ country?.population }}</span></p>
            <p class="nun-bold weight-600 custom-color">region:   <span class="nun-reg">{{ country?.region }}</span></p>
            <p class="nun-bold weight-600 custom-color">subregion:   <span class="nun-reg">{{ country?.subregion }}</span></p>
            <p class="nun-bold weight-600 custom-color">capital:   <span class="nun-reg">{{ country?.capital }}</span></p>
          </div>
          <div class="w-50">
            <p class="nun-bold weight-600 custom-color">topLevelDomain:   <span class="nun-reg">{{ country?.region }}</span></p>
            <p class="nun-bold weight-600 custom-color">subregion:   <span class="nun-reg">{{ country?.subregion }}</span></p>
            <p class="nun-bold weight-600 custom-color">capital:   <span class="nun-reg">{{ country?.capital }}</span></p>
          </div>
        </div>
        <div v-if="country.borders" class="">
          <p class="custom-color pe-2">Border Countries:</p>
          <div class="d-flex">
            <div class="pe-1" v-for="(borderCountry, index) in country.borders" :key="index">
              <span class="box-shadow border px-3 card-bg custom-color">{{borderCountry}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import Header from '../../components/header/Header.vue'
import axiosFunctions from '../../services/axios/axios'

export default defineComponent({
  name: "Country",
  components:{Header},
  data(){
    return{
      country:{},
    }
  },
  mounted() {
    this.getCountries()
  },
  setup() {
    const {axiosGet} = axiosFunctions
    return {axiosGet}
  },
  methods:{
    async getCountries(){
      const url = `/name/${this.$route.params.name}`
      const response = await this.axiosGet({url})
      this.country = response.data.data[0]
      console.log(this.country)
    },
    goBack() {
      this.$router.push({name:'Main'})
    },
  },

})
</script>

<style scoped>

</style>