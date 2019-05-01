    /*         */
  /* Imports */
/*         */
//#region
import { Injectable } from "@angular/core";
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Password } from '../models/password.model';
import { Profile } from '../models/profile.model';
import { Message, MessageButton } from '../models/message.model';
import { MessageService } from './message.service';
import { Article } from '../models/article.model';
import { Subject } from 'rxjs';
import { Trash } from '../models/trash.model';
//#endregion

@Injectable()
export class AuthorPanelService {

      /*                       */
    /* Properties and Fields */
  /*                       */
  //#region
  public loadData: Subject<boolean> = new Subject<boolean>();
  public loadTrash : Subject<boolean> = new Subject<boolean>();
  private _apiUrl = "http://localhost:5050/api/administration/";
  private _apiUrlA = "http://localhost:5050/api/articles/";

  public articlesList : Article[]=[];
  public trashesList : Trash[] = [];
  public archiveCounter : number =0;
  //#endregion

      /*                          */
    /* Constructor and ngOnInit */
  /*                          */
  //#region
  constructor(
    private authService : AuthService,
    private httpClient : HttpClient,
    private messageService : MessageService
  ){}
  //#endregion

      /*                */
    /* Return Article */
  /*                */
  public ReturnArticle(id: string) {
    return this.articlesList.find(key => key.id == Number(id));
  }

      /*              */
    /* Fetch Author */
  /*              */
  public FetchAuthor(){
    var header =this.headerMaker(this.authService.authorHeader);
    return this.httpClient.get<any>(this._apiUrl + "FetchAuthor", header);
  }

      /*                */
    /* Fetch Articles */
  /*                */
  public FetchArticles() {
    var header = this.headerMaker(this.authService.authorHeader);
    this.httpClient.get<any>(
      this._apiUrlA + "FetchArticles",header).subscribe(articles => {
        if(articles != null){
          this.articlesList = articles;
          this.archiveCounter =0;
          this.articlesList.forEach(article => {
            if(article.archive){
              this.archiveCounter +=1;
            }
          });
          this.loadData.next(true);
        }
      }, error => {
        this.messageService.CreateMessage(
          "خطا در بارگزاری اطلاعات!",
          new MessageButton("بستن", "refuse")
        );
      });
  }

      /*                */
    /* Fetch Trashes */
  /*                */
  public FetchTrashes(){
    const header = this.headerMaker(this.authService.authorHeader);
    this.httpClient.get<any>(this._apiUrlA + "FetchTrashes", header).subscribe(tr => {
      this.trashesList = tr;
      this.loadTrash.next(true);
    });
  }

      /*                */
    /* Create Article */
  /*                */
  public CreateArticle(article : Article){
    const header =this.headerMaker(this.authService.authorHeader);
    return this.httpClient.post(this._apiUrlA + "CreateArticle", article, header);
  }


      /*              */
    /* Edit Article */
  /*              */
  public EditArticle(article : Article){
    const header = this.headerMaker(this.authService.authorHeader);
    return this.httpClient.post(this._apiUrlA + "EditArticle", article, header);
  }

      /*               */
    /* Trash Article */
  /*               */
  public TrashArticle(article: Article) {
    const header = this.headerMaker(this.authService.authorHeader);
    return this.httpClient.post<any>(this._apiUrlA + "TrashArticle", article, header);
  }

/*               */
/* Trash Article */
/*               */
  public RetArticle(trash : Trash){
    const header = this.headerMaker(this.authService.authorHeader);
    return this.httpClient.post<any>(this._apiUrlA + "RetArticle", trash, header);
  }

      /*               */
    /* Erase Article */
  /*               */
  public EraseArticle(id:string){
    let ok = [['بستن', () => { }]];
    const header = this.headerMaker(this.authService.authorHeader);
    this.httpClient.post(this._apiUrlA + "EraseArticle", id, header)
      .subscribe(r => {
        if(r=="ok"){
          this.messageService.currentMessage.next(
            new Message(
              "مقاله به طور کامل از بانک اطلاعاتی حذف شد.",
              ok
            ));
          this.FetchArticles();
          this.FetchTrashes();
        }
      }, error => {
          this.messageService.currentMessage.next(
            new Message(
              "خطا در برقراری ارتباط با سرور...!",
              ok
            ));
      })

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
