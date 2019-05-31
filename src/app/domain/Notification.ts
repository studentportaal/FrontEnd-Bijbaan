export class Notification {
  userid: string;
  jobofferid: string;
  read: boolean;
  joboffername: string;

  constructor(userid: string, jobofferid: string, joboffername: string) {
    this.userid = userid;
    this.jobofferid = jobofferid;
    this.read = false;
    this.joboffername = joboffername;
  }
}
