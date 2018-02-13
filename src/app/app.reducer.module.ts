import * as fromRouter from '@ngrx/router-store';

import {RouterStateUrl} from './shared/custom-router-state-serializer';
import {ActionReducer, ActionReducerMap, MetaReducer,} from '@ngrx/store';
import {environment} from '../environments/environment';
import {storeFreeze} from 'ngrx-store-freeze';

export interface RootState {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const rootReducers: ActionReducerMap<RootState> = {
  routerReducer: fromRouter.routerReducer,
};

// console.log all actions
export function logger(reducer: ActionReducer<RootState>): ActionReducer<RootState> {
  return function (state: RootState, action: any): RootState {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<RootState>[] = !environment.production
  ? [logger, storeFreeze]
  : [];

