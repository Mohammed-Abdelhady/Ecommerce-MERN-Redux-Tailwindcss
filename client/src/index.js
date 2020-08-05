import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/main.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
//redux
import { Provider } from 'react-redux';
import store from './data/store';

// Components
import Navbar from './components/navbar/navbar.component';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={App} />
      </Switch>
    </BrowserRouter>
    <App />
  </Provider>,
  document.getElementById('root')
);
