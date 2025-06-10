<script setup>
import { RouterView } from "vue-router";
import NavigationView from "./components/NavBar.vue";
import { provideAuth } from "./modules/users";
import Footer from "@/components/Footer.vue";

provideAuth();
</script>

<template>
  <header
    style="
      height: 60px;
      position: absolute;
      top: 0;
      display: flex;
      left: 0;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      background-color: var(--p-zinc-900);
      padding: 0 var(--homepage-padding);
      border-bottom: 0.5px solid var(--p-inputtext-hover-border-color);
    "
  >
    <RouterLink to="/" class="nolink">
      <span style="font-family: var(--logo-font); font-size: 36px">Aba</span>
    </RouterLink>
    <NavigationView />
  </header>
  <main
    style="
      padding: 0 var(--homepage-padding);
      min-height: 82vh;
      margin-top: 6rem;
    "
  >
    <RouterView />
  </main>
  <Footer></Footer>
</template>
