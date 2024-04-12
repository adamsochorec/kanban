<template>
  <div class="todos-container">
    <div
      v-for="todo in state.todos"
      :key="todo._id"
      :class="{
        'todo-item': true,
        waiting: todo.status === 'Waiting',
        doing: todo.status === 'Doing',
        done: todo.status === 'Done',
      }"
    >
      <router-link :to="`/todo/${todo._id}`" class="todo-link">
        <p>{{ todo.id }}</p>
        <p>
          <u> {{ todo.task }}</u>
        </p>
        <p>{{ todo.description }}</p>
        <p><u>Time:</u> {{ todo.time }} hours</p>
        <button @click="editTodo(todo._id)" class="edit-btn">
          Update Todo
        </button>
      </router-link>
      <button @click="deleteTodo(todo._id)" class="delete-btn">
        Delete Todo
      </button>
      <div class="status">
        <p><u>Status:</u></p>
        <input
          type="radio"
          id="waiting-{{todo._id}}"
          value="Waiting"
          v-model="todo.status"
        />
        <label :for="'waiting-' + todo._id">Waiting</label><br />
        <input
          type="radio"
          id="doing-{{todo._id}}"
          value="Doing"
          v-model="todo.status"
        />
        <label :for="'doing-' + todo._id">Doing</label><br />
        <input
          type="radio"
          id="done-{{todo._id}}"
          value="Done"
          v-model="todo.status"
        />
        <label :for="'done-' + todo._id">Done</label>
      </div>
    </div>
  </div>
  <div>
    <h1>Create a Task</h1>
    <div class="input-container">
      <!--     <span>Test: {{ state.newAuthor }}</span> <br />
 -->
      <input
        type="text"
        placeholder="Task"
        v-model="state.newAuthor"
        class="input-field"
      />
    </div>
    <div class="input-container">
      <input
        type="text"
        placeholder="Description"
        v-model="state.newTodoItem"
        class="input-field"
      />
    </div>
    <div class="input-container">
      <input
        type="text"
        placeholder="Duration in hours"
        v-model="state.newTodoItem"
        class="input-field"
      />
    </div>
    <div class="input-container">
      <div class="status">
        <p><u>Status:</u></p>
        <input id="waiting" type="radio" value="Waiting" />
        <label for="">Waiting</label><br />
        <input id="doing" type="radio" value="Doing" />
        <label for="">Doing</label><br />
        <input id="done" type="radio" value="Done" />
        <label for="">Done</label><br />
      </div>
    </div>
    <button @click="newTodo()" class="new-todo-btn">Create task</button>
  </div>
</template>

<script>
import todocrud from "../modules/todocrud";
import { onMounted } from "vue";
export default {
  setup() {
    const { state, GetAllTodos, newTodo, deleteTodo, editTodo } = todocrud();

    onMounted(() => {
      GetAllTodos();
    });

    return { state, GetAllTodos, newTodo, deleteTodo, editTodo };
  },
};
</script>

<style lang="scss" scoped>
.todo-item {
  &.waiting {
    background-color: rgba(65, 184, 131, 0.7);
  }
  &.doing {
    background-color: rgba(65, 184, 131, 1);
  }
  &.done {
    background-color: rgba(65, 184, 131, 0.2);
  }
}
</style>
