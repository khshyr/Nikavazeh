<template>
  <Header @dark="dark=$event"/>
  <div class="container">
    <div class="d-flex justify-content-between flex-lg-row row mb-2">
      <div class="col-12 col-lg-5 my-4 my-lg-4">
        <div class="input-group">
          <input v-model="searchQuery" id="search" type="search" class="form-control rounded form-control-lg card-bg"
                 placeholder="Search for a country..." aria-label="Search" aria-describedby="search-addon" :style="{'background-image': 'url(' + `${ !dark ?'/images/search-icon-light.svg':'/images/search-icon-dark.svg'}` + ')' }"/>
        </div>
      </div>
      <div class="col-7 col-lg-3 my-2 my-lg-4">
        <div class="input-group">
          <Multiselect
              placeholder="Select a region"
              v-model="region"
              :options="options"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-lg-3 mb-5" v-for="(country, index) in searchedCountries" :key="index">
        <router-link :to="{name:'Country',params:{name:country.name}}"
                     class="card card-size border-0 card-bg rounded-0 shadow-sm" style="height: 25rem;">
          <div class="h-50 card-bg">
            <img style="object-fit: cover" class="h-75 w-100" :src="country.flag" :alt="country.name">
          </div>
          <div class="card-body h-50 card-bg">
            <h5 class="card-title nun-bold custom-color"><span></span>{{ country.name }}</h5>
            <p></p>
            <p class="card-text custom-color"><span class="nun-bold">Population:   </span>{{ country.population }}</p>
            <p class="card-text custom-color"><span class="nun-bold">Region:   </span>{{ country.region }}</p>
            <p class="card-text custom-color"><span class="nun-bold">Capital:   </span>{{ country.capital }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>

</template>

<script>
import {defineComponent} from 'vue'
import Header from '../../components/header/Header.vue'
import axiosFunctions from '../../services/axios/axios'
import Multiselect from '@vueform/multiselect'

export default defineComponent({
  name: "Main",
  components: {Header, Multiselect},
  data() {
    return {
      countries: [],
      searchQuery: '',
      searchedCountries: [],
      region: '',
      options: [
        'Africa',
        'Americas',
        'Asia',
        'Europe',
        'Oceania'
      ],
      dark:false
    }
  },
  mounted() {
    this.getCountries()
  },
  setup() {
    const {axiosGet} = axiosFunctions
    return {axiosGet}
  },
  methods: {
    goRoute(country) {
      const name = 'Country'
      this.$router.push({name, params: {name: country.name}})
    },
    async getCountries() {
      const url = '/all'
      const response = await this.axiosGet({url})
      this.countries = response.data.data
      console.log(this.countries)
      this.searchedCountries = this.countries
    },
    searchHandler() {
      if (!this.searchQuery) return this.sortHandler(this.countries)
      const results = []
      const search = this.searchQuery.toLowerCase()
      this.countries.map((item) => {
        const name = item.name.toLowerCase()
        if (name.indexOf(search) !== -1) results.push(item)
      })
      this.sortHandler(results)
    },
    sortHandler(countries) {
      if (!this.region) return this.searchedCountries = countries
      const results = []
      countries.map((item) => {
        if (item.region === this.region) {
          console.log(item)
          results.push(item)
        }
      })
      this.searchedCountries = results
    },

  },
  watch: {
    searchQuery(value) {
      this.searchHandler(value)
    },
    region() {
      this.searchHandler()
    },
  }
})
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>

</style>