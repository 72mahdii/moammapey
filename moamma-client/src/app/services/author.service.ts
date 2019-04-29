import { Injectable } from "@angular/core";
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Password } from '../models/password.model';
import { Profile } from '../models/profile.model';
import { Message, MessageButton } from '../models/message.model';
import { MessageService } from './message.service';
import { Article } from '../models/article.model';


@Injectable()
export class AuthorPanelService {

  private _apiUrl = "http://localhost:5050/api/administration/";
  constructor(
    private authService : AuthService,
    private httpClient : HttpClient,
    private messageService : MessageService
  ){}


      /*                */
    /* Create Article */
  /*                */
  public CreateArticle(article : Article){
    const header =this.headerMaker(this.authService.authorHeader);
    return this.httpClient.post(this._apiUrl + "CreateArticle", article, header);
  }


      /*               */
    /* Change Avatar */
  /*               */
  public changeAvatar(file: File){
    const header = this.headerMaker(this.authService.authorHeader);
    var formData = new FormData();
    formData.append(file.name, file);
    return this.httpClient.post(
      this._apiUrl + "uploadimage", formData, header);
  }

    /*                 */
  /* Change Password */
/*                 */
  public ChangePassowrd(password: Password){
    const header = this.headerMaker(this.authService.authorHeader);
    return this.httpClient.post(
      this._apiUrl + "changepassowrd",
      password,
      header
      );
  }

    /*               */
  /* ChangeProfile */
/*               */
  public ChangeProfile(profile : Profile){
    const header = this.headerMaker(this.authService.authorHeader);
    return this.httpClient.post(this._apiUrl + "changeprofile", profile, header);
  }

    /*               */
  /* Header Maker  */
/*               */
  private headerMaker(authorizaion, contentType=undefined){
    if(contentType !=undefined){
      return {
        headers: new HttpHeaders({
          'Content-Type': contentType,
          'Authorization': this.authService.authorHeader
        })
      }
    }else {
      return{
        headers: new HttpHeaders({
          'Authorization': this.authService.authorHeader
        })
      }
    }
  }
}
