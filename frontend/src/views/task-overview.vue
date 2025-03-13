<script setup>
import { ref, onMounted } from "vue";
import CreateTask from "@/components/create-task.vue";
import crud from "@/modules/crud";

const { state, getAllTasks, deleteTask, editTask } = crud();
const isDataLoaded = ref(false);

onMounted(async () => {
  await getAllTasks();
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
          v-for="task in state.tasks"
          :key="task._id"
          :class="{
            card: true,
            waiting: task.status === 'Waiting',
            doing: task.status === 'Doing',
            done: task.status === 'Done',
          }"
        >
          <template #title> {{ task.name }}</template>
          <template #content>
            <u>Duration</u>: {{ task.duration }} h<br />
            <u>Status</u>: {{ task.status }}<br />
            <u>Description</u>: {{ task.description }}
          </template>
          <template #footer>
            <div style="display: flex; justify-content: space-between">
              <Button @click="editTask(task.id)" asChild v-slot="slotProps">
                <RouterLink
                  class="nolink"
                  :to="`/tasks/${task.id}/edit`"
                  :class="slotProps.class"
                  ><i class="pi pi-pencil"></i>Edit</RouterLink
                >
              </Button>
              <Button
                label="Delete"
                @click="deleteTask(task)"
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
.card {
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
