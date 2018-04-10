import React from "react";

import style from './select.styl';

const mock = {
  list: [
    'Анадырь',
    'Бобруйск',
    'Свияжск',
    'Анапа'
  ],
  selected: 3
};

const Select = () => {
  const { list = ['Список пуст'], selected = 0} = mock;
  return (
    <select value={selected}>
      {list.map((name, i) => (
        <option key={i} value={i}>{name}</option>
      ))}
    </select>
  );
};

export default Select;
