import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const getDocuments = () => {
  const route = useRoute();
  const router = useRouter();
  const documentID = computed(() => route.params.id);
  const state = ref({
    newName: "",
    newDuration: "",
    newDescription: "",
    newStatus: "",
    tasks: [],
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
        "https://men-restful-api-bbe2.onrender.com/user/login",
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
  const getAllDocuments = async () => {
    try {
      const response = await fetch(
        "https://men-restful-api-bbe2.onrender.com/tasks/"
      );
      const data = await response.json();
      state.value.tasks = data.reverse();
    } catch (error) {
      console.error(error);
    }
  };

  // Create new document - POST
  const newDocument = async () => {
    if (
      !state.value.newName ||
      !state.value.newDescription ||
      !state.value.newDuration ||
      !state.value.newStatus
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
          name: state.value.newName,
          description: state.value.newDescription,
          duration: state.value.newDuration,
          status: state.value.newStatus,
        }),
      };

      const response = await fetch(
        "https://men-restful-api-bbe2.onrender.com/tasks/",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to add new document");
      }

      const newPizza = await response.json();
      state.value.tasks.unshift(newPizza);

      // Clear the form fields
      state.value.newName = "";
      state.value.newDescription = "";
      state.value.newDuration = "";
      state.value.newStatus = "";
    } catch (error) {
      console.error("Error adding new document:", error);
    }
  };

  // Read specific document by ID - GET
  const pizza = ref({});
  const getSpecificDocument = async (documentID) => {
    try {
      console.log("Fetching pizza with ID:", documentID);

      const response = await fetch(
        `https://men-restful-api-bbe2.onrender.com/tasks/${documentID}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch specific document with ID: ${documentID}`
        );
      }
      const data = await response.json();
      console.log(data);
      pizza.value = data;
    } catch (error) {
      console.error(error);
    }
  };

  // Delete specific document by ID - DELETE
  const deleteDocument = async (pizza) => {
    console.log("Deleting document: ", pizza.id);
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.lsToken,
        },
      };
      const response = await fetch(
        `https://men-restful-api-bbe2.onrender.com/tasks/${pizza.id}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to delete document");
      }

      await getAllDocuments();
    } catch (error) {
      console.log("Error deleting document:", error);
    }
  };

  // Edit specific document by ID - PUT
  const editDocument = async () => {
    try {
      if (!documentID.value) {
        throw new Error("No document ID provided");
      }
      if (
        !state.value.newName ||
        !state.value.newDescription ||
        !state.value.newDuration ||
        !state.value.newStatus
      ) {
        return;
      }

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.lsToken,
        },
        body: JSON.stringify({
          name: state.value.newName,
          description: state.value.newDescription,
          duration: state.value.newDuration,
          status: state.value.newStatus,
        }),
      };

      const url = `https://men-restful-api-bbe2.onrender.com/tasks/${documentID.value}`;
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to edit document");
      }
      router.push("/tasks");
    } catch (error) {
      console.log("Error editing document:", error);
    }
  };

  return {
    state,
    getAllDocuments,
    newDocument,
    deleteDocument,
    getSpecificDocument,
    pizza,
    documentID,
    editDocument,
    swaggerLogin,
  };
};

export default getDocuments;
