import {User} from "./User";

export class Company extends User {
  name: string;
  city: string;
  streetName: string;
  houseNumber: number;
  postalCode: string;
  description: string;

  constructor() {
    super();
  }
}
