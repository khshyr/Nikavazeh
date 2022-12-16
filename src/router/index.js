import { createRouter, createWebHistory } from 'vue-router'
import Main from '../pages/main/Main.vue'
import Country from '../pages/country/Country.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main,
    },
    {
      path: "/country/:name",
      name: "Country",
      component: Country,
    },

  ],
});

export default router;
