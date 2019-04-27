import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

    /*                       */
   /* Properties and Fields */
  /*                       */
 //#region                 /

 public message : Message = null;

  //#endregion
/*_______________________*/


    /*                          */
   /* Constructor and ngOnInit */
  /*                          */
 //#region                    /

  constructor(private messageServcie: MessageService) { }

  ngOnInit() {
    this.messageServcie.messageListener$.subscribe(message => {
      this.message = message;
    });
  }

  //#endregion
/*__________________________*/


    /*                    */
   /* Methods And Events */
  /*                    */
 //#region              /

  onPushBtn(value: any) {
    this.messageServcie.response.next(value);
    this.onClose();
  }

  onClose() {
    this.message = null;
  }

//#endregion
/*____________________*/


}
