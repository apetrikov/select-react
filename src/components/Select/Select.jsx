import React from "react";
import _ from 'lodash';

import style from './select.styl';

class Select extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    const { orderedList = [], search = '', direction = 'down', onInput} = this.props;

    const preparedList = orderedList.map((name, i) => {
        const highlight = (str, length) => (<span className="highlight">{str.slice(0, length)}</span>);
        return (
          <li key={i} onClick={() => onInput(name)}>
            <a>{highlight(name, search.length)}{name.slice(search.length)}</a>
          </li>)
      }
    );

    const dropdown = orderedList.length
      ? (<ul className={`sub-menu ${direction}`} ref={this.subMenu}>
        {preparedList}
      </ul>)
      : null;

    return (
      <div className="select">
        <input
          type="text"
          className={`input ${direction}`}
          value={search}
          pattern=".*"
          maxLength="16"
          required
          onInput={(e) => onInput(e.target.value)}/>
        {dropdown}
        <span className={`floating-label ${direction}`}>Выберите страну</span>
      </div>
    )
  }
}


export default Select;