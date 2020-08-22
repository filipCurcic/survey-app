import { Action, UPDATE } from '@ngrx/store';
import { Answer } from '../../../../shared/models/answer';

export const ADD_ANSWER = 'ADD_ANSWER';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';
export const DELETE_ANSWER = 'DELETE_ANSWER';

export class AddAnswer implements Action {
  readonly type = ADD_ANSWER;
  constructor(public payload: Answer) {}
}
export class UpdateAnswer implements Action {
  readonly type = UPDATE_ANSWER;
  constructor(public payload: { answerId: number; answer: Answer }) {}
}

export class DeleteAnswer implements Action {
  readonly type = DELETE_ANSWER;
  constructor(public payload: number) {}
}

export type AnswerActions = AddAnswer | UpdateAnswer | DeleteAnswer;
