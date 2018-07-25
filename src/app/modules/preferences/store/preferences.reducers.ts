import * as _ from 'lodash';
import {RoleEnum} from "../../../../shared/consts/RoleEnum";
import {PreferencesState} from "../../../../shared/interfaces/preferences-state";
import * as PreferencesActions from './preferences.actions';
import {Card} from "../../../../shared/models/Card";

const defaultState: PreferencesState = {
  total: 5,
  minimum: 3,
  roles: {
    [RoleEnum.SHERIFF]: 1,
    [RoleEnum.DOCTOR]: 1,
    [RoleEnum.MAFIA]: 1,
    [RoleEnum.PROSTITUTE]: 0
  }
};

export function PreferencesReducers(state: PreferencesState = defaultState, action: PreferencesActions.PreferencesActions) {
  switch (action.type) {
    case PreferencesActions.ACTIONS.ADD_CARD : {
      const addCardPayload = action.payload as Card;
      ++state.minimum;
      return {
        ...state,
        roles: {
          ...state.roles,
          [addCardPayload.role]: ++state.roles[addCardPayload.role]
        }
      };
    }
    case PreferencesActions.ACTIONS.REMOVE_CARD : {
      const removeCardPayload = action.payload as Card;
      --state.minimum;
      return {
        ...state,
        roles: {
          ...state.roles,
          [removeCardPayload.role]: --state.roles[removeCardPayload.role]
        }
      }
    }
    case PreferencesActions.ACTIONS.CHANGE_TOTAL_PLAYER_AMOUNT: {
      const total: number = action.payload as number;
      const alreadyUsedRoles: number = _.reduce(state.roles, (sum, n) => {
        return sum + n;
      }, 0);
      if (total < alreadyUsedRoles) {
        return state
      } else {
        return {
          ...state,
          total: action.payload as number
        };
      }
    }
    default: {
      return state;
    }
  }
}
