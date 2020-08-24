import { Action, UPDATE } from '@ngrx/store';
import { Questionnaire } from '../../../../shared/models/questionnaire';

export const GET_QUESTIONNAIRE = 'GET_QUESTIONNAIRE';
export const GET_QUESTIONNAIRES = 'GET_QUESTIONNAIRES';
export const ADD_QUESTIONNAIRE = 'ADD_QUESTIONNAIRE';
export const UPDATE_QUESTIONNAIRE = 'UPDATE_QUESTIONNAIRE';
export const DELETE_QUESTIONNAIRE = 'DELETE_QUESTIONNAIRE';

export class GetQuestionnaire implements Action {
  readonly type = GET_QUESTIONNAIRE;
  constructor(public payload: number) {}
}
export class GetQuestionnaires implements Action {
  readonly type = GET_QUESTIONNAIRES;
  constructor() {}
}

export class AddQuestionnaire implements Action {
  readonly type = ADD_QUESTIONNAIRE;
  constructor(public payload: Questionnaire) {}
}

export class UpdateQeustionnaire implements Action {
  readonly type = UPDATE_QUESTIONNAIRE;
  constructor(
    public payload: { questionnaireId: number; questionnaire: Questionnaire }
  ) {}
}

export class DeleteQuestionnaire implements Action {
  readonly type = DELETE_QUESTIONNAIRE;
  constructor(public payload: number) {}
}

export type QuestionnaireActions =
  | GetQuestionnaire
  | GetQuestionnaires
  | AddQuestionnaire
  | UpdateQeustionnaire
  | DeleteQuestionnaire;
