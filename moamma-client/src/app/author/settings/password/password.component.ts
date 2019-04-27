import { Component, OnInit } from '@angular/core';
import { Password } from 'src/app/models/password.model';
import { MessageService } from 'src/app/services/message.service';
import { Message, MessageButton } from 'src/app/models/message.model';
import { AuthorPanelService } from 'src/app/services/author.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  public password : Password = new Password("","");
  public formValid :boolean = false;

  constructor(
    private messageService : MessageService,
    private authorPanel : AuthorPanelService,
    private router : Router
  ) { }

  ngOnInit() {
  }


  onChange(){
    if(this.password.newPass != this.password.repPass){
      this.formValid = false;
    }else {
      this.formValid = true;
    }
  }

  onSubmit(){
    var message = new Message(
      "از اعمال تغییرات مطمئن هستید؟",
      [
        new MessageButton("انصراف", 'refuse'),
        new MessageButton("بله", 'confirm')]
      );
      this.messageService.messageListener.next(message);
      this.messageService.response$.subscribe(result => {
        if(result =='confirm'){
          this.authorPanel.ChangePassowrd(this.password).subscribe(rs => {
            if(rs == "ok"){
              var msg = new Message(
                "رمزعبور با موفقیت بروزرسانی شد.",
                [new MessageButton("بستن", "confirm")]);
              this.messageService.messageListener.next(msg);
            }else {
              var msg = new Message(
                "خطادر بروزرسانی رمز عبور!",
                [new MessageButton("بستن", "confirm")]);
              this.messageService.messageListener.next(msg);
            }
            this.messageService.response$.subscribe(rst => {
              this.router.navigate(['../']);
            });
          });
        }
      });
    console.log(this.password);
    }

}
