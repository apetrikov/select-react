import React from "react";
import _ from 'lodash';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-drop-up';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import style from './select.styl';

class Select extends React.Component{
  constructor(props){
    super(props);

  }

  componentDidMount() {
    document.addEventListener("click", this.handleOutsideClick.bind(this), false);
  };

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick.bind(this), false);
  }

  handleOutsideClick(e) {
    e.stopPropagation();
    console.log(this.props.isOpened);
    // Нажали input списка
    const validElement = ({classList}) => classList.contains('input') || classList.contains('svg');
    if (validElement(e.toElement)) {
      console.log('событие!');
      if (!this.props.isOpened) console.log('открываем');
      if (!this.props.isOpened) this.props.onToggle();
      return;
    }

    // По клику меню не закрываем
    if (e.toElement.classList.contains('menuItem')){
      return;
    }

    // Нажали мимо
    console.log('мимо');
    if (this.props.isOpened) console.log('закрываем');
    if (this.props.isOpened) this.props.onToggle();
  }

  render() {
    const { orderedList = [], search = '', direction = 'down', isOpened, onInput, onToggle} = this.props;

    const preparedList = orderedList.map((name, i) => {
        const highlight = (str, length) => (<span className="highlight">{str.slice(0, length)}</span>);
        return (
          <li key={i} onClick={e => {e.stopPropagation(); onInput(name)}}>
            <a className="menuItem">{highlight(name, search.length)}{name.slice(search.length)}</a>
          </li>)
      }
    );

    const isList = !!orderedList.length;

    const dropdown = isList
      ? (<ul className={`sub-menu ${direction}`} ref={this.subMenu}>
        {preparedList}
      </ul>)
      : null;

    const chooseArrow = direction === 'up'
      ? <ArrowUp className='svg' />
      : <ArrowDown className='svg'/>;


    return (
      <div className="select">
        <input
          type="text"
          className={`input ${direction} ${isList ? 'list' : null}`}
          value={search}
          pattern=".*"
          maxLength="16"
          required
          onInput={(e) => onInput(e.target.value)}/>
        {dropdown}
        <span className={`floating-label ${direction}`}>Выберите страну</span>
        <span className={`arrow svg ${direction}`}>{chooseArrow}</span>
      </div>
    )
  }
}


export default Select;