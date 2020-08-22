import * as QuestionActions from './question.actions';

const initialState = {
  questions: [
    { id: 1, name: 'pitanje', questionnaire: null, answers: null },
    { id: 2, name: 'pitanje2', questionnaire: null, answers: null },
  ],
};

// tslint:disable-next-line:typedef
export function questionReducer(
  state = initialState,
  action: QuestionActions.AddQuestion
) {
  switch (action.type) {
    case QuestionActions.ADD_QUESTION:
      return {
        ...state,
        questions: [...state.questions, action.payload],
      };
    default:
      return state;
  }
}
