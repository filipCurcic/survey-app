import * as AnswerActions from './answer.actions';
import { Answer } from '../../../../shared/models/answer';
const initialState = {
  answers: [
    new Answer(1, 'prvo pitanje', null),
    new Answer(2, 'drugo pitanje', null),
    // { id: 1, name: 'pitanje', question: null },
    // { id: 2, name: 'pitanje2', question: null },
  ],
};

// tslint:disable-next-line:typedef
export function answerReducer(
  state = initialState,
  action: AnswerActions.AnswerActions
) {
  switch (action.type) {
    case AnswerActions.ADD_ANSWER:
      return {
        ...state,
        answers: [...state.answers, action.payload],
      };
    default:
      return state;
    case AnswerActions.UPDATE_ANSWER:
      const answer = state.answers.filter(
        (a) => a.id === action.payload.answerId
      );
      const updatedAnswer = {
        ...answer,
        ...action.payload.answer,
      };
      const updatedAnswers = [...state.answers];

      return {
        ...state,
        answers: [],
      };
    // case AnswerActions.DELETE_ANSWER:
  }
}
