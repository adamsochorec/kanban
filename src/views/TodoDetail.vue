<template lang="">
  <div class="totodetail">
    <div class="fifty-fifty">
      <h1>Editing</h1>
    </div>
    <hr />
    <br />
    <div class="fifty-fifty">
      <p>
        <u>Name:</u>
      </p>
      <input
        required
        type="text"
        v-model="pizza.task"
        @input="state.newPizzaName = $event.target.value"
      />
    </div>
    <br />
    <br />
    <hr />
    <br />
    <div class="fifty-fifty">
      <p>
        <u>Description:</u>
      </p>
      <input
        type="text"
        required
        v-model="pizza.description"
        @input="state.description = $event.target.value"
      />
    </div>
    <br />
    <br />
    <hr />
    <br />
    <div class="fifty-fifty">
      <p>
        <u>Time: (hours)</u>
      </p>
      <input
        type="number"
        required
        v-model="pizza.time"
        @input="state.newTodoDuration = $event.target.value"
      />
    </div>
    <br />
    <hr />
    <br />
    <div id="buttons">
      <button id="cancel" @click="$router.go(-1)">Cancel</button>
      <button id="saveChanges" @click="editPizza()">Save changes</button>
    </div>
  </div>
</template>
<script>
import todocrud from "../modules/todocrud";
import { onMounted } from "vue";
export default {
  setup() {
    const { editPizza, state, GetSpecificPizza, pizza, pizzaID } = todocrud();

    onMounted(() => {
      GetSpecificPizza(pizzaID.value);
    });
    return {
      pizza,
      pizzaID,
      GetSpecificPizza,
      editPizza,
      state,
    };
  },
};
</script>
<style lang="scss" scoped></style>
