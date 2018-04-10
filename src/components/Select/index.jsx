import React from "react";

import style from './select.styl';

const Select = ({ optionsList = [], search = '', onInput}) => {
  return (
    <div>
      <input
        type="text"
        list="nameList"
        value={search}
        // onClick={(e) => alert('input clicked')}
        // onChange={(e) => alert('input changed')}
        onInput={(e) => onInput(e.target.value)}
      />
      <datalist id="nameList">
        {optionsList}
      </datalist>
    </div>
  );
};

export default Select;
