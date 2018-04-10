import { connect } from 'react-redux';
import React from "react";

import { onInput }  from './module';
import Select from './Select';

function mapStateToProps(state) {
  const { list = ['Список пуст'], search = '' } = state.select;

  const upperSearch = search && search.charAt(0).toUpperCase() + search.slice(1);

  const filteredList = list.filter(name => name.startsWith(upperSearch));
  const orderedList = filteredList.sort();
  const optionsList = orderedList.map((name, i) => (
    <option key={i} value={name}>{name}</option>
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
