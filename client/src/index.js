import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import AgentsApp from './components/AgentsApp/AgentsApp'
import AdminApp from './components/Admin/AdminApp';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

const parsedData = window.location.host.split(".");
const subDomain = parsedData[0];

// Remove console.log() from production
if (process.env.NODE_ENV !== "development") console.log = () => {};

if(parsedData.length >= 3 && subDomain !== 'www') {
  console.log(parsedData,parsedData.includes('agent'))
  if(subDomain === 'agent') {
    ReactDOM.render(
      <React.StrictMode>
        <BrowserRouter>
          <AgentsApp />
        </BrowserRouter>
      </React.StrictMode>,
      document.getElementById('root')
    );  
  } else if(subDomain === 'admin') {
    ReactDOM.render(
      <React.StrictMode>
        <BrowserRouter>
          <AdminApp />
        </BrowserRouter>
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
} else {
  console.log(window.location.host)
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
