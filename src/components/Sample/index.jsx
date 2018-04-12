import React from "react";

import style from './sample.styl';

const Sample = () => {
  return (
      <div className="container">
        <div className="select">
          <input className="input" placeholder="плейсхолдер"/>
          <ul className="sub-menu">
            <li><a href="#">Опция 1</a></li>
            <li><a href="#">Опция 2</a></li>
            <li><a href="#">Опция 3</a></li>
          </ul>
        </div>
      </div>
  );
};

export default Sample;
