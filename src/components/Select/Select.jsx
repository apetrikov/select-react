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
    // console.log(this.props.isOpened);
    // Нажали input списка
    const validElement = ({classList}) => classList.contains('custom-select__input') || classList.contains('custom-select__icon');
    if (validElement(e.toElement)) {
      // console.log('событие!');
      // if (!this.props.isOpened) console.log('открываем');
      if (!this.props.isOpened) this.props.onToggle();
      return;
    }

    // Нажали мимо
    // console.log('мимо');
    // if (this.props.isOpened) console.log('закрываем');
    if (this.props.isOpened) this.props.onToggle();
  }

  render() {
    const { orderedList = [], search = '', direction = 'down', isOpened, onInput, onToggle} = this.props;

    const preparedList = orderedList.map((name, i) => {
        const highlight = (str, length) => (<span className="highlight">{str.slice(0, length)}</span>);
        return (
          <li className={'sub-menu__item'} key={i} onClick={e => {e.stopPropagation(); onInput(name)}}>
            <a className="menuItem">{highlight(name, search.length)}{name.slice(search.length)}</a>
          </li>)
      }
    );

    const isList = !!orderedList.length;

    const dropdown = isList
      ? (<ul className={`sub-menu custom-select__sub-menu sub-menu_${direction}`} ref={this.subMenu}>
        {preparedList}
      </ul>)
      : null;

    const chooseArrow = direction === 'up'
      ? <ArrowUp className='custom-select__icon icon' />
      : <ArrowDown className='custom-select__icon icon'/>;


    return (
      <div className="custom-select">
        <input
          type="text"
          className={`custom-select__input ${isOpened ? 'custom-select__input_'+direction : ''}`}
          value={search}
          pattern=".*"
          maxLength="16"
          required
          onInput={(e) => onInput(e.target.value)}/>
        {isOpened && dropdown}
        <span className={`custom-select__floating-label ${(isOpened || search.length) ? 'custom-select__floating-label_'+direction : ''}`}>Выберите страну</span>
        <span >{chooseArrow}</span>
      </div>
    )
  }
}


export default Select;