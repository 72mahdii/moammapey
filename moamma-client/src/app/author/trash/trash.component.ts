import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    Functionate.dismis();
  }

  restoreFunc(id, el) {
    var att = document.createAttribute("href");
    att.value = "/administration/restoretrash/" + id;
    document.getElementById("okbtn").setAttributeNode(att);
    $(".text-message").text("آیا بازیابی این مقاله مطمئن هستید؟");
    document.getElementById("message_dialog").style.opacity = "1";
    document.getElementById("message_dialog").style.visibility = "visible";
  }

  deleteFunc(id, el) {
    var att = document.createAttribute("href");
    att.value = "/administration/cleartrash/" + id;
    document.getElementById("okbtn").setAttributeNode(att);
    $(".text-message").text("آیا از حذف این مقاله مطمئن هستید؟");
    document.getElementById("message_dialog").style.opacity = "1";
    document.getElementById("message_dialog").style.visibility = "visible";
  }

}

class Functionate{

   static dismis(){
    document.getElementById("cancelbtn").onclick = function () {
      document.getElementById("message_dialog").style.opacity = "0";
      document.getElementById("message_dialog").style.visibility = "hidden";
    }
  }
}
