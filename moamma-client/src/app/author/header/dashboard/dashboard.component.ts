import { Component, OnInit } from '@angular/core';
import { AuthorPanelService } from 'src/app/services/author.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public archiveCounter: number =0;
  constructor(
    private _authorPanel : AuthorPanelService
  ) { }

  ngOnInit() {
    this.archiveCounter = this._authorPanel.archiveCounter;
    this._authorPanel.loadData.subscribe(rst => {
      this.archiveCounter = this._authorPanel.archiveCounter;
    })
  }

}
