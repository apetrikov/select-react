import React from "react";

import style from './sample.styl';

const Sample = () => {
  return (
    <div>
      <ul className="for-remove">
        <li className="select">
          <input placeholder="плейсхолдер" value=""/>
          <ul className="sub-menu">
            <li><a href="#">Опция 1</a></li>
            <li><a href="#">Опция 2</a></li>
            <li><a href="#">Опция 3</a></li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sample;
