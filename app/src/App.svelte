<script>
  import { fly } from "svelte/transition";
  import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
  import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
  import Icon from "fa-svelte";
  import Navbar from "./Navbar.svelte";
  import { v4 as uuid } from "uuid";
  // Define icons for adding and deleting
  let deleteIcon = faTrash;
  let addIcon = faPlus;
  let apiError;
  let uniqueId;

  // Define location of backend API (value is replaced at build time)
  const apiUrl = process.env.apiUrl;

  function getCookie() {
    var name = location.hostname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function setCookie() {
    //Read current cookie value
    uniqueId = getCookie();
    if (uniqueId == "") {
      // if blank, generate new id
      uniqueId = uuid();
    }
    // Set or renew cookie for 1 year
    var d = new Date();
    d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie =
      location.hostname +
      "=" +
      uniqueId +
      ";" +
      expires +
      ";sameSite=strict;secure;path=/";
  }

  setCookie();

  // Declare variable to hold name of new item
  let itemName = "";

  // Start with an empty array of todo items
  let items = [];

  // Get all todo items from API
  async function getItems() {
    let response = await fetch(`${apiUrl}/${uniqueId}/todos`);
    items = await response.json();
    return items;
  }

  // Toggle 'isComplete' property of todo item
  async function toggleComplete(id) {
    apiError = "";
    let todo = items.filter((t) => t.id === id)[0];
    todo.isComplete = !todo.isComplete;
    try {
      await fetch(`${apiUrl}/${uniqueId}/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
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
      await fetch(`${apiUrl}/${uniqueId}/todos/${id}`, {
        method: "DELETE",
      });
      items = items.filter((t) => t.id != id);
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
          isComplete: false,
        };
        await fetch(`${apiUrl}/${uniqueId}/todos/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
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
    <h1 class="display-4 mr-4">Todo</h1>
    <div class="row">
      <!--Display errors at top of page-->
      {#if apiError}
        <div
          class="card mt-2 rounded-pill"
          transition:fly={{ y: 150, duration: 300 }}
        >
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
          transition:fly={{ y: 150, duration: 300 }}
        >
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
                    placeholder="Add a new todo"
                  />
                </div>
                <div class="col-xs">
                  <button
                    type="submit"
                    class="btn btn-success float-right rounded-circle"
                  >
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
            transition:fly={{ y: 150, duration: 300 }}
          >
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
                    on:click={deleteItem(todo.id)}
                  >
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
