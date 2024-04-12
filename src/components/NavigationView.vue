<script setup>
import { RouterLink } from "vue-router";
import { useAuth } from "../modules/users";

const auth = useAuth();

// import useUsers from '../modules/users'

// const { isAuthenticated, logIn, logOut } = useUsers()
</script>
<template>
  <nav>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/todos">Projects</RouterLink>
    <!-- changed path -->
  </nav>

  <div v-if="!auth.isAuthenticated.value">
    <button class="login" @click="auth.logIn()">Log in</button>
  </div>
  <div v-else>
    <button class="login" @click="auth.logOut()">Log Out</button>
  </div>
  <p>{{ auth.isAuthenticated }}</p>
</template>
