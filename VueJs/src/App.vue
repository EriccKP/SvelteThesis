<template>
  <main>
    <h1>DOM Manipulation Benchmark</h1>
    <p>
      <button @click="benchmark">Run Benchmark</button>
    </p>
    <div v-for="(run, index) in runs" :key="index">
      <h3>Run {{ index + 1 }}</h3>
      <p>
        <strong>Insertion:</strong> {{ run.insertionTime }}ms
      </p>
      <p>
        <strong>Updating:</strong> {{ run.updateTime }}ms
      </p>
      <p>
        <strong>Removal:</strong> {{ run.removalTime }}ms
      </p>
    </div>
    <div class="list-container">
      <ul ref="ulElement"></ul>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      numElements: 10000,
      runs: [],
    };
  },
  methods: {
    insertElements() {
      const ul = this.$refs.ulElement;
      ul.innerHTML = '';

      for (let i = 0; i < this.numElements; i++) {
        const li = document.createElement('li');
        li.textContent = `Item ${i}`;
        ul.appendChild(li);
      }
    },
    updateElements() {
      const ul = this.$refs.ulElement;

      for (let i = 0; i < this.numElements; i++) {
        ul.children[i].textContent = `Updated Item ${i}`;
      }
    },
    removeElements() {
      const ul = this.$refs.ulElement;

      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
    },
    async benchmark() {
      const runResults = {
        insertionTime: 0,
        updateTime: 0,
        removalTime: 0,
      };

      await new Promise((resolve) => {
        requestAnimationFrame(() => {
          const startTime = performance.now();
          this.insertElements();
          const endTime = performance.now();
          runResults.insertionTime = (endTime - startTime).toFixed(2);
          resolve();
        });
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      await new Promise((resolve) => {
        requestAnimationFrame(() => {
          const startTime = performance.now();
          this.updateElements();
          const endTime = performance.now();
          runResults.updateTime = (endTime - startTime).toFixed(2);
          resolve();
        });
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      await new Promise((resolve) => {
        requestAnimationFrame(() => {
          const startTime = performance.now();
          this.removeElements();
          const endTime = performance.now();
          runResults.removalTime = (endTime - startTime).toFixed(2);
          resolve();
        });
      });

      this.runs.push(runResults);
    },
  },
};
</script>


