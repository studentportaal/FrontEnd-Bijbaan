import { Student } from "./Student";

export class Application {
  id: string;
  cvDownloadUrl: string;
  motivationLetter: string;
  applicant: Student;
  applicationDate: string;
  accepted: boolean;
}
