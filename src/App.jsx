import React from "react";
import { render } from "react-dom";

import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import style from './main.styl';

import Select from 'Select';

const App = () => {
  return (
    <div className="main-container">
      <Select />
    </div>
  );
};

export default App;

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
