import "./assets/style.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// PrimeVue
import PrimeVue from "primevue/config";
import PrimeVueTheme from "@primevue/themes/aura";
import { definePreset } from "@primevue/themes";
import "primeicons/primeicons.css";

const app = createApp(App);

app.use(router);

const slavicmedia = definePreset(PrimeVueTheme, {
  semantic: {
    primary: {
      50: "{gray.50}",
      100: "{gray.100}",
      200: "{gray.200}",
      300: "{gray.300}",
      400: "{gray.400}",
      500: "{gray.500}",
      600: "{gray.600}",
      700: "{gray.700}",
      800: "{gray.800}",
      900: "{gray.900}",
      950: "{gray.950}",
    },
  },
});

app.use(PrimeVue, {
  theme: {
    preset: slavicmedia,
    options: {
      prefix: "p",
      darkModeSelector: ".my-app-dark",
      cssLayer: false,
    },
  },
});

// Mount the app to the element with the id 'app'
app.mount("#app");
