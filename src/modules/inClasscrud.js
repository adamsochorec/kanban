import { ref } from "vue";

const getTodosInClass = () => {
  const pizzas = ref([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/pizzas"); // axios

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      pizzas.value = data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    pizzas,
    fetchTodos,
  };
};

export default getTodosInClass;
