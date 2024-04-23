<template lang="">
  <div class="totodetail">
    <h1>Edit task</h1>
    <div v-for="item in todo" :key="item.id">
      Todo:
      <h4>{{ item.description }}</h4>
      Description:
      <p>{{ item.description }}</p>
    </div>
    <hr />
    <input type="text" v-model="state.newTodoDescription" />

    <br />
    <input type="text" v-model="state.newTodoItem" />

    <br />
    <button @click="editTodo()">Update Item</button>
    <hr />
  </div>
</template>
<script>
import { onMounted } from "vue";
import todocrud from "../modules/todocrud";

export default {
  setup() {
    const { editTodo, state, GetSpecificTodo, todo, todoId } = todocrud();

    onMounted(() => {
      GetSpecificTodo(todoId.value);
    });

    return {
      todo,
      todoId,
      editTodo,
      state,
    };
  },
};
</script>
<style lang="scss" scoped></style>
