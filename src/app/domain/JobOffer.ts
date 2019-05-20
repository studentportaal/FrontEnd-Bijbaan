import {Skill} from "./Skill";
import {Application} from "./Application";

export class JobOffer {
  id: string;
  location: string;
  title: string;
  information: string;
  function: string;
  salary: number;
  company: string;
  topOfTheDay: Date;
  applications: Application[];
  skills: Skill[] = [];
  open: boolean;

  constructor() {
  }
}
