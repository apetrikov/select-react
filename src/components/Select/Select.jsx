import React from "react";

import style from './select.styl';

class Select extends React.Component{
  constructor(props){
    super(props);

    this.selectInput = React.createRef();

    this.state = {
      toTop: 0,
      toBottom: 0,
    }
  }

  componentDidMount() {
    this.updateWindowHeight();
    // window.addEventListener("scroll", this.updateWindowHeight.bind(this));
    // window.addEventListener("resize", this.updateWindowHeight.bind(this));
  };

  componentWillUnmount() {
    // window.removeEventListener("scroll", this.updateWindowHeight.bind(this));
    // window.removeEventListener("resize", this.updateWindowHeight.bind(this));
  }

  updateWindowHeight() {
    const getFreeSpace = () => {
      const { top, bottom } = this.selectInput.current.getBoundingClientRect();
      const height = window.innerHeight;
      return {
        toTop: top,
        toBottom: height - bottom
      }
    };
    this.setState(getFreeSpace());
  };

  chooseDirection(length) {
    const { toTop, toBottom } = this.state;
    const submenuHeight = length * 50; // фиксированная высота 50 px
    if (submenuHeight <= toBottom) return 'down';
    if (submenuHeight <= toTop) return 'up';
    return 'down';
  };

  render() {
    const { orderedList = [], search = '', onInput} = this.props;

    const directionClass = this.chooseDirection(orderedList.length);

    const preparedList = orderedList.map((name, i) => {
        const highlight = (str, length) => (<span className="highlight">{str.slice(0, length)}</span>);
        return (
          <li key={i} onClick={() => onInput(name)}>
            <a>{highlight(name, search.length)}{name.slice(search.length)}</a>
          </li>)
      }
    );

    const dropdown = orderedList.length
      ? (<ul className={`sub-menu ${directionClass}`} ref={this.subMenu}>
        {preparedList}
      </ul>)
      : null;

    return (
      <div className="select">
        <input
          type="text"
          className={`input ${directionClass}`}
          value={search}
          pattern=".*"
          maxLength="16"
          required
          ref={this.selectInput}
          onInput={(e) => onInput(e.target.value)}/>
        <span className="floating-label">Выберите страну</span>
        {dropdown}
      </div>
    )
  }
}


export default Select;
