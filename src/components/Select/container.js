import { connect } from 'react-redux';
import React from "react";

import { onInput }  from './module';
import Select from './index';

function mapStateToProps(state) {
  const { list = ['Список пуст'], search = '' } = state.select;

  const filteredList = list.filter(name => name.startsWith(search));
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
