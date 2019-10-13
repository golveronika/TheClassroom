/* eslint-disable */
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import allReducers from './app/redux/reducers';
import ProtectedRoute from './app/react/hooks/protected.route'
import { saveToLocalStorage, LoadFromLocalStorage } from './app/react/hooks/useLocalState';

import MainArea from './app/react/components/MainArea';
import LogginForm from './app/react/components/Authorization';
import NotFound_404 from './app/react/components/404';
import View from './app/react/components/View';
import Edit from './app/react/components/Edit';
import New from './app/react/components/New';


const persistedState = LoadFromLocalStorage();

const store = createStore(
  allReducers, 
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

store.subscribe(() => saveToLocalStorage(store.getState()));

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <ProtectedRoute exact path="/" component={MainArea} />
        <ProtectedRoute exact path="/view" component={View} />
        <ProtectedRoute exact path="/edit" component={Edit} />
        <ProtectedRoute exact path="/new" component={New} />
        <Route exact path="/loggin" component={LogginForm} /> 
        <Route path="*"  component={NotFound_404} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

render(<Root/> , document.getElementById('root'));
