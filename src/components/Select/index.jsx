import React from "react";

import style from './select.styl';

const mock = {
  list: [
    'Анадырь',
    'Бобруйск',
    'Свияжск',
    'Анапа'
  ],
  search: ''
};

const Select = () => {
  const { list = ['Список пуст'], search = list[0]} = mock;
  const filteredList = list.filter(name => name.startsWith(search));
  const optionsList = filteredList.map((name, i) => (
    <option key={i} value={name} onClick={() => alert(name)}>{name}</option>
  ));
  return (
    <div>
      <input type="text" list="nameList" value={search}/>
      <datalist id="nameList">
        {optionsList}
      </datalist>
    </div>
  );
};

export default Select;
