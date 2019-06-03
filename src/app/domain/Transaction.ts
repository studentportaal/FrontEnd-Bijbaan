import {JobOffer} from "./JobOffer";

export class Transaction {
  companyId: string;
  jobOfferId: string;
  PaymentMethodNonce: string;

  extractInfo(jobOffer: JobOffer) {
    this.jobOfferId = jobOffer.id;
    this.companyId = jobOffer.company;
  }
}
