  /*--------  */
 /* Imports */
/*--------*/
//#region
import { Component, OnInit } from '@angular/core';

import { Article, ArticleModel } from 'src/app/models/article.model';
import { AuthService } from 'src/app/services/auth.service';
import { AuthorPanelService } from 'src/app/services/author.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Message, MessageButton } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';
//#endregion


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

    /*------------------------*/
   /* Properties and Fields */
  /*----------------------*/
  //#region
  public article : Article = new Article("", "", "", "", "", false) ;
  public articleForm: FormGroup ;
  /*_________Rich Text Config_________*/
  public onConfig = {
    height: "30rem",
    background: "#fff",
    uploadImagePath: 'http://localhost:5050/api/administration/TextEditorImage',
    toolbar: [
      ['misc', ['undo', 'redo']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['insert', ['ltr', 'rtl']],
      ['para', ['paragraph', 'height', 'ul', 'ol', 'style']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']],
      ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
      ['float', ['floatLeft', 'floatRight', 'floatNone']],
      ['remove', ['removeMedia']],
      ['view', ['fullscreen', 'codeview']]
    ],
    fontNames: [
                'B_Nazanin', 'B_Zar', 'B_Esfehan', 'B_Mitra',
                'B_Lotus', 'B_Titr', 'A_Dast_Nevis', 'B_Yas',
                'A_Mashin_Tahrir' , 'A_Hakim_Ghazali', 'Far_Cairo',
                'JMH_Typewriter', , 'Guardians'  ],
    fontNamesIgnoreCheck: [
                'B_Nazanin', 'B_Zar', 'B_Esfehan', 'B_Mitra',
                'B_Lotus', 'B_Titr', 'A_Dast_Nevis', 'B_Yas',
                'A_Mashin_Tahrir', 'A_Hakim_Ghazali', 'Far_Cairo',
                'JMH_Typewriter', , 'Guardians'],
  };
  public config_show = {
    height: "70rem",
    background: "#444",
    toolbar: [],
  }
  //#endregion

    /*---------------------------*/
   /* Constructor and ngOnInit */
  /*-------------------------*/
  //#region
  constructor(
    private authService : AuthService,
    private authorPanelService : AuthorPanelService,
    private messageService : MessageService,
    private router : Router
  ) {
    this.articleForm =  new FormGroup({
      "title": new FormControl(
                                null,
                                [
                                  Validators.required,
                                  Validators.minLength(5)
                                ]),
      "tag": new FormControl('تگ مقاله', [Validators.required]),
      "category": new FormControl('دسته بندی مقاله',[Validators.required]),
      "summary": new FormControl('', [Validators.required]),
      "content": new FormControl('', [Validators.required])
    });// End Of Form Group
  }

  ngOnInit() {
  }
//#endregion

    /*---------------------*/
   /* Methods and Events */
  /*-------------------*/
  //#region
  public onSubmit(archive? : string){
    /*___Creatation Message___*/
    this.messageService.CreateMessage(
      'آیا از ایجاد این مقاله مطمئن هستید؟',
      new MessageButton("بله", "confirm"),
      new MessageButton("انصراف", "refuse")
    );
      this.messageService.responseNotif.subscribe(res => {
        if(res == "confirm"){
          /*___Create Article___*/
          this.article = new ArticleModel(
            this.articleForm.controls['title'].value,
            this.articleForm.controls['category'].value,
            this.articleForm.controls['tag'].value,
            this.articleForm.controls['summary'].value,
            this.articleForm.controls['content'].value,
            archive ==undefined ? false : true
          );
          /*___Send Article To Server___*/
          this.authorPanelService.CreateArticle(this.article)
                            .subscribe(result => {
            if (result = "ok") {
              this.messageService.CreateMessage(
                'مقاله مورد نظر با موفقیت ایجاد شد.',
                new MessageButton("بستن", "refuse")
              );
              this.router.navigate(['authors','index']);
            }
          },error => {
            /*___Server Error Message___*/
            this.messageService.CreateMessage(
              "خطا در ارسال مقاله..!",
                new MessageButton("بستن", "refuse")
            );

          });
        }
      }, error => {
      });

  }

  public onClosePreShow(){
    document.getElementById("home").classList.add("close-it");
    document.getElementById("home").classList.remove("show-it");
  }

  public onShowPreShow(){
    this.article = new ArticleModel(
      this.articleForm.controls['title'].value,
      this.articleForm.controls['category'].value,
      this.articleForm.controls['tag'].value,
      this.articleForm.controls['summary'].value,
      this.articleForm.controls['content'].value,
      false
    );
    document.getElementById("home").classList.remove("close-it");
    document.getElementById("home").classList.add("show-it");
  }
  //#endregion
}
