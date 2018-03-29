import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import './index.scss';

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(<App />, document.body.appendChild(document.createElement('div')))
});
