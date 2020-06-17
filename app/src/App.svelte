<script>
  import { fly } from "svelte/transition";
  import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
  import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
  import Icon from "fa-svelte";
  import Navbar from "./Navbar.svelte";
  // Define icons for adding and deleting
  let deleteIcon = faTrash;
  let addIcon = faPlus;
  let apiError;

  // Declare variable to hold name of new item
  let itemName = "";

  // Start with an empty array of todo items
  let items = [];

  // Define location of backend API (value is replaced at build time)
  const apiUrl = process.env.apiUrl;

  // Get all todo items from API
  async function getItems() {
    let response = await fetch(`${apiUrl}/todos/`);
    items = await response.json();
    return items;
  }

  // Toggle 'isComplete' property of todo item
  async function toggleComplete(id) {
    apiError = "";
    let todo = items.filter(t => t.id === id)[0];
    todo.isComplete = !todo.isComplete;
    try {
      await fetch(`${apiUrl}/todos/${todo.id}`, {
        method: "PUT",
        body: JSON.stringify(todo)
      });
    } catch (error) {
      apiError = `Failed to update item, ${error.message}`;
    }

    items = items;
  }

  // Delete item by id
  async function deleteItem(id) {
    apiError = "";
    try {
      await fetch(`${apiUrl}/todos/${id}`, {
        method: "DELETE"
      });
      items = items.filter(t => t.id != id);
    } catch (error) {
      apiError = `Failed to delete item, ${error.message}`;
    }
  }

  // Add new item
  async function addItem() {
    if (itemName != "") {
      try {
        let newItem = {
          name: itemName,
          isComplete: false
        };
        await fetch(`${apiUrl}/todos/`, {
          method: "POST",
          body: JSON.stringify(newItem)
        });
        items = await getItems();
      } catch (error) {
        apiError = `Failed to add item, ${error.message}`;
      }
    }
    itemName = "";
  }
  // Assign value to force update
  items = getItems();
</script>

<Navbar />
<div class="container mt-4 justify-content-center pt-4">

    <div class="col text-center">
      <h1 class="display-4">Todo</h1>
      <div class="row">
        <!--Display errors at top of page-->
        {#if apiError}
          <div
            class="card mt-2 rounded-pill"
            transition:fly={{ y: 150, duration: 300 }}>
            <div class="card-body">
              <h5 class="card-title" style="color:red">{apiError}</h5>
            </div>
          </div>
        {/if}
      </div>
      <!--Display animation while waiting on items to load-->
      {#await items}

        <div class="spinner-border mt-2" role="status">
          <span class="sr-only">Loading...</span>
        </div>

      {:then todos}
        <div class="row">
          <div
            class="card mt-2 rounded-pill w-100"
            transition:fly={{ y: 150, duration: 300 }}>
            <div class="card-body ">
              <!--Input form for adding new items-->
              <form class="form" on:submit|preventDefault={addItem}>
                <div class="row ">
                  <div class="col">
                    <input
                      class="input"
                      type="text"
                      bind:value={itemName}
                      autofocus
                      placeholder="Add a new todo" />
                  </div>
                  <div class="col-xs">
                    <button
                      type="submit"
                      class="btn btn-success float-right rounded-circle">
                      <Icon icon={faPlus} />
                    </button>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
        <!--List Todo Items-->
        {#each todos as todo (todo.id)}
          <div class="row">
            <div
              class="card mt-4 rounded-pill w-100 h-100"
              transition:fly={{ y: 150, duration: 300 }}>
              <div class="card-body ">
                <div class="row">
                  <div class="col" on:click={toggleComplete(todo.id)}>
                    <!--Add class to strikethru text if item is compelte-->
                    <h5 class="card-title {todo.isComplete ? 'completed' : ''}">
                      <span>{todo.name}</span>
                    </h5>
                  </div>
                  <div class="col-xs">
                    <button
                      type="button"
                      class="btn btn-danger float-right rounded-circle"
                      on:click={deleteItem(todo.id)}>
                      <Icon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/each}
      {:catch error}
        <div class="card mt-4" transition:fly={{ y: 150, duration: 300 }}>
          <div class="card-body">
            <h5 class="card-title" style="color:red">{error.message}</h5>
          </div>
        </div>
      {/await}
    </div>
  
</div>
