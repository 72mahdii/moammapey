    /*---------*/
  /* Imports */
/*---------*/
//#region
import { Component, OnInit } from '@angular/core';
import { AuthorPanelService } from 'src/app/services/author.service';
import { Article } from 'src/app/models/article.model';
import { MessageService } from 'src/app/services/message.service';
import { MessageButton } from 'src/app/models/message.model';
//#endregion


@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {

    /*------------------------*/
   /* Properties and Fields */
  /*----------------------*/
  public articlesList : Article[] =[];


    /*---------------------------*/
   /* Constructor and ngOnInit */
  /*-------------------------*/
  //#region Constructor and ngOnInit
  constructor(
    private authorPanel: AuthorPanelService,
    private messageService : MessageService
    ) { }

  ngOnInit() {
    this.articlesList = this.authorPanel.articlesList;
  }
  //#endregion

}
