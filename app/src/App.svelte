<script>
	import { fly } from 'svelte/transition';
	import Icon from 'fa-svelte'
	import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
	import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
	import Navbar from './Navbar.svelte';
	let itemName = "";

	let items = [];
	let deleteIcon = faTrash;
	let addIcon = faPlus;
    async function getItems() {

        let response = await fetch(`http://localhost:5003/api/todos/`);
        items = await response.json();
        return items;
    }

	async function toggleComplete(id) {
		
		let todo = items.filter(t => t.id === id)[0];
		todo.isComplete = !todo.isComplete 
		await fetch(`http://localhost:5003/api/todos/${todo.id}`, {
			method: 'PUT',
			body: JSON.stringify(todo)
		})
		items = items;
	}

	async function deleteItem(id) {
		await fetch(`http://localhost:5003/api/todos/${id}`, {
			method: 'DELETE'
		})
		items = items.filter(t => t.id != id);
	}
	
	async function addItem() {
		
		if (itemName != '')
		{
			let newItem = {
			name: itemName,
			isComplete: false
			}
			await fetch(`http://localhost:5003/api/todos/`, {
				method: 'POST',
				body: JSON.stringify(newItem)
			})
			items = await getItems();
		}
		itemName = '';
		
	}

	items = getItems();

</script>
<Navbar/>
<div class="container mt-5">
	<div class="row">
		<div class="col-md"></div>
		<div class="col-md-8 text-center">
			<h1 class="display-4">Todo</h1>
	
			{#await items}

			<div class="spinner-border mt-5" role="status">
    			<span class="sr-only">Loading...</span>
  			</div>

			{:then todos}
					<div class="card mt-5" transition:fly="{{ y: 150, duration: 300 }}">
				<div class="card-body " >
				<!--Input form for adding new items-->
				<form class="form" on:submit|preventDefault={addItem}>
        			<div class="row form-group">
					<div class="col-sm-10"><h5 class="card-title"><input class="form-control-lg no-border" type="text" bind:value={itemName} autofocus></h5></div>
					<div class="col-sm-2"><button type="submit" class="btn btn-success" ><Icon icon={faPlus}></Icon></button></div>
				</div>
				</form>
    		</div>
				
			</div>

			{#each todos as todo (todo.id)}
			<div class="card mt-5" transition:fly="{{ y: 150, duration: 300 }}">
				<div class="card-body " >
        			<div class="row">
					<div class="col-sm-10" on:click={toggleComplete(todo.id)}><h5 class="card-title {todo.isComplete ? 'done' : ''}"><span>{todo.name}</span></h5></div>
					<div class="col-sm-2"><button type="button" class="btn btn-danger" on:click={deleteItem(todo.id)}><Icon icon={faTrash}></Icon></button></div>
					</div>
    			</div>
				
			</div>
			{/each}	
			{:catch error}

			<div class="card mt-5" transition:fly="{{ y: 150, duration: 300 }}">
    			<div class="card-body" >
        			<h5 class="card-title">{error.message}</h5>
    			</div>
			</div>
			
			{/await}
		</div>
		<div class="col-md"></div>
	</div>
</div>