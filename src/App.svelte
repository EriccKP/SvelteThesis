<script>
	import { onMount } from 'svelte';
  
	let numElements = 10000;
	let insertionTime = 0;
	let removalTime = 0;
  
	const insertElements = () => {
	  const startTime = performance.now();
  
	  for (let i = 0; i < numElements; i++) {
		const el = document.createElement('div');
		document.body.appendChild(el);
	  }
  
	  const endTime = performance.now();
	  insertionTime = (endTime - startTime).toFixed(4);
  
	  requestAnimationFrame(removeElements);
	};
  
	const removeElements = () => {
	  const startTime = performance.now();
  
	  for (let i = 0; i < numElements; i++) {
		const el = document.body.lastChild;
		document.body.removeChild(el);
	  }
  
	  const endTime = performance.now();
	  removalTime = (endTime - startTime).toFixed(4);
	};
  
	onMount(() => {
	  requestAnimationFrame(insertElements);
	});
  </script>
  


<main>
	<h1>Inserting {numElements} DOM elements took {insertionTime}ms </h1>
	<h1>Removing {numElements} DOM elements took {removalTime}ms</h1>
</main>


<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>