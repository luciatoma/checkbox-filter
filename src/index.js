import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Filter from './pages/Filter';
import * as serviceWorker from './serviceWorker';

/* global document */
ReactDOM.render(<Filter />, document.getElementById('root'));
serviceWorker.unregister();
