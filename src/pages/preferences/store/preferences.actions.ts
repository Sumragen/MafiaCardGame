import {Action} from "@ngrx/store";
import {Card} from "../../../shared/models/Card";

export const ACTIONS = {
  ADD_CARD: 'ADD_CARD',
  REMOVE_CARD: 'REMOVE_CARD',
  CHANGE_TOTAL_PLAYER_AMOUNT: 'CHANGE_TOTAL_PLAYER_AMOUNT'
};

export class AddCard implements Action {
  readonly type = ACTIONS.ADD_CARD;

  constructor(public payload: Card) {
  };
}
export class RemoveCard implements Action {
  readonly type = ACTIONS.REMOVE_CARD;

  constructor(public payload: Card) {
  };
}
export class ChangeTotalPlayerAmount implements Action {
  readonly type = ACTIONS.CHANGE_TOTAL_PLAYER_AMOUNT;

  constructor(public payload: number) {
  };
}

export type PreferencesActions =
  AddCard |
  RemoveCard |
  ChangeTotalPlayerAmount;
