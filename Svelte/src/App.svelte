<script>
  let numElements = 10000;
  let runs = [];

  const insertElements = (ul) => {
    ul.innerHTML = '';

    for (let i = 0; i < numElements; i++) {
      const li = document.createElement('li');
      li.textContent = `Item ${i}`;
      ul.appendChild(li);
    }
  };

  const updateElements = (ul) => {
    for (let i = 0; i < numElements; i++) {
      ul.children[i].textContent = `Updated Item ${i}`;
    }
  };

  const removeElements = (ul) => {
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
  };

  const benchmark = async () => {
    const runResults = {
      insertionTime: 0,
      updateTime: 0,
      removalTime: 0,
    };
    const ul = document.querySelector('.list-container ul');

    await new Promise((resolve) => {
      requestAnimationFrame(() => {
        const startTime = performance.now();
        insertElements(ul);
        const endTime = performance.now();
        runResults.insertionTime = (endTime - startTime).toFixed(4);
        resolve();
      });
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    await new Promise((resolve) => {
      requestAnimationFrame(() => {
        const startTime = performance.now();
        updateElements(ul);
        const endTime = performance.now();
        runResults.updateTime = (endTime - startTime).toFixed(4);
        resolve();
      });
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    await new Promise((resolve) => {
      requestAnimationFrame(() => {
        const startTime = performance.now();
        removeElements(ul);
        const endTime = performance.now();
        runResults.removalTime = (endTime - startTime).toFixed(4);
        resolve();
      });
    });

    runs = [...runs, runResults];
  };
</script>

<main>
  <h1>DOM Manipulation Benchmark</h1>
  <p>
    <button on:click={benchmark}>Run Benchmark</button>
  </p>
  {#each runs as run, index}
    <h2>Run {index + 1}</h2>
    <table>
      <thead>
        <tr>
          <th>Insertion (ms)</th>
          <th>Updating (ms)</th>
          <th>Removal (ms)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{run.insertionTime}</td>
          <td>{run.updateTime}</td>
          <td>{run.removalTime}</td>
        </tr>
      </tbody>
    </table>
  {/each}
  <div class="list-container">
    <ul></ul>
  </div>
</main>

<style>
  body {
    background-color: #333;
    color: #ffffff;
    font-family: sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    max-width: 480px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    font-size: 2.5em;
    font-weight: 100;
    margin-bottom: 0.5em;
  }

  p {
    font-size: 1.2em;
  }

  button {
    font-size: 1em;
    padding: 0.5em 1em;
    background-color: #ff3e00;
    color: #ffffff;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #cc3200;
  }

  table {
    width: 100%;
    margin: 1em 0;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid #ffffff;
    padding: 0.5em;
    text-align: center;
  }

  th {
    background-color: #ff3e00;
    font-weight: normal;
  }
</style>
