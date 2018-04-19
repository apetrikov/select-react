import { connect } from 'react-redux';
import React from "react";
import device from 'current-device';

import { onInput, onToggle }  from './module';
import Select from './Select';


// Техниееский компонент для определения места на странице
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
    this.setState({ direction });
    window.addEventListener("scroll", this.chooseDirection.bind(this));
    window.addEventListener("resize", this.chooseDirection.bind(this));
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.chooseDirection.bind(this));
    window.removeEventListener("resize", this.chooseDirection.bind(this));
  }

  chooseDirection() {
    const getToBottom = () => {
      const { bottom } = this.selectContainer.current.getBoundingClientRect();
      const height = window.innerHeight;
      return height - bottom;
    };
    const { length } = this.props.orderedList;
    const submenuHeight = length * 50; // фиксированная высота 50 px
    if (submenuHeight >= getToBottom()) return 'up';
    return 'down';
  };

  render() {
    // TODO решить, что рендерить - кастомный или мобильный селект
    return(
      <div className="select-container" ref={this.selectContainer}>
        <Select {...this.props} direction={this.state.direction}/>
        {/*удалить блок ниже!*/}
        <select className="select-mobile">
          {this.props.orderedList.map((item, i) => (<option key={i} value={item}>{item}</option>))}
        </select>
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
