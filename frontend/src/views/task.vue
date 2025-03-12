<script setup>
import { ref, onMounted, reactive } from "vue";
import todocrud from "../modules/todocrud";
import { Form } from "@primevue/forms";
import { useToast } from "primevue/usetoast";
import { FormField } from "@primevue/forms";

const { editPizza, state, GetSpecificPizza, pizza, pizzaID } = todocrud();
const toast = useToast();
const initialValues = ref({
  newTask: "",
  newTodoDescription: "",
  newTodoTime: "",
  newTodoStatus: "",
});
onMounted(() => {
  GetSpecificPizza(pizzaID.value);
});

const resolver = ({ values }) => {
  const errors = {};

  if (!values.newTask) {
    errors.newTask = [{ message: "newTask is required." }];
  }

  if (!values.newTodoDescription) {
    errors.newTodoDescription = [
      { message: "newTodoDescription is required." },
    ];
  }

  if (!values.newTodoTime) {
    errors.newTodoTime = [{ message: "newTodoTime is required." }];
  }
  if (!values.newTodoStatus) {
    errors.newTodoStatus = [{ message: "newTodoStatus is required." }];
  }

  return {
    errors,
  };
};

const submitForm = ({ valid }) => {
  if (valid) {
    editPizza();
    toast.add({
      severity: "success",
      summary: "Form is submitted.",
      life: 3000,
    });
  }
};
</script>

<template>
  <div class="card flex justify-center">
    <Toast />
    <Form
      v-slot="$form"
      :initialValues="initialValues"
      :resolver="resolver"
      @submit="submitForm"
      :validateOnValueUpdate="false"
      :validateOnBlur="true"
      class="totodetail flex flex-col gap-4 w-full sm:w-56"
    >
      <h1>Edit</h1>
      <FloatLabel variant="in" class="flex flex-col gap-1">
        <InputText name="newTask" type="text" v-model="state.newTask" fluid />
        <label for="newTask">Name</label>
      </FloatLabel>
      <Message
        v-if="$form.newTask?.invalid"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.newTask.error.message }}</Message
      >

      <FloatLabel variant="in" class="flex flex-col gap-1">
        <InputNumber
          name="newTodoTime"
          type="number"
          v-model="state.newTodoTime"
          fluid
        />
        <label for="newTodoTime">Duration</label>
      </FloatLabel>
      <Message
        v-if="$form.newTodoTime?.invalid"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.newTodoTime.error.message }}</Message
      >
      <FloatLabel variant="in" class="flex flex-col gap-1">
        <Textarea
          name="newTodoDescription"
          type="text"
          fluid
          v-model="state.newTodoDescription"
          :formControl="{ validateOnValueUpdate: true }"
        />
        <label for="newTodoDescription">Description</label>
      </FloatLabel>
      <Message
        v-if="$form.newTodoDescription?.invalid"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.newTodoDescription.error.message }}</Message
      >
      <div class="status">
        <p><u>Status:</u></p>
        <label for="waiting">
          <input
            type="radio"
            id="waiting"
            value="Waiting"
            :formControl="{ validateOnValueUpdate: true }"
            v-model="state.newTodoStatus"
          />
          Waiting</label
        ><br />
        <label for="doing">
          <input
            type="radio"
            id="doing"
            value="Doing"
            :formControl="{ validateOnValueUpdate: true }"
            v-model="state.newTodoStatus"
          />
          Doing</label
        ><br />
        <label for="done"
          ><input
            type="radio"
            id="done"
            :formControl="{ validateOnValueUpdate: true }"
            value="Done"
            v-model="state.newTodoStatus"
          />
          Done</label
        >
        <Message
          v-if="$form.newTodoStatus?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.newTodoStatus.error.message }}</Message
        >
      </div>
      <Button
        severity="danger"
        label="Cancel"
        icon="pi pi-times"
        @click="$router.go(-1)"
      ></Button>
      <Button type="submit" severity="success" label="Save" icon="pi pi-check">
      </Button>
    </Form>
  </div>
</template>

<style lang="scss" scoped></style>
