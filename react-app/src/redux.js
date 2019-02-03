import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import layoutEpics from './layout/epics';
import { layout } from './layout/reducers';

const rootReducer = combineReducers({
  layout,
});

const rootEpic = combineEpics(
  layoutEpics,
);

export {
  rootReducer,
  rootEpic,
};
