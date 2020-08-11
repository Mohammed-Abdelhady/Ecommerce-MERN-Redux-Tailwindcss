import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { loadUser } from './data/reducers/auth';
import store from './data/store';
import setAuthToken from './helpers/setAuthToken';
import Routes from './routes';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    console.log('app')
   store.dispatch(loadUser()) 
  }, [])
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
