import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { AuthorPanelService } from 'src/app/services/author.service';
import { MessageService } from 'src/app/services/message.service';
import { Message, MessageButton } from 'src/app/models/message.model';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

    /*                       */
   /* Properties and Fields */
  /*                       */
 //#region                */

  public imageSrc : any;
  public uploadedImage : File = null;

//#endregion
/*_______________________*/

    /*                          */
   /* Constructor and ngOnInit */
  /*                          */
 //#region                   */
  constructor(
    private authorPanel : AuthorPanelService,
    private messageServcie : MessageService
    ) { }

  ngOnInit() {
  }
  //#endregion
/*_______________________   */


    /*                    */
   /* Methods and Events */
  /*                    */
 //#region             */
  onUploadMyImg(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
      this.uploadedImage = file;
    }
  }
  onSubmit(){
    var message = new Message(
                              "آیا از تغییر آواتار مطمئن هستید؟",
                              [
                                new MessageButton("انصراف", 0),
                                new MessageButton("بله", 1)
                              ]);
    this.messageServcie.messageListener.next(message)
    this.messageServcie.response$.subscribe(result => {
      if(result == "confirm"){
        if(this.uploadedImage !=null){
          this.authorPanel.changeAvatar(this.uploadedImage);
        }
      }
    });
  }
  //#endregion
/*____________________*/


}
