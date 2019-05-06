import { User } from './User';

export class Student extends User {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  institute: string;

  constructor() {
    super();
  }
}
