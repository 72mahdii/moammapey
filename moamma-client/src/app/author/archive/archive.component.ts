import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }


  /* Message Functions */
  sendFunc(id, el) {
    var att = document.createAttribute("href");
    att.value = "/administration/sendarticle/" + id;
    document.getElementById("okbtn").setAttributeNode(att);
    $(".text-message").text("آیا از ارسال این مقاله روی بلاگ مطمئن هستید؟");
    document.getElementById("message_dialog").style.opacity = "1";
    document.getElementById("message_dialog").style.visibility = "visible";
  }

  onCancel(){
    document.getElementById("message_dialog").style.opacity = "0";
    document.getElementById("message_dialog").style.visibility = "hidden";
  }

}
