import { Injectable } from "@angular/core";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { MessageService } from '../services/message.service';
import { MessageButton } from '../models/message.model';

@Injectable()

export class UnSaveGuard implements CanDeactivate<boolean> {

  constructor(
    private messageService : MessageService
  ){}

  canDeactivate(
    component : boolean,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ):   boolean  {
    var result =null;
    this.messageService.CreateMessage(
      "آیا از ترک این صفحه مطمئن هستید؟",
      new MessageButton("ماندن", "refuse"),
      new MessageButton("بله", "confirm")
    );
    /* Implement Unsave Guard */
    })
  }
}
