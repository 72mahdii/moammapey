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

  public article : Article = new Article("","","","","");

  constructor(
    private authService : AuthService,
    private authorPanelService : AuthorPanelService
  ) { }

  ngOnInit() {}


}
