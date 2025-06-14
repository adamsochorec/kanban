import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { PrimeVueResolver } from "@primevue/auto-import-resolver";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/

export default defineConfig({
  base: "/kanban/",
  plugins: [
    vue(),
    Components({
      resolvers: [PrimeVueResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    postcss: "./postcss.config.js",
    preprocessorOptions: {
      css: {
        additionalData: `@import "./src/assets/style.css";`,
      },
    },
  },
  optimizeDeps: {
    exclude: ["autoprefixer"],
  },
});
