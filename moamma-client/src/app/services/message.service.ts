import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from 'rxjs';
import { Message, MessageButton } from '../models/message.model';

@Injectable()

export class MessageService {

      /*                       */
     /* Properties and Fields */
    /*                       */
  //#region                 */
  public messageListener = new BehaviorSubject<Message>(null);
  public messageListener$ = this.messageListener.asObservable();

  public response = new BehaviorSubject<string>(null);
  public response$ = this.response.asObservable();

  public messageNotif = new Subject<Message>();
  public responseNotif = new Subject<string>();
  //#endregion
  /*_______________________*/

  public CreateMessage(text: string, btn1 : MessageButton, btn2? : MessageButton){
    var msg: Message;
    if(btn2 == undefined){
      msg = new Message(text,[btn1]);
    }else {
      msg = new Message(text, [btn1, btn2]);
    }
    // this.messageListener.next(msg);
    this.messageNotif.next(msg);
  }
}
