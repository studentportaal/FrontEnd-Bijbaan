import {Student} from "./Student";
import {Skill} from "./Skill";

export class JobOffer {
  id: string;
  location: string;
  title: string;
  information: string;
  function: string;
  salary: number;
  company: string;
  topOfTheDay: Date;
  applicants: Student[];
  skills: Skill[] = [];

  constructor() {
  }
}
