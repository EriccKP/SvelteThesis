import React, { useRef, useState } from 'react';

const DomBenchmark = () => {
  const numElements = 10000;
  const [runs, setRuns] = useState([]);
  const ulElement = useRef(null);

  const insertElements = () => {
    const ul = ulElement.current;
    ul.innerHTML = '';

    for (let i = 0; i < numElements; i++) {
      const li = document.createElement('li');
      li.textContent = `Item ${i}`;
      ul.appendChild(li);
    }
  };

  const updateElements = () => {
    const ul = ulElement.current;

    for (let i = 0; i < numElements; i++) {
      ul.children[i].textContent = `Updated Item ${i}`;
    }
  };

  const removeElements = () => {
    const ul = ulElement.current;

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

    await new Promise((resolve) => {
      requestAnimationFrame(() => {
        const startTime = performance.now();
        insertElements();
        const endTime = performance.now();
        runResults.insertionTime = (endTime - startTime).toFixed(4);
        resolve();
      });
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    await new Promise((resolve) => {
      requestAnimationFrame(() => {
        const startTime = performance.now();
        updateElements();
        const endTime = performance.now();
        runResults.updateTime = (endTime - startTime).toFixed(4);
        resolve();
      });
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    await new Promise((resolve) => {
      requestAnimationFrame(() => {
        const startTime = performance.now();
        removeElements();
        const endTime = performance.now();
        runResults.removalTime = (endTime - startTime).toFixed(4);
        resolve();
      });
    });

    setRuns([...runs, runResults]);
  };

  return (
    <main>
      <h1>DOM Manipulation Benchmark</h1>
      <p>
        <button onClick={benchmark}>Run Benchmark</button>
      </p>
      <table>
        <thead>
          <tr>
            <th>Run</th>
            <th>Insertion (ms)</th>
            <th>Updating (ms)</th>
            <th>Removal (ms)</th>
          </tr>
        </thead>
        <tbody>
          {runs.map((run, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{run.insertionTime}</td>
              <td>{run.updateTime}</td>
              <td>{run.removalTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="list-container">
        <ul ref={ulElement}></ul>
      </div>
    </main>
  );
};

export default DomBenchmark;
