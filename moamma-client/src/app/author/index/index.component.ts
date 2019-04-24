import { Component, OnInit } from '@angular/core';
import { FooterService } from 'src/app/services/footer.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private _footerService: FooterService) { }

  ngOnInit() {
    this._footerService.state.next(false);
  }

}
