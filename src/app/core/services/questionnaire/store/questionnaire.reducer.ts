import * as QuestionnaireActions from './questionnaire.actions';
import { Questionnaire } from '../../../../shared/models/questionnaire';
import { QuestionnaireService } from './../../../services/questionnaire/questionnaire.service';

const initialState = {
  questionnaires: [],
};

// tslint:disable-next-line:typedef
export function questionnaireReducer(
  state = initialState,
  actions: QuestionnaireActions.QuestionnaireActions,
  service: QuestionnaireService
) {
  switch (actions.type) {
    case QuestionnaireActions.GET_QUESTIONNAIRES:
      return {
        ...state,
        questionnaires: [service.getQuestionnaires()],
      };
  }
}
