import { Component, OnInit } from '@angular/core';

import { Article } from 'src/app/models/article.model';
import { AuthService } from 'src/app/services/auth.service';
import { AuthorPanelService } from 'src/app/services/author.service';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

    /*------------------------*/
   /* Properties and Fields */
  /*----------------------*/
  public article : Article = new Article('','none','none','','');

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

    /*---------------------------*/
   /* Constructor and ngOnInit */
  /*-------------------------*/
  constructor(
    private authService : AuthService,
    private authorPanelService : AuthorPanelService
  ) { }

  ngOnInit() {}


}
