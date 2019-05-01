import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from 'rxjs';
import { Message, MessageButton } from '../models/message.model';

@Injectable()

export class MessageService {

  public currentMessage = new Subject<Message>();

  //#region
  /*

  public message : Message = null;
  public messageNotif = new Subject<Message>();
  public responseNotif = new Subject<string>();
  public msgCome = new Subject<boolean>();
  //#endregion



  ngOnInit(){

  }
  public CreateMessage(text: string, btn1 : MessageButton, btn2? : MessageButton){
    var msg: Message;
    if(btn2 == undefined){
      msg = new Message(text,[btn1]);
    }else {
      msg = new Message(text, [btn1, btn2]);
    }
    // this.messageListener.next(msg);
    this.messageNotif.next(msg);
    this.messageNotif.subscribe(msg => {
      if (msg != null) {
        this.message = msg;
        this.msgCome.next(true);
      } else {
        this.message = null;
        this.messageNotif.next(null);
      }
    });
  }
*/
//#endregion
}
