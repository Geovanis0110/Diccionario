import { Component, OnInit } from '@angular/core';
import { animate, keyframes, query, stagger, style, transition, trigger } from "@angular/animations";
import {MatDialog} from "@angular/material/dialog";
import {DomSanitizer} from "@angular/platform-browser";
import {PHOTO_LIBRARY_ICON} from "../../Icons/icons";
import {MatIconRegistry} from "@angular/material/icon";
import {ImageModalComponent} from "../modals/image-modal/image-modal.component";


export interface imgWord{
  word: string,
  img: string
}

@Component({
  selector: 'app-show-images',
  templateUrl: './show-images.component.html',
  styleUrls: ['./show-images.component.css'],
  animations: [
    trigger('slow-entry', [
      transition('* => *', [
        query(':enter', style({opacity: 0, transform: 'translateY(0)'})),
        query(':enter', stagger(300, [
          animate('1.2s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75px)', offset: 0}),
            style({opacity: .5, transform: 'translateY(25px)', offset: .3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1})
          ]))
        ]))
      ])
    ])
  ]
})
export class ShowImagesComponent implements OnInit {
  overWord: boolean = false;
  imagesGalery: Array<imgWord> = [
    {
      word: 'aborigen',
      img: '../../../assets/img/aborigen.jpg'
    },
    {
      word: 'abotonar',
      img: '../../../assets/img/abotonar.jpg'
    },
    {
      word: 'acelga',
      img: '../../../assets/img/acelga.jpg'
    },
    {
      word: 'acero',
      img: '../../../assets/img/acero.jpg'
    },
    {
      word: 'agricultor',
      img: '../../../assets/img/agricultor.jpg'
    },
    {
      word: 'afeitar',
      img: '../../../assets/img/afeitar.jpg'
    },
    {
      word: 'agua',
      img: '../../../assets/img/agua.jpg'
    }
  ]

  constructor(
    public dialog: MatDialog,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIconLiteral('photo_library', sanitizer.bypassSecurityTrustHtml(PHOTO_LIBRARY_ICON));
  }

  ngOnInit(): void {
  }

  onOpenImage(imgSrc: string){
    this.dialog.open(ImageModalComponent, {data: imgSrc});
  }

  onShowWord(){
  }
}
