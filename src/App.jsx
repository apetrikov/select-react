import React from "react";
import { render } from "react-dom";

import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import style from './some.styl';

import Select from 'Select';
import Sample from 'Sample';

const App = () => {
  return (
    <div>
      <p className="header">React is here, guys!</p>
      {/*<Select/>*/}
      <Sample/>
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
