import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const getPizzas = () => {
  const route = useRoute();
  const router = useRouter();

  const pizzaID = computed(() => route.params.id);
  console.log("pizzaID: ", pizzaID.value);

  const state = ref({
    newTask: "",
    newTodoTime: "",
    newTodoDescription: "",
    newTodoStatus: "",
    pizzas: [],
  });

  // Docs login
  const swaggerLogin = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "localStorage.lsToken",
        },
        body: JSON.stringify({
          email: "test@test.com",
          password: "12345678",
        }),
      };
      await fetch(
        "https://men-restful-api-bbe2.onrender.com/api/user/login",
        requestOptions
      )
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("lsToken", data.data.token);
          console.log("lsToken", data.data.token);
          console.log("lsStorage", localStorage.lsToken);
        });
    } catch (error) {
      console.error(error);
    }
  };

  // Read all documents - GET
  const GetAllPizzas = async () => {
    try {
      const response = await fetch(
        "https://men-restful-api-bbe2.onrender.com/api/pizzas/"
      );
      const data = await response.json();
      state.value.pizzas = data.reverse();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const newTask = async () => {
    if (
      !state.value.newTask ||
      !state.value.newTodoDescription ||
      !state.value.newTodoTime ||
      !state.value.newTodoStatus
    ) {
      console.error("All fields must be filled out");
      return;
    }
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.lsToken,
        },
        body: JSON.stringify({
          task: state.value.newTask,
          description: state.value.newTodoDescription,
          time: state.value.newTodoTime,
          status: state.value.newTodoStatus,
        }),
      };

      const response = await fetch(
        "https://men-restful-api-bbe2.onrender.com/api/pizzas/",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to add new document");
      }

      const newPizza = await response.json();
      state.value.pizzas.unshift(newPizza);

      // Clear the form fields
      state.value.newTask = "";
      state.value.newTodoDescription = "";
      state.value.newTodoTime = "";
      state.value.newTodoStatus = "";
    } catch (error) {
      console.error("Error adding new document:", error);
    }
  };

  // Read specific document by ID - GET
  const pizza = ref({});
  const GetSpecificPizza = async (pizzaID) => {
    try {
      console.log("Fetching pizza with ID:", pizzaID);

      const response = await fetch(
        `https://men-restful-api-bbe2.onrender.com/api/pizzas/${pizzaID}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch specific document with ID: ${pizzaID}`
        );
      }
      const data = await response.json();
      pizza.value = data;
    } catch (error) {
      console.error(error);
    }
  };

  // Delete specific document by ID - DELETE
  const deletePizza = async (pizza) => {
    console.log("delete id from vue: ", pizza.id);
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.lsToken,
        },
      };
      const response = await fetch(
        `https://men-restful-api-bbe2.onrender.com/api/pizzas/${pizza.id}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to delete document");
      }

      await GetAllPizzas();
    } catch (error) {
      console.log("Error deleting document:", error);
    }
  };

  // Edit specific document by ID - PUT
  const editPizza = async () => {
    try {
      if (!pizzaID.value) {
        throw new Error("No document ID provided");
      }
      if (
        !state.value.newTask ||
        !state.value.newTodoDescription ||
        !state.value.newTodoTime ||
        !state.value.newTodoStatus
      ) {
        console.error("All fields must be filled out");
        return;
      }

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.lsToken,
        },
        body: JSON.stringify({
          task: state.value.newTask,
          description: state.value.newTodoDescription,
          time: state.value.newTodoTime,
          status: state.value.newTodoStatus,
        }),
      };

      const url =
        "https://men-restful-api-bbe2.onrender.com/api/pizzas/" + pizzaID.value;
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to edit document");
      }
      router.push("/pizzas");
    } catch (error) {
      console.log("Error editing document:", error);
    }
  };

  return {
    state,
    GetAllPizzas,
    newTask,
    deletePizza,
    GetSpecificPizza,
    pizza,
    pizzaID,
    editPizza,
    swaggerLogin,
  };
};

export default getPizzas;
