    /*---------*/
  /* Imports */
/*---------*/
//#region
import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile.model';
import { Message } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/message.service';
import { AuthorPanelService } from 'src/app/services/author.service';
import { Router } from '@angular/router';
//#endregion


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  public profile : Profile  = new Profile("","","", "");

      /*------------------------*/
    /* Construct and ngOnInit */
  /*------------------------*/
  //#region
  constructor(
    private _messageService : MessageService,
    private _authorPanel : AuthorPanelService,
    private _router : Router
  ) { }

  ngOnInit() {
  }
  //#endregion

    /*--------------------*/
  /* Methods and Events */
/*--------------------*/
//#region
  onSubmit(){

    let ok = [['بستن', ()=>{}]];
    let conf = [
      ['انصراف', ()=>{}],
      ['بله', ()=>{
        this._authorPanel.ChangeProfile(this.profile)
          .subscribe(rs => {
            if (rs == "ok") {
              this._messageService.currentMessage.next(
                new Message(
                  "تغییرات پروفایل با موفقیت انجام شد.",
                  ok
                ));
            } else {
              this._messageService.currentMessage.next(
                new Message(
                  "خطا در عملیات بروز رسانی پروفایل",
                  ok
                ));
            }
          }, error => {
            this._messageService.currentMessage.next(
                new Message(
                  "خطا در برقراری ارتباط با سرور",
                  ok
                ));
          });
      }]
    ];
    this._messageService.currentMessage.next(
      new Message(
        "اعمال تغییرات پروفایل؟",
        conf
      ));
  }
  //#endregion

}
