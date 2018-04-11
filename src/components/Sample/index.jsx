import React from "react";

import style from './sample.styl';

const Sample = () => {
  return (
    <nav className="main-navigation">
      <ul className="menu">
        <li className="menu-item-has-children">
          <input value="ololo"/>
          <ul className="sub-menu">
            <li><a href="#">Plumbing</a></li>
            <li><a href="#">Heating</a></li>
            <li><a href="#">Electrical</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Sample;
