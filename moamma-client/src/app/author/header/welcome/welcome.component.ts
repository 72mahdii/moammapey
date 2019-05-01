import { Component, OnInit } from '@angular/core';
import { AuthorPanelService } from 'src/app/services/author.service';
import { Author } from "src/app/models/author.model"

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public author: Author;

  constructor(
    private authorPanel : AuthorPanelService
  ) { }

  ngOnInit() {
    this.authorPanel.FetchAuthor().subscribe(author => {
      this.author = author;
    })
  }

}
