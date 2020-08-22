import { Questionnaire } from './questionnaire';
import { Answer } from './answer';

export interface Question {
  id: number;
  name: string;
  questionnaire: Questionnaire;
  answers: Answer[];
}
