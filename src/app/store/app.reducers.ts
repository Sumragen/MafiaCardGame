import {PreferencesState} from "../../shared/interfaces/preferences-state";
import {ActionReducerMap} from "@ngrx/store";
import * as PreferencesReducers from "../modules/preferences/store/preferences.reducers";

export interface AppState {
  preferences: PreferencesState
}

export const reducers: ActionReducerMap<AppState> = {
  preferences: PreferencesReducers.PreferencesReducers
};
