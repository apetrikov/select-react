import _ from 'lodash';

// Constants

const CHANGE_INPUT = 'CHANGE_INPUT';

// Actions

export const onInput = (value) => ({
  type: CHANGE_INPUT,
  value
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
    'Американсое Самоа',
  ],
  search: ''
};

export const select = (state = initialState, action) => {
  switch (action.type){
    case CHANGE_INPUT:
      const newState = _.cloneDeep(state);
      const { value } = action;
      newState.search = value;
      return newState;
    default:
      return state;
  }
};
