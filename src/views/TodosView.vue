<template lang="">
  <div>
    <h1>All Todos</h1>
    <button @click="newTodo()">New Todo</button>
    <br />
    <input type="text" placeholder="Author" v-model="state.newAuthor" />
    <span>Test: {{ state.newAuthor }}</span
    ><br />
    <input type="text" placeholder="Todo" v-model="state.newTodoItem" />
    <span>Test: {{ state.newTodoItem }}</span>
    <div v-for="todo in state.todos" :key="todo._id">
      <router-link :to="`/todo/${todo._id}`">
        <h4>{{ todo.author }}</h4>
        <!--         <p>{{ todo._id }}</p>
 -->
        <p>{{ todo.todo }}</p>
        <button @click="editTodo(todo._id)">Update Todo</button>
      </router-link>
      <button @click="deleteTodo(todo._id)">Delete Todo</button>
    </div>
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
<style lang="scss" scoped></style>
