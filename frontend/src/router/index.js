import { createRouter, createWebHistory } from "vue-router";
import index from "@/views/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: index,
    },

    {
      path: "/pizzas",
      name: "pizzas",
      component: () => import("@/views/task-overview.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/pizzas/:id/edit",
      name: "pizzas single",
      component: () => import("@/views/task.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

// Navigation guard that runs before each route change
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = localStorage.getItem("user");
  console.log("is auth", isAuthenticated);
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  console.log("requires auth", requiresAuth);

  // If the route requires authentication and the user is not authenticated, redirect to the home page
  if (!isAuthenticated && requiresAuth) {
    next("/");
  } else {
    next();
  }
});

export default router;
