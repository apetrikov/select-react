import React from "react";
import ReactDOM from "react-dom";

import style from './some.styl';

import Select from 'Select';

const App = () => {
  return (
    <div>
      <p className="header">React is here, guys!</p>
      <Select/>
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
