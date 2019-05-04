import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable()

export class MessageService {

  public currentMessage = new Subject<Message>();

}
