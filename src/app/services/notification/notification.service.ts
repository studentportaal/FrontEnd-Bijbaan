import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JobOffer} from "../../domain/JobOffer";
import {Notification} from "../../domain/Notification";
import {Observable} from "rxjs";
import {User} from "../../domain/User";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) {
  }

  private baseUrl = environment.NOTIFICATION_BASE;


  public createNotification(joboffer: JobOffer) {

    const notifications: Notification[] = [];
    for (const a of joboffer.applications) {
      notifications.push(new Notification(a.applicant.uuid, joboffer.id, joboffer.title));
    }

    return this.httpClient.post(this.baseUrl + '/createNotification', notifications);

  }

  public editNotification(notifications: Notification[]) {
    const update: Notification[] = [];

    notifications.forEach(x => {
      if (!x.read) {
        update.push(x);
      }
    });
    return this.httpClient.patch(this.baseUrl + '/editNotification', update);
  }

  public getNotifications(u: User): Observable<Notification[]> {
    return this.httpClient.get<Notification[]>(this.baseUrl + '/getNotifications?uid=' + u.uuid);
  }
}
