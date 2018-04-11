import { connect } from 'react-redux';
import React from "react";

import { onInput }  from './module';
import Select from './Select';

function mapStateToProps(state) {
  const { list = ['Список пуст'], search = '' } = state.select;

  const highlight = (name = '', len = 0) => {

    return `<span className="highlight">${name.slice(0,len)}</span>${name.slice(len)}`;
  };

  const upperSearch = search && search.charAt(0).toUpperCase() + search.slice(1);
  const filteredList = list.filter(name => name.startsWith(upperSearch));
  const orderedList = filteredList.sort();
  const optionsList = orderedList.map((name, i) => (
    <option className="highlight" key={i} value={name}></option>
  ));

  return {
    optionsList,
    search
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onInput: value => dispatch(onInput(value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Select);
