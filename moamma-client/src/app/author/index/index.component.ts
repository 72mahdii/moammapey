    /*---------*/
  /* Imports */
/*---------*/
//#region
import { Component, OnInit } from '@angular/core';
import { FooterService } from 'src/app/services/footer.service';
import { AuthorPanelService } from 'src/app/services/author.service';
import { MessageService } from 'src/app/services/message.service';
import { MessageButton } from 'src/app/models/message.model';
//#endregion


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {

    /*-------------------------*/
   /* Construct and ngOnInit */
  /*-----------------------*/
  //#region
  constructor(
    private _footerService: FooterService,
    private _authorPanel : AuthorPanelService,
    private _messageService: MessageService
    ) { }

  ngOnInit() {
    this._footerService.state.next(false);
    this._authorPanel.FetchArticles().subscribe(articles => {
      if(articles != null){
        this._authorPanel.articlesList = articles;
        document.getElementById('pop').classList.remove('hide');
        document.getElementById('pop').classList.add('show');
      }
    }, (error) => {
      this._messageService.CreateMessage('خطا در بارگزاری اطلاعات!', new MessageButton("بستن", "refuse"));
    });
  }
  //#endregion

    /*---------------------*/
   /* Methods and Events */
  /*-------------------*/
  //#region
  onClose() {
    document.getElementById('pop').classList.add('hide');
    document.getElementById('pop').classList.remove('show');
  }
  //#endregion
}
