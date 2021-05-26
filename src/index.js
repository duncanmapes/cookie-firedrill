import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { datadogRum } from '@datadog/browser-rum';

console.log('env', process.env);

datadogRum.init({
  applicationId: process.env.REACT_APP_DD_APP_ID,
  clientToken: process.env.REACT_APP_DD_CLIENT_TOKEN,
  site: 'datadoghq.com',
  service: process.env.REACT_APP_DD_SERVICE_NAME,
  env: process.env.REACT_APP_DD_ENV,
  version: process.env.REACT_APP_VERSION || '0.0.1',
  sampleRate: 100,
  trackInteractions: process.env.REACT_APP_DD_TRACK_INTERACTIONS
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
