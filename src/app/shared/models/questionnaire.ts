import { User } from './user';
import { Question } from './question';

// export interface Questionnaire {
//   id: number;
//   name: string;
//   created: Date;
//   user: User;
//   questions: Question[];
// }

export class Questionnaire {
  constructor(
    public id: number,
    public name: string,
    public created: Date,
    public user: User,
    public question: Question[],
    public template: boolean,
    public publicTemplate: boolean
  ) {}
}
