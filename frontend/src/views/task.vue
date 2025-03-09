<script setup>
import { ref, onMounted } from "vue";
import todocrud from "../modules/todocrud";
import { Form } from "@primevue/forms";

const { editPizza, state, GetSpecificPizza, pizza, pizzaID } = todocrud();

onMounted(() => {
  GetSpecificPizza(pizzaID.value);
});

const submitForm = () => {
  editPizza();
};
</script>

<template>
  <Toast />
  <Form @submit.prevent="submitForm" class="totodetail">
    <Card
      ><template #header>
        <h1>Edit</h1>
      </template>
      <template #content>
        <InputText required type="text" v-model="state.newTask" />
        <InputText type="text" required v-model="state.newTodoDescription" />
        <InputNumber type="number" required v-model="state.newTodoTime" />
        <div class="status">
          <p><u>Status:</u></p>
          <label for="waiting">
            <input
              required
              type="radio"
              id="waiting"
              value="Waiting"
              v-model="state.newTodoStatus"
            />
            Waiting</label
          ><br />
          <label for="doing">
            <input
              required
              type="radio"
              id="doing"
              value="Doing"
              v-model="state.newTodoStatus"
            />
            Doing</label
          ><br />
          <label for="done"
            ><input
              required
              type="radio"
              id="done"
              value="Done"
              v-model="state.newTodoStatus"
            />
            Done</label
          ><br /></div
      ></template>
      <template #footer>
        <Button
          severity="danger"
          label="Cancel"
          icon="pi pi-times"
          @click="$router.go(-1)"
        ></Button>
        <Button
          type="submit"
          severity="success"
          label="Save"
          icon="pi pi-check"
          @click="editPizza()"
        >
        </Button></template
    ></Card>
  </Form>
</template>

<style lang="scss" scoped></style>
