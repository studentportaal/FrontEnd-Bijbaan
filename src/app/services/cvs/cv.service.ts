import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {Company} from "../../domain/Company";
import {AuthenticationService} from "../authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class CvService {
  uploadEndpointUrl = "https://europe-west1-pts6-bijbaan.cloudfunctions.net/vaiPOST";
  getCvEndpointUrl = "https://europe-west1-pts6-bijbaan.cloudfunctions.net/vaiGET";
  myFilesEndpointUrl = "https://europe-west1-pts6-bijbaan.cloudfunctions.net/vaiGETMINE";
  permitEndpointUrl = "https://europe-west1-pts6-bijbaan.cloudfunctions.net/vaiPERMIT";

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) { }

  getMyFiles(): Observable<File[]> {
    return this.httpClient.get<File[]>(this.myFilesEndpointUrl);
  }
  async uploadFile(file: File, jobOfferId: string, jobOfferOwnerId: string) {
    const result = await this.httpClient.get<string>(this.uploadEndpointUrl, {
      headers: new HttpHeaders({
        jobOfferId,
        jobOfferOwnerId,
        fileDisplayName: file.name
      })
    }).toPromise();
    return this.uploadToBucket(file, result[0], jobOfferId, jobOfferOwnerId);
  }
  uploadToBucket(file: File, url: string, jobOfferId: string, jobOfferOwnerId: string): Subscription {
    const subconfig = {fileDisplayName: file.name, ownerId: this.authenticationService.user.uuid, jobOfferId, jobOfferOwnerId};
    const config = new HttpRequest("PUT", url, file, {
        reportProgress: true,
        headers: new HttpHeaders({
          'Content-Type': 'application/pdf',
          'x-goog-meta-subconfig': JSON.stringify(subconfig),
        }),
      }
    );


    return this.httpClient.request(config)
      .subscribe(event => {
        },
        error => {
        });
  }

  getCvForApplication(jobOfferId: string, studentId: string) {
    const config = {
      headers: new HttpHeaders({
        jobOfferId,
        targetUser: studentId,
      })};
    return this.httpClient.get<string>(this.getCvEndpointUrl, config);
  }

  permitFile(fileLocation: string, jobOfferId: string, companyId: string) {
    return this.httpClient.get(this.permitEndpointUrl, {
      headers: new HttpHeaders({
        jobOfferId,
        jobOfferOwnerId: companyId,
        filename: fileLocation,
      })
    }).toPromise();
  }
}
