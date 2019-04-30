    /*           */
   /* Imports  */
  /*         */
 //#region */
import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { AuthorPanelService } from 'src/app/services/author.service';
import { MessageService } from 'src/app/services/message.service';
import { Message, MessageButton } from 'src/app/models/message.model';
import { Router } from '@angular/router';
//#endregion
/*_______*/


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
    private messageService : MessageService,
    private router : Router
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
                                new MessageButton("انصراف", "refuse"),
                                new MessageButton("بله", "confirm")
                              ]);
    this.messageService.messageListener.next(message)
    this.messageService.response$.subscribe(result => {
      if(result == "confirm"){
        if(this.uploadedImage !=null){
          this.authorPanel.changeAvatar(this.uploadedImage).subscribe(rs => {
            if(rs == "ok"){
              var msg = new Message(
                "تصویر پروفایل با موفقیت بروزرسانی شد.",
                [new MessageButton("بستن", "confirm")]);
              this.messageService.messageListener.next(msg);
              this.messageService.response$.subscribe(result => {
                this.messageService.messageListener.unsubscribe();
              });
            }else {
              var msg = new Message(
                "خطا در بروز رسانی تصویر پروفایل!",
                [new MessageButton("بستن", "confirm")]);
              this.messageService.messageListener.next(msg);
              this.messageService.response$.subscribe(result => {
                this.messageService.messageListener.unsubscribe();
              });
            }

          });
        }
      }
    });
  }
  //#endregion
/*____________________*/


}
