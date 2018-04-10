import React from "react";

import style from './select.styl';

const Select = ({ optionsList = [], search = '', onInput}) => {
  return (
    <div>
      <input
        type="text"
        list="nameList"
        value={search}
        placeholder="Выберите страну"
        onInput={(e) => onInput(e.target.value)}
      />
      <datalist id="nameList">
        {optionsList}
      </datalist>
    </div>
  );
};

export default Select;
