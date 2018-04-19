import React from "react";
import _ from 'lodash';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-drop-up';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import style from './select.styl';

class Select extends React.Component{
  constructor(props){
    super(props);

    this.inputField = React.createRef();
    this.customSelect = React.createRef();
  }

  componentDidMount = () => document.addEventListener("click", this.handleOutsideClick);
  componentWillUnmount = () => document.removeEventListener("click", this.handleOutsideClick);

  handleOutsideClick = (e) => {
    // Только если компонент открыт
    const outside = !e.path.includes(this.customSelect.current);
    outside && this.props.isOpened && this.toggleList(e);
  };

  toggleList = (e) => {
    this.props.onToggle();
  };

  onEnter = e => {
    if(e.key === 'Enter'){
      this.props.onToggle();
      this.inputField.current.blur();
    }
  };

  render() {
    const { orderedList = [], search = '', direction = 'down', isOpened, onInput, onToggle} = this.props;

    const preparedList = orderedList.map((name, i) => {
        const highlight = (str, length) => (<span className="highlight">{str.slice(0, length)}</span>);
        return (
          <li className={'sub-menu__item'} key={i} onClick={e => {e.stopPropagation(); onInput(name); onToggle()}}>
            <a className="sub-menu__item-link">{highlight(name, search.length)}{name.slice(search.length)}</a>
          </li>)
      }
    );

    const isList = !!orderedList.length;

    const dropdown = isList
      ? (<ul className={`sub-menu custom-select__sub-menu sub-menu_${direction}`} ref={this.subMenu}>
        {preparedList}
      </ul>)
      : null;

    const chooseArrow = () => {
      const onClick = () => {
        // console.log('По стрелочке кликнули!');
        !isOpened && this.toggleList();
        this.inputField.current.focus()
      };
      return direction === 'up'
        ? <ArrowUp className='custom-select__icon icon' onClick={onClick}/>
        : <ArrowDown className='custom-select__icon icon' onClick={onClick}/>;
    };

    const inputClass = `custom-select__input ${(isList && isOpened) ? 'custom-select__input_'+direction : ''}`;
    const labelClass = `custom-select__floating-label ${(isOpened || search.length) ? 'custom-select__floating-label_'+direction : ''}`;

    return (
      <div className="custom-select" ref={this.customSelect}>
        <input
          type="text"
          className={inputClass}
          value={search}
          pattern=".*"
          maxLength="16"
          required
          ref={this.inputField}
          onClick={e => !isOpened && this.toggleList(e)}
          onKeyPress={this.onEnter}
          onInput={(e) => onInput(e.target.value)}/>
        {isOpened && dropdown}
        <span className={labelClass}>Выберите страну</span>
        <span >{chooseArrow()}</span>
      </div>
    )
  }
}


export default Select;
