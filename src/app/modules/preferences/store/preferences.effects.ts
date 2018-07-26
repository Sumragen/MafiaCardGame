import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {catchError, withLatestFrom} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import * as PreferencesActions from "./preferences.actions";
import {AppState} from "../../../store/app.reducers";
import {Card} from "../../../../shared/models/Card";
import {ErrorService} from "../../../../shared/services/error.service";
import {PreferencesState} from "../../../../shared/interfaces/preferences-state";
import * as _ from "lodash";

@Injectable()
export class PreferencesEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private errorService: ErrorService) {
  }

  @Effect()
  addCard = this.actions$
    .ofType(PreferencesActions.ACTIONS.TRY_ADD_CARD)
    .map((action: PreferencesActions.TryAddCard) => action.payload)
    .switchMap((card: Card) => {
      return this.store$.select('preferences').first().pipe(
        withLatestFrom(of(card), (state: PreferencesState, card: Card) => {
          if (state.total > state.minimum) {
            return new PreferencesActions.AddCard(card);
          } else {
            throw new Error('You couldn\'t add new role');
          }
        }),
        catchError((error) => of(new PreferencesActions.OnError(error.message))))
    });

  @Effect()
  removeCard = this.actions$
    .ofType(PreferencesActions.ACTIONS.TRY_REMOVE_CARD)
    .map((action: PreferencesActions.TryRemoveCard) => action.payload)
    .switchMap((card: Card) => {
      return this.store$.select('preferences').first().pipe(
        withLatestFrom(of(card), (state: PreferencesState, card: Card) => {
          if (state.roles[card.role] > 0) {
            return new PreferencesActions.RemoveCard(card);
          } else {
            throw new Error('You couldn\'t remove role');
          }
        }),
        catchError((error) => of(new PreferencesActions.OnError(error.message))))
    });

  @Effect()
  changeTotalAmountOfPlayers = this.actions$
    .ofType(PreferencesActions.ACTIONS.TRY_CHANGE_TOTAL_PLAYER_AMOUNT)
    .map((action: PreferencesActions.TryChangeTotalPlayerAmount) => action.payload)
    .switchMap((total: number) => {
      return this.store$.select('preferences').first().pipe(
        withLatestFrom(of(total), (state: PreferencesState, total: number) => {
          const alreadyUsedRoles = _.reduce(state.roles, (sum, n) => {
            return sum + n;
          }, 0);
          let actions = [];
          if (total >= alreadyUsedRoles) {
            actions = [new PreferencesActions.ChangeTotalPlayerAmount(total)];
          } else {
            actions = [new PreferencesActions.ChangeTotalPlayerAmount(state.total), new PreferencesActions.OnError('You couldn\'t change total amount of players')];
          }
          return actions;
        }))
        .mergeMap((actions) => {
          return actions;
        })
    });

  @Effect({dispatch: false})
  onError = this.actions$
    .ofType(PreferencesActions.ACTIONS.ON_ERROR)
    .do((action: PreferencesActions.OnError) => {
      this.errorService.show(action.payload);
    });
}
