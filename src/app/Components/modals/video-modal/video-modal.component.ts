import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {CLOSE_ICON} from "../../../Icons/icons";


@Component({
  selector: 'video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.css']
})

export class VideoModalComponent implements OnInit{
  videoSrc: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ){
    iconRegistry.addSvgIconLiteral('close', sanitizer.bypassSecurityTrustHtml(CLOSE_ICON));
  }

  ngOnInit() {
    //parche para que salgan los videos , en realidad solo deberia ser la ultima linea
    //pero con esto garantiza que los videos sean .webm
    var src = this.data;
    var src1=src.split(".sw");
    if(src1[1]=="f")src=src1[0] + ".webm";
    console.log(this.data,"xxxx\n", src);
    this.videoSrc = src;
    //this.videoSrc = this.data;
  }
}
