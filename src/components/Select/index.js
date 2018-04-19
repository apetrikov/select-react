import { connect } from 'react-redux';
import React from "react";
import device from 'current-device';

import { onInput, onToggle }  from './module';
import Select from './Select';


// Технический компонент для определения места на странице
// и вывода правильного селекта
class SelectContainer extends React.Component{
  constructor(props){
    super(props);

    this.selectContainer = React.createRef();

    this.state = {
      direction: 'some error',
    }
  }

  componentDidMount() {
    const direction = this.chooseDirection();
    window.addEventListener("scroll", this.chooseDirection);
    window.addEventListener("resize", this.chooseDirection);
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.chooseDirection);
    window.removeEventListener("resize", this.chooseDirection);
  }

  chooseDirection = () => {
    const getToBottom = () => {
      const { bottom } = this.selectContainer.current.getBoundingClientRect();
      const height = window.innerHeight;
      return height - bottom;
    };
    const { length } = this.props.orderedList;
    const submenuHeight = length * 50; // фиксированная высота 50 px
    if (submenuHeight >= getToBottom()){
      this.setState({ direction: "up" });
    } else {
      this.setState({ direction: "down" })
    }
  };

  render() {
    const { isDesktop } = this.props;
    const getMobileSelect = () => (
      <select
        className="select-mobile"
        value={this.props.search}
        onChange={e => this.props.onInput(e.target.value)}>
        <option hidden key={0}>Выберите страну</option>
        {this.props.orderedList.map((item, i) => (<option key={i+1} value={item}>{item}</option>))}
      </select>
    );

    return(
      <div className="select-container" ref={this.selectContainer}>
        {isDesktop
        ? <Select {...this.props} direction={this.state.direction}/>
        : getMobileSelect()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { list = ['Список пуст'], search = '', isOpened = false } = state.select;
  const filteredList = list.filter(name => name.toLowerCase().startsWith(search.toLowerCase()));
  const orderedList = filteredList.sort();
  const isDesktop = device.type === 'desktop';

  console.log(isDesktop);
  return {
    isOpened,
    orderedList,
    search,
    isDesktop,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onInput: value => dispatch(onInput(value)),
    onToggle: () => dispatch(onToggle())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectContainer);
