import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from './components/App';
import AgentsApp from './components/AgentsApp/AgentsApp'
import AdminApp from './components/Admin/AdminApp';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

Sentry.init({
  dsn: "https://98ca13cd1ef54b99b19e021a4ee1d950@o578013.ingest.sentry.io/5733955",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV === "production" ? "production" : "development"
});

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
