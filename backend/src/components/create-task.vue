<script setup>
import { ref, onMounted } from "vue";
import todocrud from "@/modules/todocrud";

const { state, GetAllPizzas, newTask } = todocrud();

const submitForm = async () => {
  await newTask();
  // Clear the form fields after submission
  state.newTask = "";
  state.newTodoDescription = "";
  state.newTodoTime = "";
  state.newTodoStatus = "";
};

onMounted(() => {
  GetAllPizzas();
});
</script>

<template>
  <form style="width: 100%" id="createTask" @submit.prevent="submitForm">
    <h3>Create a task</h3>
    <FloatLabel variant="in" style="width: 100%; margin: var(--grid-gap-1) 0">
      <InputText required v-model="state.newTask" class="input-field" />
      <label for="newTask">Name</label>
    </FloatLabel>
    <FloatLabel variant="in" style="margin: var(--grid-gap-1) 0">
      <InputNumber
        required
        :useGrouping="false"
        v-model="state.newTodoTime"
        suffix=" h"
      />
      <label for="newTodoTime">Duration</label>
    </FloatLabel>
    <FloatLabel variant="in" style="width: 100%; margin: var(--grid-gap-1) 0">
      <TextArea required v-model="state.newTodoDescription" />
      <label for="newTodoDescription">Description</label>
    </FloatLabel>
    <div style="display: flex; gap: 1rem; margin-bottom: var(--grid-gap-3)">
      <div>
        <RadioButton
          v-model="state.newTodoStatus"
          inputId="waiting"
          value="waiting"
        />
        <label for="waiting">Waiting</label>
      </div>
      <div>
        <RadioButton
          v-model="state.newTodoStatus"
          inputId="doing"
          value="doing"
        />
        <label for="doing">Doing</label>
      </div>
      <div>
        <RadioButton
          v-model="state.newTodoStatus"
          inputId="done"
          value="done"
        />
        <label for="done"> Done</label>
      </div>
    </div>
    <Button type="submit" label="Create" style="width: 100%"></Button>
  </form>
</template>
