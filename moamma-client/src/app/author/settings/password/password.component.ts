import { Component, OnInit } from '@angular/core';
import { Password } from 'src/app/models/password.model';
import { MessageService } from 'src/app/services/message.service';
import { Message } from 'src/app/models/message.model';
import { AuthorPanelService } from 'src/app/services/author.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
    /*------------------------*/
   /* Properties and Fields */
  /*----------------------*/
  //#region
  public password : Password = new Password("","");
  public formValid :boolean = false;

  //#endregion

    /*-------------------------*/
   /* Construct and ngOnInit */
  /*-----------------------*/
  //#region
  constructor(
    private _messageService : MessageService,
    private _authorPanel : AuthorPanelService,
    private _router : Router
  ) { }

  ngOnInit() {
  }
//#endregion

  /*---------------------*/
 /* Methods and Events */
/*-------------------*/
//#region
  onChange(){
    if(this.password.newPass != this.password.repPass){
      this.formValid = false;
    }else {
      this.formValid = true;
    }
  }

  onSubmit(){
    let ok = [['بستن', ()=>{}]];
    let conf = [
      ['انصراف', ()=>{}],
      ['بله', ()=> {
        this._authorPanel.ChangePassowrd(this.password).subscribe(rs => {
          if (rs == "ok") {
            this._messageService.currentMessage.next(
              new Message(
                "رمز عبور بروز رسانی شد.",
                ok
              ));
          } else {
            this._messageService.currentMessage.next(
              new Message(
                "خطا در بروزرسانی رمز عبور",
                ok
              ));
          }
        });
      }]
    ];
    this._messageService.currentMessage.next(
      new Message(
        "اعلام تغییرات رمزعبور؟",
        conf
      ));
  }
  //#endregion
}
