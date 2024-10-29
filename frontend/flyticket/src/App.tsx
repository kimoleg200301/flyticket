import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Welcome name={"Oleg"} age={10}/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

type WelcomeProps = {
  name: string
  age: number
}
const Welcome = ({name, age}: WelcomeProps) => {
  return (
    <div>Hi, {name}. My age is {age}</div>
  )
}

export default App;
