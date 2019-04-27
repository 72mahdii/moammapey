  /*           */
 /*  Imports  */
/*           */
//#region
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  UserManager,
  UserManagerSettings,
  User,
  WebStorageStateStore,
  } from "oidc-client";
  import { BehaviorSubject } from 'rxjs';
//#endregion


@Injectable()
  export class AuthService {

      /*                       */
     /*  Property and Fields  */
    /*                       */
    //#region
    private _manager = new UserManager(getClientSettings());
    private _user :User = null;
    private _authState = new BehaviorSubject<boolean>(false);
    public authState$ = this._authState.asObservable();
    //#endregion


      /*               */
     /*  Constructor  */
    /*               */
    //#region
    constructor(private http: HttpClient){
      this._manager.getUser().then(user=> {
        this._user = user;
        this._authState.next(this.isAuth());
      })
    }
    //#endregion


      /*         */
     /* Methods */
    /*         */
    //#region

    /*>>>> Checkout Authentication <<<<*/
    public isAuth() : boolean{
      return this._user !=null  && !this._user.expired;
    }

    /*>>>> Login <<<<*/
    public login(){
      return this._manager.signinRedirect();
    }

    /*>>>> Registration <<<<*/
    public register(){}

    /*>>>> Sign Out <<<<*/
    public signOut(){}

    /*>>>> Get Authorization Header <<<<*/
    get authorHeader(){
      return `${this._user.token_type} ${this._user.access_token}`;
    }

    /*>>>> Complete the Authentication <<<<*/
    async completeAuth(){
      this._user = await this._manager.signinRedirectCallback();
      this._authState.next(this.isAuth());
    }

    /*>>>> Checkout Authentication <<<<*/
    checkoutUser(){
      this._manager.getUser().then(user => {
        this._user = user;
        this._authState.next(this.isAuth());
      })
    }
    //#endregion

  }

  export function getClientSettings() : UserManagerSettings{
    return {
      authority: "http://localhost:5000",
      client_id: "moamma_spa",
      redirect_uri: 'http://localhost:4200/auth-callback',
      post_logout_redirect_uri: 'http://localhost:4200/authors/index/',
      response_type : "id_token token",
      scope: "openid profile email api.read",
      filterProtocolClaims: true,
      userStore:
        new WebStorageStateStore({ store: window.localStorage }),
      loadUserInfo : true,
      automaticSilentRenew: true,
      silent_redirect_uri: "http://localhost:4200/silent-refresh.html"
    };
  }
