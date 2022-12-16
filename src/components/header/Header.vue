<template>
  <div class="navbar-shadow card-bg p-4">
    <div class="container">
      <div class="d-flex flex-row justify-content-between align-items-stretch">
        <div>
          <p class="weight-800 font-18 nun-bold custom-color p-0 m-0">Where is the world?</p>
        </div>
        <div style="cursor: pointer" @click="dark = !dark" class="d-flex gap-2 custom-color">
          <span class="material-icons font-10">dark_mode</span>
          <span>{{dark ? 'dark' : 'light'}} mode</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Header",
  data() {
    return {
      dark: false,
      root: null
    }
  },
  mounted() {
    this.root = document.documentElement
    this.darkMode()
  },
  methods: {
    darkMode() {
      console.log(this.dark)
      if (this.dark) {
        this.root.style.setProperty('--background', 'rgba(33, 45, 54,1)')
        this.root.style.setProperty('--text', 'rgba(255, 255, 255,1)')
        this.root.style.setProperty('--card-background', 'rgba(43, 56, 67,1)')
      } else {
        this.root.style.setProperty('--background', 'rgba(250, 250, 250,1)')
        this.root.style.setProperty('--text', 'rgba(0, 0, 0,100)')
        this.root.style.setProperty('--card-background', 'rgba(255, 255, 255,1)')
      }
    },
  },
  watch: {
    dark(value) {
      this.darkMode()
      this.$emit('dark',value)
    }
  }

})
</script>

<style scoped>

</style>