import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile.model';
import { Message, MessageButton } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/message.service';
import { AuthorPanelService } from 'src/app/services/author.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profile : Profile  = new Profile("","","", "");

  constructor(
    private messageService : MessageService,
    private authorPanel : AuthorPanelService
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
    this.messageService.response$.subscribe(result=> {
      if(result == "confirm"){
        console.log(this.profile);
        this.authorPanel.ChangeProfile(this.profile);
      }
    })
  }

}
