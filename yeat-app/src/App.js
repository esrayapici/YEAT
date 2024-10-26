import Navbar from './components/Navbar.js';
import SearchBar from './components/SearchBar.js';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <div className="App">
          <Navbar />
          <header className="App-header">
          <div className = "SearchBar">
                  <SearchBar />
              </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Invata react frate sa reactionezi.
        </a>
      </header>
    </div>
  );
}

export default App;
