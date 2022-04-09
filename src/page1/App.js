import React, { useEffect } from 'react';
import './style.css';
function App() {
  useEffect(() => {
    import('../utils').then(({ formatToChinese }) => {
      console.log('dsf');
      formatToChinese(new Date());
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React 反反复复
        </a>
      </header>
      <div className='container'>
        <div>box</div>
        <div>box</div>
      </div>
      <div className='text'>text</div>
    </div>
  );
}

export default App;
