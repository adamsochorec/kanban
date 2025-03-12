<script setup>
import { ref, onMounted } from "vue";
import CreateTask from "@/components/create-task.vue";
import todocrud from "@/modules/todocrud";

const { state, GetAllPizzas, deletePizza, editPizza } = todocrud();
const isDataLoaded = ref(false);

onMounted(async () => {
  await GetAllPizzas();
  isDataLoaded.value = true;
});
</script>

<template>
  <div
    style="
      display: grid;
      overflow: hidden;
      grid-template-columns: 75% 25%;
      grid-gap: 3rem;
    "
  >
    <ScrollPanel style="width: 100%; height: 80vh">
      <div
        style="
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 1rem;
        "
        v-if="isDataLoaded"
      >
        <Card
          v-for="pizza in state.pizzas"
          :key="pizza._id"
          :class="{
            'pizza-item': true,
            waiting: pizza.status === 'Waiting',
            doing: pizza.status === 'Doing',
            done: pizza.status === 'Done',
          }"
        >
          <template #title> {{ pizza.task }}</template>
          <template #content>
            <u>Duration</u>: {{ pizza.time }} h<br />
            <u>Status</u>: {{ pizza.status }}<br />
            <u>Description</u>: {{ pizza.description }}
          </template>
          <template #footer>
            <div style="display: flex; justify-content: space-between">
              <Button @click="editPizza(pizza.id)" asChild v-slot="slotProps">
                <RouterLink
                  class="nolink"
                  :to="`/pizzas/${pizza.id}`"
                  :class="slotProps.class"
                  ><i class="pi pi-pencil"></i
                ></RouterLink>
              </Button>
              <Button
                severity="danger"
                @click="deletePizza(pizza)"
                icon="pi pi-trash"
              ></Button>
            </div>
          </template>
        </Card>
      </div>
      <div
        style="
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 1rem;
        "
        v-if="isDataLoaded"
      ></div>
      <div
        v-else
        style="
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 1rem;
        "
      >
        <div
          v-for="n in 6"
          :key="n"
          class="rounded"
          style="
            border: 0.5px solid var(--p-inputtext-hover-border-color);
            padding: var(--grid-gap-3);
          "
        >
          <Skeleton
            width="70%"
            height="1rem"
            style="margin-bottom: var(--grid-gap-1)"
          ></Skeleton>
          <Skeleton
            width="100%"
            height="6rem"
            style="margin-bottom: var(--grid-gap-1)"
          ></Skeleton>
          <div style="display: flex; justify-content: space-between">
            <Skeleton
              width="20%"
              height="2rem"
              style="margin-bottom: var(--grid-gap-1)"
            ></Skeleton>
            <Skeleton
              width="20%"
              height="2rem"
              style="margin-bottom: var(--grid-gap-1)"
            ></Skeleton>
          </div>
        </div>
      </div>
    </ScrollPanel>
    <CreateTask v-if="isDataLoaded"></CreateTask>
    <div v-else>
      <Skeleton
        width="70%"
        height="1rem"
        style="margin-bottom: var(--grid-gap-1)"
      ></Skeleton>
      <Skeleton
        width="100%"
        height="1rem"
        style="margin-bottom: var(--grid-gap-1)"
      ></Skeleton>
      <Skeleton
        width="40%"
        height="1rem"
        style="margin-bottom: var(--grid-gap-3)"
      ></Skeleton>
      <Skeleton
        width="100%"
        height="5rem"
        style="margin-bottom: var(--grid-gap-1)"
      ></Skeleton>
      <Skeleton
        width="100%"
        height="1rem"
        style="margin-bottom: var(--grid-gap-1)"
      ></Skeleton>
    </div>
  </div>
</template>
<style scoped>
.pizza-item {
  &.waiting {
    background-color: var(--p-rose-950);
  }
  &.doing {
    background-color: var(--p-emerald-900);
  }
  &.done {
    background-color: var(--p-amber-900);
  }
}
</style>
