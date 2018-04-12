import React from "react";

import style from './select.styl';

const Select = ({ orderedList = [], search = '', onInput}) => {

  const preparedList = orderedList.map((name, i) => {
    const highlight = (str, length) => (<span className="highlight">{str.slice(0, length)}</span>);
      return (
        <li key={i} onClick={() => onInput(name)}>
          <a>{highlight(name, search.length)}{name.slice(search.length)}</a>
        </li>)
    }
  );

  const dropdown = orderedList.length
    ? (<ul className="sub-menu">
         {preparedList}
       </ul>)
    : null;

  return (
    <div className="container">
      <div className="select">
        <input
          type="text"
          className="input"
          placeholder="Выберите страну"
          value={search}
          onInput={(e) => onInput(e.target.value)}/>
        {dropdown}
      </div>
    </div>
  );
};

export default Select;
