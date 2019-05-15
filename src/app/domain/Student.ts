import { User } from './User';
import {Skill} from "./Skill";

export class Student extends User {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  institute: string;
  skills: Skill[] = [];

  constructor() {
    super();
  }
}
