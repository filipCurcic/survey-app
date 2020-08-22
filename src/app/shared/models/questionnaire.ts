import { User } from './user';
import { Question } from './question';

export interface Questionnaire {
  id: number;
  name: string;
  created: Date;
  user: User;
  questions: Question[];
}
