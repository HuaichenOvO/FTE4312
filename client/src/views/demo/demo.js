import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GameFooter from "../../components/GameFooter";
// import { GetUserName, GetUserPoint } from "../../components/GameUserInfo";
import { EthProvider } from "../../contexts/EthContext";

// import './myCSS.css';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('ProfileButton')
// );

// ReactDOM.render(
//   <EthProvider>
//     <GetUserName />
//   </EthProvider>,
//   document.getElementById('username_')
// );

// ReactDOM.render(
//   <EthProvider>
//     <GetUserPoint />
//   </EthProvider>,
//   document.getElementById('coin_')
// );

// ReactDOM.render(
//   <React.StrictMode>
//     <__username__ />
//   </React.StrictMode>,
//   document.getElementById('__flowers__')
// );

ReactDOM.render(
  <React.StrictMode>
    <h1>Demo</h1>
    <App />
    <GameFooter />
  </React.StrictMode>,
  document.getElementById('root')
);