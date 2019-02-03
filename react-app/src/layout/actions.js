import { LAYOUT_MODULE } from './constants';

export const LAYOUT_EXAMPLE = `${LAYOUT_MODULE}/LAYOUT_EXAMPLE`;
export const LAYOUT_TEST = `${LAYOUT_MODULE}/LAYOUT_TEST`;

export const LAYOUT_MAP = `${LAYOUT_MODULE}/LAYOUT_MAP`;

export const LAYOUT_SEARCH = `${LAYOUT_MODULE}/LAYOUT_SEARCH`;
export const LAYOUT_SEARCH_CLEAR = `${LAYOUT_MODULE}/LAYOUT_SEARCH_CLEAR`;
export const LAYOUT_SEARCH_SUCCESS = `${LAYOUT_MODULE}/LAYOUT_SEARCH_SUCCESS`;
export const LAYOUT_SEARCH_FAILURE = `${LAYOUT_MODULE}/LAYOUT_SEARCH_FAILURE`;

export const LAYOUT_START = `${LAYOUT_MODULE}/LAYOUT_START`;
export const LAYOUT_SET_RESULT = `${LAYOUT_MODULE}/LAYOUT_SET_RESULT`;
export const LAYOUT_STOP = `${LAYOUT_MODULE}/LAYOUT_STOP`;

export function layoutExample() {
  return {
    type: LAYOUT_EXAMPLE,
    payload: 'EXAMPLE',
  }
}

export function testAction() {
  return {
    type: LAYOUT_TEST,
  }
}

export function layoutMap() {
  return {
    type: LAYOUT_MAP,
  }
}

export function incrementalSearch(searchString) {
  return {
    type: LAYOUT_SEARCH,
    payload: searchString,
  }
}

export function incrementalSearchClear() {
  return {
    type: LAYOUT_SEARCH_CLEAR,
  }
}

export function incrementalSearchSuccess(users) {
  return {
    type: LAYOUT_SEARCH_SUCCESS,
    payload: users,
  }
}

export function incrementalSearchFailed(error) {
  return {
    type: LAYOUT_SEARCH_FAILURE,
    payload: error,
  }
}

export function layoutStart() {
  return {
    type: LAYOUT_START,
  }
}

export function setResult(i) {
  return {
    type: LAYOUT_SET_RESULT,
    payload: i,
  }
}

export function layoutStop() {
  return {
    type: LAYOUT_STOP,
  }
}
