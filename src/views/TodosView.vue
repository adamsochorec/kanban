<template>
  <div class="pizzas-container">
    <div
      v-for="pizza in state.pizzas"
      :key="pizza._id"
      :class="{
        'pizza-item': true,
        waiting: pizza.status === 'Waiting',
        doing: pizza.status === 'Doing',
        done: pizza.status === 'Done',
      }"
    >
      <router-link :to="`/pizzas/${pizza.id}`" class="pizza-link">
        <p>
          <u> {{ pizza.task }}</u>
        </p>
        <p>{{ pizza.description }}</p>
        <p><u>Time:</u> {{ pizza.time }} hours</p>
        <button @click="editPizza(pizza._id)" class="edit-btn">
          Update Todo
        </button>
      </router-link>
      <button @click="deletePizza(pizza)" class="delete-btn">
        Delete Todo
      </button>
      <div class="status">
        <p><u>Status:</u></p>
        <input
          type="radio"
          id="waiting-{{pizza._id}}"
          value="Waiting"
          v-model="pizza.status"
        />
        <label :for="'waiting-' + pizza._id">Waiting</label><br />
        <input
          type="radio"
          id="doing-{{pizza._id}}"
          value="Doing"
          v-model="pizza.status"
        />
        <label :for="'doing-' + pizza._id">Doing</label><br />
        <input
          type="radio"
          id="done-{{pizza._id}}"
          value="Done"
          v-model="pizza.status"
        />
        <label :for="'done-' + pizza._id">Done</label>
      </div>
    </div>
  </div>
  <div id="createTask">
    <h1>Create a Task</h1>
    <div class="input-container">
      <!--     <span>Test: {{ state.newAuthor }}</span> <br />
 -->

      <input
        required
        type="text"
        placeholder="Task"
        v-model="state.newPizza"
        class="input-field"
      />
    </div>
    <div class="input-container">
      <input
        required
        type="text"
        placeholder="Description"
        v-model="state.newTodoDescription"
        class="input-field"
      />
    </div>
    <div class="input-container">
      <input
        required
        type="text"
        placeholder="Duration in hours"
        v-model="state.newTodoDuration"
        class="input-field"
      />
    </div>
    <div class="input-container">
      <div class="status">
        <p><u>Status:</u></p>
        <input
          required
          type="radio"
          id="waiting"
          value="Waiting"
          v-model="state.newTodoStatus"
        />
        <label for="waiting">Waiting</label><br />
        <input
          required
          type="radio"
          id="doing"
          value="Doing"
          v-model="state.newTodoStatus"
        />
        <label for="doing">Doing</label><br />
        <input
          required
          type="radio"
          id="done"
          value="Done"
          v-model="state.newTodoStatus"
        />
        <label for="done">Done</label><br />
      </div>
      <button @click="newPizza()" class="new-pizza-btn">Create task</button>
    </div>
  </div>
</template>

<script>
import todocrud from "../modules/todocrud";
import { onMounted } from "vue";
export default {
  setup() {
    const { state, GetAllPizzas, newPizza, deletePizza, editPizza } =
      todocrud();

    onMounted(() => {
      GetAllPizzas();
    });

    return { state, GetAllPizzas, newPizza, deletePizza, editPizza };
  },
};
</script>

<style lang="scss" scoped>
.pizza-item {
  &.waiting {
    background-color: rgba(184, 65, 65, 0.7);
  }
  &.doing {
    background-color: rgba(65, 184, 131, 0.7);
  }
  &.done {
    background-color: rgba(65, 184, 131, 0.7);
  }
}
</style>
