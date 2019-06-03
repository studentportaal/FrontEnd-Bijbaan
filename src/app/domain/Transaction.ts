import {JobOffer} from "./JobOffer";

export class Transaction {
  companyId: string;
  id: string;
  PaymentMethodNonce: string;

  extractInfo(jobOffer: JobOffer) {
    this.id = jobOffer.id;
    this.companyId = jobOffer.company;
  }
}
