import { combineEpics, ofType } from 'redux-observable';
import { of, EMPTY, range, interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  ignoreElements,
  tap,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  mergeMap,
  concatMap,
  exhaustMap,
  mergeAll,
  map,
  catchError,
  scan,
  take,
  takeUntil,
} from 'rxjs/operators';

import {
  LAYOUT_EXAMPLE,
  LAYOUT_MAP,
  LAYOUT_SEARCH,
  LAYOUT_START,
  LAYOUT_STOP,
} from './actions';
import {
  incrementalSearchSuccess,
  incrementalSearchFailed,
  incrementalSearchClear,
  setResult,
  testAction,
} from './actions';

function exampleEpic(action$) {
  console.log('exampleEpic', action$); // запускается только 1 раз при инициализации!
  return action$.pipe(
    ofType(LAYOUT_EXAMPLE),
    tap((data) => console.log('example action epic start', data)),
    // map(() => EMPTY), // нельзя, так как мы должны action возвращать на поток, а не новый поток
    // mergeMap(() => EMPTY), // а так можно, потому что поток с action объектом тут заменяем на пустой поток (заменяем поток на новый?)
    // ignoreElements(), // либо используем этот оператор, если хотим убрать прилетевший action объект с потока (по идее поток не меняем)
    map(() => testAction()), // как вариант вернуть экшен-пустышку, даже без обработки в reducer
    tap((data) => console.log('example action epic end', data)),
  );
}

function mapEpic(action$, state$) {
  console.log('mapEpic', action$); // запускается только 1 раз при инициализации!
  return action$.pipe(
    ofType(LAYOUT_MAP),
    tap(() => console.log('map action epic start')),
    tap(() => console.log(state$.value.layout.result)), // reducer LAYOUT_MAP УЖЕ сработал

    switchMap(() => {
    // mergeMap(() => {
      // concatMap(() => {
      // exhaustMap(() => {
      const click = state$.value.layout.result;
      return interval(1000) // range(1, 5)
        .pipe(
          map(i => `Click ${click} interval event ${i}`),
          take(5),
          tap(result => console.log(result)),
          ignoreElements(),
        )
    }),

    /*
        map(() => { // аналог mergeMap
          const click = state$.value.layout.result;
          return interval(1000) // range(1, 5)
            .pipe(
              map(i => `Click ${click} interval event ${i}`),
              take(5),
              tap(result => console.log(result)),
              ignoreElements(),
            )
        }),
        mergeAll(),
    */
    // tap(() => console.log('map main pipe finish')),
    // ignoreElements(), // НЕ НУЖЕН! из-за switchMap поток перешел в другой
  );
}

function searchEpic(action$) {
  console.log('searchEpic', action$); // запускается только 1 раз при инициализации!
  return action$.pipe(
    ofType(LAYOUT_SEARCH),
    tap(({ payload }) => console.log('search action epic', payload)),
    debounceTime(1000),
    distinctUntilChanged(),
    tap(({ payload }) => console.log('search action epic 1000', payload)),
    // filter(({ payload }) => !!payload), // вариант не пропускать дальше, если запрос пустой
    tap(({ payload }) => console.log('search action epic pass empty string filter', payload)),
    switchMap(({ payload }) => {
      if (!payload) return of(incrementalSearchClear()); // вариант с обнулением результатов если запрос пустой
      return ajax.getJSON(`https://api.github.com/search/users?q=${payload}`)
        .pipe(
          tap(() => console.log('ajax pipe before map and error')),
          map(response => incrementalSearchSuccess(response.items)),
          tap(() => console.log('ajax pipe before error')),
          catchError(err => {
            console.log(err);
            return of(incrementalSearchFailed(err));
          }),
          tap(() => console.log('ajax pipe after error')),
        )
    }),
    tap(() => console.log('search main pipe finish')),
  );
}

function cancellationEpic(action$) {
  console.log('cancellationEpic', action$); // запускается только 1 раз при инициализации!
  return action$.pipe(
    ofType(LAYOUT_START),
    tap(() => console.log('cancellation action epic start')),
    mergeMap(() => {
      return interval(2000)
        .pipe(
          map(i => setResult(i)),
          // take(5),
          takeUntil(action$.pipe(
            ofType(LAYOUT_STOP),
          )),
          tap((result) => console.log('cancellation action epic end', result)),
        )
    }),
  );
}

export default combineEpics(
  exampleEpic,
  mapEpic,
  searchEpic,
  cancellationEpic,
);
