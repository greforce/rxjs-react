import {
  LAYOUT_EXAMPLE,
  LAYOUT_MAP,
  LAYOUT_SEARCH,
  LAYOUT_SEARCH_CLEAR,
  LAYOUT_SEARCH_SUCCESS,
  LAYOUT_SEARCH_FAILURE,
  LAYOUT_START,
  LAYOUT_SET_RESULT,
  LAYOUT_STOP,
} from './actions';

const defaultLayoutState = {
  result: 0,
  users: [{
    avatar_url: 'https://avatars2.githubusercontent.com/u/41027510?v=4',
    login: 'greforce',
    html_url: 'https://github.com/greforce',
  }],
};

export function layout(state = defaultLayoutState, action) {
  console.log('reducer', action);
  switch (action.type) {
    case LAYOUT_EXAMPLE:
      console.log('example action reducer');
      return state;
    
    case LAYOUT_MAP:
      console.log('map action reducer');
      return {
        ...state,
        result: state.result + 1,
      };

    case LAYOUT_SEARCH:
      console.log('search action (start) reducer');
      return state;

    case LAYOUT_SEARCH_CLEAR:
      console.log('search action clear reducer');
      return {
        ...state,
        users: [],
      };

    case LAYOUT_SEARCH_SUCCESS:
      console.log('search action success reducer');
      return {
        ...state,
        users: action.payload,
      };

    case LAYOUT_SEARCH_FAILURE:
      console.log('search action failure reducer');
      return {
        ...state,
        error: action.payload,
      };

    case LAYOUT_START:
      console.log('start action reducer');
      return state;

    case LAYOUT_SET_RESULT:
      console.log('set result action reducer');
      return {
        ...state,
        result: action.payload,
      };

    case LAYOUT_STOP:
      console.log('stop action reducer');
      return state;

    default:
      return state;
  }
}
