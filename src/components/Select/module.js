// Constants

const CHANGE_INPUT = 'CHANGE_INPUT';
const TOGGLE_INPUT = 'TOGGLE_INPUT';

// Actions

export const onInput = (value) => ({
  type: CHANGE_INPUT,
  value
});

export const onToggle = () => ({
  type: TOGGLE_INPUT,
});

// Reducer

export const initialState = {
  list: [
    'Бразилия',
    'Австралия',
    'Австрия',
    'Азербайджан',
    'Албания',
    'Алжир',
    'Американское Самоа',
  ],
  search: '',
  isOpened: false,
};

export const select = (state = initialState, action) => {
  switch (action.type){
    case CHANGE_INPUT:
      // console.log('Изменение ввода');
      return { ...state, search: action.value}
    case TOGGLE_INPUT:
      // console.log('Изменение состояния');
      return { ...state, isOpened: !state.isOpened}
    default:
      return state;
  }
};
