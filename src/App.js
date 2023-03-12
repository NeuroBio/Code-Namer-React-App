import logo from './logo.svg';
import './App.css';
import { Form } from './components/main-form/form.js'

function App() {
  return (
    <div className="App">
      <header className="app-header starry-night">
        <img src={logo} className="App-logo" alt="logo" />
        <span>
          Code Name Suggester
        </span>
      </header>
      <main className="app-body">
        <Form />
      </main>
    </div>
  );
}

export default App;
