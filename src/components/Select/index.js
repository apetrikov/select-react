import { connect } from 'react-redux';
import React from "react";

import { onInput }  from './module';
import Select from './Select';

function mapStateToProps(state) {
  const { list = ['Список пуст'], search = '' } = state.select;
  const filteredList = list.filter(name => name.toLowerCase().startsWith(search.toLowerCase()));
  const orderedList = filteredList.sort();
  return {
    orderedList,
    search
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onInput: value => dispatch(onInput(value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Select);
