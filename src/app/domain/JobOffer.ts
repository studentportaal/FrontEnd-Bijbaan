import { Student } from "./Student";
import { CompanyService } from '../services/company/company.service';
import { HttpClient } from '@angular/common/http';


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

  constructor() {
  }
}
