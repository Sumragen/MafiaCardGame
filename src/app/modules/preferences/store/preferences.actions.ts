import {Action} from "@ngrx/store";
import {Card} from "../../../../shared/models/Card";

export const ACTIONS = {
  TRY_ADD_CARD: 'TRY_ADD_CARD',
  TRY_REMOVE_CARD: 'TRY_REMOVE_CARD',
  ADD_CARD: 'ADD_CARD',
  REMOVE_CARD: 'REMOVE_CARD',
  ON_ERROR: 'ON_ERROR',
  TRY_CHANGE_TOTAL_PLAYER_AMOUNT: 'TRY_CHANGE_TOTAL_PLAYER_AMOUNT',
  CHANGE_TOTAL_PLAYER_AMOUNT: 'CHANGE_TOTAL_PLAYER_AMOUNT'
};

export class TryChangeTotalPlayerAmount implements Action {
  readonly type = ACTIONS.TRY_CHANGE_TOTAL_PLAYER_AMOUNT;

  constructor(public payload: number) {
  };
}

export class TryAddCard implements Action {
  readonly type = ACTIONS.TRY_ADD_CARD;

  constructor(public payload: Card) {
  };
}

export class TryRemoveCard implements Action {
  readonly type = ACTIONS.TRY_REMOVE_CARD;

  constructor(public payload: Card) {
  };
}

export class OnError implements Action {
  readonly type = ACTIONS.ON_ERROR;

  constructor(public payload: string) {
  };
}

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
  OnError |
  TryAddCard |
  AddCard |
  RemoveCard |
  ChangeTotalPlayerAmount;
