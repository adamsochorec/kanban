import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const getPizzas = () => {
  // Route and router are used to grab the pizzaID from the URL and then stored in computed so we can use it in the rest of the code
  const route = useRoute(); // Used to grab the pizzaID from the URL and then stored in computed so we can use it in the rest of the code
  const router = useRouter();

  const pizzaID = computed(() => route.params.id);
  console.log("pizzaID: ", pizzaID.value);

  const state = ref({
    newPizzaName: "",
    newTodoDuration: "",
    newTodoDescription: "",
    newTodoStatus: "",
    pizzas: {},
  });
  const swaggerLogin = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "localStorage.lsToken",
        },
        body: JSON.stringify({
          email: "kw@easv.dk",
          password: "12345678",
        }),
      };
      await fetch(
        "https://dwp-backend.adamsochorec.com/api/user/login",
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

  /**
   * Fetches all pizzas items from the server.
   * @returns {Promise<void>} A Promise that resolves once all pizzas items are successfully fetched from the server.
   * @throws {Error} If there is an error during the fetching process.
   */
  // improved error handling with async/await and try/catch blocks. Better readability and maintainability.
  const GetAllPizzas = async () => {
    try {
      const response = await fetch(
        "https://dwp-backend.adamsochorec.com/api/pizzas/"
      );
      // .filter(user => user.id == id)   // id 1 & id 2
      const data = await response.json();
      state.value.pizzas = data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  /** JSDOC
   * Creates a new pizzas item and sends it to the server for storage.
   * @returns {Promise<void>} A Promise that resolves once the new pizzas item is successfully created and stored on the server.
   * @throws {Error} If there is an error during the creation or storage process.
   */
  // Improved error handling with async/await and try/catch blocks. Better readability and maintainability.
  const newPizza = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.lsToken,
        },
        body: JSON.stringify({
          pizza: state.value.newPizzaName,
          description: state.value.newTodoDescription,
          duration: state.value.newTodoDuration,
          status: state.value.newTodoStatus,
          // MongoDB will automatically generate an _id for each document inserted into a collection
          // So, you don't need to manually set the id when creating a new pizza
          // However, if you have a specific id that you want to use, you can include it here
          id: state.value.pizzaID,
        }),
      };

      // Make the HTTP request
      const response = await fetch(
        "https://dwp-backend.adamsochorec.com/api/pizzas/",
        requestOptions
      );

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to add new pizza");
      }

      // Refresh pizzas after successfully adding a new one
      await GetAllPizzas();
    } catch (error) {
      console.error("Error adding new pizzas:", error);
      // Handle the error as appropriate (e.g., show an error message to the user)
    }
  };

  /**
   * Deletes a pizzas item from the server.
   * @async
   * @param {string} _id - The ID of the pizzas item to delete.
   * @throws {Error} If the deletion request fails or the response is not ok.
   * @returns {Promise<void>} A Promise that resolves when the pizzas item is successfully deleted.
   */

  // Delete code here
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
        `https://dwp-backend.adamsochorec.com/api/pizzas/${pizza.id}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to delete pizza");
      }

      await GetAllPizzas();
    } catch (error) {
      console.log("Error deleting pizzas:", error);
    }
  };

  // Start here week 12

  /**
   * Test for handleEdit */
  /**
   * Function to handle editing a pizzas item.
   * @async
   * @function handleEditPizza
   * @returns {Promise<void>}
   */
  // Edit handleEditPizza here. Seperate the function from the editPizza function for better readability and maintainability.

  /**
   * Function to edit a pizzas item.
   * @async
   * @function editPizza
   * @param {_id} _id - The ID of the pizzas item to edit.
   * @param {Object} data - The updated data for the pizzas item.
   * @returns {Promise<void>}
   */
  // Edit code here
  const handleEditPizza = async () => {
    try {
      if (!pizzaID.value) {
        throw new Error("No pizzas ID provided");
      }

      await editPizza(pizzaID.value, {
        task: state.value.newPizzaName,
        description: state.value.newTodoDescription,
        duration: state.value.newTodoDuration,
      });
      //   debugger;
    } catch (error) {
      console.log("Error editing pizzas:", error);
    }
  };

  const editPizza = async (_id, data) => {
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.lsToken,
        },
        body: JSON.stringify(data),
      };
      //debugger;
      const url =
        "https://dwp-backend.adamsochorec.com/api/pizzas/" + pizzaID.value;
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to edit pizzas");
      }

      router.push("/pizzas");
    } catch (error) {
      console.log("Error editing pizzas:", error);
    }
  };

  /**
   * Fetches a specific pizzas item from the server.
   * @param {string} pizzaID - The ID of the pizzas item to fetch.
   * @returns {Promise<void>} A Promise that resolves once the specific pizzas item is successfully fetched from the server.
   * @throws {Error} If there is an error during the fetching process.
   */
  // Fetch specific pizzas item code here + pizzas ref array

  const pizza = ref({});
  const GetSpecificPizza = async (pizzaID) => {
    try {
      console.log("Fetching pizza with ID:", pizzaID); // Debugging log

      const response = await fetch(
        `https://dwp-backend.adamsochorec.com/api/pizzas/${pizzaID}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch specific pizza with ID: ${pizzaID}`);
      }
      const data = await response.json();
      pizza.value = data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    state,
    GetAllPizzas,
    newPizza,
    deletePizza,
    GetSpecificPizza,
    pizza,
    pizzaID,
    handleEditPizza,
    swaggerLogin,
  };
};

export default getPizzas;
