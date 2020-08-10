import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/navbar/navbar.component';
import Home from './screens/Home';
import Register from './screens/Register';

const Routes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
