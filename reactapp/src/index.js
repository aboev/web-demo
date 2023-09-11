import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";

export const API_URL = (process.env.REACT_APP_API_URL) ? process.env.REACT_APP_API_URL : "/api";
export const API_STATIC_MEDIA = (process.env.REACT_APP_API_STATIC_MEDIA) ? process.env.REACT_APP_API_STATIC_MEDIA : "";
export const WS_URL = window.location.href.replace('http://', 'ws://').replace('https://', 'wss://') + 'ws';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

reportWebVitals();
