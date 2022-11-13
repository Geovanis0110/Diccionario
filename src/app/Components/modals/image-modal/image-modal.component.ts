import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {CLOSE_ICON} from "../../../Icons/icons";



@Component({
  selector: 'image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})

export class ImageModalComponent implements OnInit{
  imgSrc: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIconLiteral('close', sanitizer.bypassSecurityTrustHtml(CLOSE_ICON));
  }

  ngOnInit() {
    this.imgSrc = this.data;
  }
}
