import { Injectable } from "@angular/core";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { MessageService } from '../services/message.service';

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
    return false
  }
}
