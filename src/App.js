import logo from './logo.svg';
import './App.css';
import { Form } from './components/main-form/form.js'

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className="app-body">
        <Form />
      </main>
    </div>
  );
}

export default App;
