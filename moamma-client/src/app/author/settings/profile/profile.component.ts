import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile.model';
import { Message, MessageButton } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/message.service';
import { AuthorPanelService } from 'src/app/services/author.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profile : Profile  = new Profile("","","", "");

  constructor(
    private messageService : MessageService,
    private authorPanel : AuthorPanelService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    var message = new Message(
      "تغییرات پروفایل اعمال شوند؟",
      [
        new MessageButton("انصراف", "refuse"),
        new MessageButton("تایید", "confirm")
      ]
    );
    this.messageService.messageListener.next(message);
    this.messageService.response$.subscribe(result => {
      if (result == "confirm") {
        this.authorPanel.ChangeProfile(this.profile)
          .subscribe(rs => {
            if (rs == "ok") {
              var msg = new Message(
                "اطلاعات پروفایل با موفقیت بروزرسانی شد.",
                [new MessageButton("بستن", "confirm")]);
              this.messageService.messageListener.next(msg);
              this.messageService.response$.subscribe(result => {
                this.messageService.messageListener.unsubscribe();
              });
            } else {
              var msg = new Message(
                "خطا در بروز رسانی اطلاعات پروفایل!",
                [new MessageButton("بستن", "confirm")]);
              this.messageService.messageListener.next(msg);
              this.messageService.response$.subscribe(result => {
                this.messageService.messageListener.unsubscribe();
              });

            }
          });
      }
    });
  }
}
