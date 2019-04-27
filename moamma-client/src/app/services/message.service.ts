import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { Message } from '../models/message.model';

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
  //#endregion
  /*_______________________*/
}
