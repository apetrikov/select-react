import React from "react";
import ReactDOM from "react-dom";

import style from './some.styl';

const App = () => {
  return (
    <div>
      <p className="header">React is here, guys!!</p>
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
