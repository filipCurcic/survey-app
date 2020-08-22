import { Question } from './question';

// export interface Answer {
//   id: number;
//   name: string;
//   question: Question;
// }

export class Answer {
  constructor(
    public id: number,
    public name: string,
    public question: Question
  ) {}
}
