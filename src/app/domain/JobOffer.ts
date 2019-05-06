import {Student} from "./Student";

export class JobOffer {
  id: string;
  location: string;
  title: string;
  information: string;
  function: string;
  salary: number;
  company: string;
  applicants: Student[];
}
