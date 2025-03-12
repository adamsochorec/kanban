<script setup>
import { RouterLink } from "vue-router";
import { useAuth } from "../modules/users";
const auth = useAuth();
// import useUsers from '../modules/users'
// const { isAuthenticated, logIn, logOut } = useUsers()
</script>
<template>
  <nav style="display: flex; gap: 1rem">
    <Button variant="link" asChild v-slot="slotProps">
      <router-link
        to="/pizzas"
        :class="slotProps.class"
        style="text-decoration: underline; cursor: pointer"
        >Tasks</router-link
      >
    </Button>
    <div v-if="!auth.isAuthenticated.value">
      <Button
        label="Log in"
        outlined
        icon="pi pi-user"
        @click="auth.logIn()"
      ></Button>
    </div>
    <div v-else>
      <Button label="Log out" outlined icon="pi pi-user" @click="auth.logOut()">
      </Button>
    </div>
    <Button
      icon="pi pi-github"
      as="a"
      variant="text"
      class="nolink"
      size="large"
      severity="contrast"
      href="https://github.com/adamsochorec/kanban"
      target="_blank"
      rel="noopener noreferrer nofollow"
    ></Button>
  </nav>
</template>
