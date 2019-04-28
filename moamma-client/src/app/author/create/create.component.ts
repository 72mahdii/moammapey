import { Component, OnInit } from '@angular/core';

import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
// import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { Article } from 'src/app/models/article.model';
import { AuthService } from 'src/app/services/auth.service';
import { AuthorPanelService } from 'src/app/services/author.service';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public article : Article = new Article("","","","","");
  public decoupleEditor = DecoupledEditor;

  constructor(
    private authService : AuthService,
    private authorPanelService : AuthorPanelService
  ) { }

  ngOnInit() {
  }


  public onReady(editor) {
    editor.font
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  public onConfig = {
    fontFamily: {
      options: [
        'default',
        'B_Esfehan'
      ]
    },
    ckfinder: {uploadUrl: "http://localhost:5050/api/administration/ckimage"}
  };

}
