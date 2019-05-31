import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JobOffer} from "../../domain/JobOffer";
import {Notification} from "../../domain/Notification";
import {Observable} from "rxjs";
import {User} from "../../domain/User";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) {
  }



  public createNotification(joboffer: JobOffer) {

    const notifications: Notification[] = []
    for (const a of joboffer.applications) {
      notifications.push(new Notification(a.applicant.uuid, joboffer.id, joboffer.title));
    }

    return this.httpClient.post("https://us-central1-pts6-bijbaan.cloudfunctions.net/createNotification", notifications);

  }

  public editNotification(notifications: Notification[]) {
    const update: Notification[] = [];

    notifications.forEach(x => {
      if (!x.read) {
        update.push(x);
      }
    });
    console.log(update)
    return this.httpClient.patch('https://us-central1-pts6-bijbaan.cloudfunctions.net/editNotification', update);
  }

  public getNotifications(u: User): Observable<Notification[]> {
    return this.httpClient.get<Notification[]>('https://us-central1-pts6-bijbaan.cloudfunctions.net/getNotifications?uid=' + u.uuid);
  }
}
