<script setup>
import { ref, onMounted } from "vue";
import crud from "../modules/crud";
import { Form } from "@primevue/forms";
import { useToast } from "primevue/usetoast";
import { FormField } from "@primevue/forms";

const { editTask, state, getSpecificTask, task, documentID } = crud();
const toast = useToast();
const initialValues = ref({
  newName: "",
  newDescription: "",
  newDuration: "",
  newStatus: "",
});

const isDataLoaded = ref(false);

onMounted(async () => {
  await getSpecificTask(documentID.value);
  state.newName = task.value.name;
  state.newDuration = task.value.duration;
  state.newDescription = task.value.description;
  state.newStatus = task.value.status;
  isDataLoaded.value = true;
});

const resolver = ({ values }) => {
  const errors = {};

  if (!values.newName) {
    errors.newName = [{ message: "Name is required." }];
  }

  if (!values.newDescription) {
    errors.newDescription = [{ message: "Description is required." }];
  }

  if (!values.newDuration) {
    errors.newDuration = [{ message: "Duration is required." }];
  }
  if (!values.newStatus) {
    errors.newStatus = [{ message: "Status is required." }];
  }

  return {
    errors,
  };
};

const submitForm = ({ valid }) => {
  if (valid) {
    editTask();
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
      class="totodetail flex flex-col gap-4 w-full sm:w-70"
      v-if="isDataLoaded"
    >
      <h1 class="mb-4">Edit</h1>
      <FormField
        v-slot="$field"
        name="newName"
        :initialValue="task.name"
        class="flex flex-col gap-1"
      >
        <FloatLabel variant="in">
          <InputText type="text" v-model="state.newName" fluid />
          <label for="newName">Name</label>
        </FloatLabel>
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>
      <FormField
        v-slot="$field"
        :initialValue="task.duration"
        name="newDuration"
        class="flex flex-col gap-1"
      >
        <FloatLabel variant="in">
          <InputNumber
            type="number"
            v-model="state.newDuration"
            fluid
            :useGrouping="false"
            suffix=" hours"
          />
          <label for="newDuration">Duration</label>
        </FloatLabel>
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>
      <FormField
        v-slot="$field"
        :initialValue="task.description"
        name="newDescription"
        class="flex flex-col gap-1"
      >
        <FloatLabel variant="in">
          <Textarea type="text" fluid v-model="state.newDescription" />
          <label for="newDescription">Description</label>
        </FloatLabel>
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>

      <div class="card flex flex-wrap justify-center gap-4">
        <RadioButtonGroup
          name="newStatus"
          v-model="state.newStatus"
          :initialValue="task.status"
          :formControl="{ validateOnValueUpdate: true }"
          class="card flex flex-wrap justify-center gap-4"
        >
          <div class="flex items-center gap-2">
            <RadioButton
              v-model="state.newStatus"
              inputId="status1"
              value="Waiting"
            />
            <label for="status1"> Waiting </label>
          </div>
          <div class="flex items-center gap-2">
            <RadioButton
              v-model="state.newStatus"
              inputId="status2"
              value="Doing"
            />
            <label for="status2"> Doing </label>
          </div>
          <div class="flex items-center gap-2">
            <RadioButton
              v-model="state.newStatus"
              inputId="status3"
              value="Done"
            />
            <label for="status3"> Done </label>
          </div>
        </RadioButtonGroup>
      </div>
      <Message
        v-if="$form.newStatus?.invalid"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.newStatus.error.message }}</Message
      >
      <div class="card flex justify-center">
        <ButtonGroup>
          <Button type="submit" label="Save" icon="pi pi-check"> </Button>

          <Button
            label="Cancel"
            icon="pi pi-times"
            @click="$router.go(-1)"
          ></Button
        ></ButtonGroup>
      </div>
    </Form>
    <div v-else class="flex flex-col gap-4 w-full sm:w-70">
      <h1 class="mb-4">Edit</h1>

      <Skeleton
        width="100%"
        height="2.5rem"
        style="margin-bottom: var(--grid-gap-1)"
      ></Skeleton>
      <Skeleton
        width="100%"
        height="2.5rem"
        style="margin-bottom: var(--grid-gap-1)"
      ></Skeleton>
      <Skeleton
        width="100%"
        height="5rem"
        style="margin-bottom: var(--grid-gap-1)"
      ></Skeleton>
      <div
        style="
          display: flex;
          justify-content: space-around;
          margin-bottom: var(--grid-gap-1);
        "
      >
        <Skeleton shape="circle" size="2rem"></Skeleton>
        <Skeleton shape="circle" size="2rem"></Skeleton>
        <Skeleton shape="circle" size="2rem"></Skeleton>
      </div>
      <div style="display: flex; justify-content: space-between">
        <Skeleton
          width="40%"
          height="2rem"
          style="margin-bottom: var(--grid-gap-1)"
        ></Skeleton>
        <Skeleton
          width="40%"
          height="2rem"
          style="margin-bottom: var(--grid-gap-1)"
        ></Skeleton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
