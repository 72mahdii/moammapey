import { Injectable } from "@angular/core";
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class AuthorPanelService {

  constructor(
    private authService : AuthService,
    private httpClient : HttpClient
  ){}


    /*               */
   /* Change Avatar */
  /*               */
  public changeAvatar(file: File){
    const header = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.authorHeader
    })};
    this.httpClient.post(
      "http://localhost:5050/administration/uploadimg",
      file, header);
  }
}
