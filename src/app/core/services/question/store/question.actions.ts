import { Action } from '@ngrx/store';
import { Question } from '../../../../shared/models/question';

export const ADD_QUESTION = 'ADD_QUESTION';

export class AddQuestion implements Action {
  readonly type = ADD_QUESTION;
  payload: Question;
}
