import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './components/app.component';
import registerServiceWorker from './registerServiceWorker';
import baseStyles from './global.styles';

baseStyles();
ReactDOM.render(<AppComponent />, document.getElementById('root'));
registerServiceWorker();
