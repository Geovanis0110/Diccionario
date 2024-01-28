import { Component, OnInit } from '@angular/core';
import { animate, keyframes, query, stagger, style, transition, trigger } from "@angular/animations";
import {MatDialog} from "@angular/material/dialog";
import {DomSanitizer} from "@angular/platform-browser";
import {PHOTO_LIBRARY_ICON} from "../../Icons/icons";
import {MatIconRegistry} from "@angular/material/icon";
import { ImageModalComponent } from "../modals/image-modal/image-modal.component";
import { Router } from '@angular/router';


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
  imgTry: imgWord = { word: '', img: '' }
  url: string = '';
  imagesGalery: Array<imgWord> = [
    {
      word: 'aborigen',
      img: '../../../assets/img/a_10.jpg'
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
    },
    {
      word: 'albahaca',
      img: '../../../assets/img/albahaca.jpg'
    },
    {
      word: 'album',
      img: '../../../assets/img/album.jpg'
    },
    {
      word: 'alfil',
      img: '../../../assets/img/alfil.jpg'
    },
    {
      word: 'alga',
      img: '../../../assets/img/alga.jpg'
    },{
      word: 'algarrobo',
      img: '../../../assets/img/algarrobo.jpg'
    },{
      word: 'alicate',
      img: '../../../assets/img/alicate.jpg'
    },{
      word: 'alimento',
      img: '../../../assets/img/alimento.jpg'
    },{
      word: 'almuerzo',
      img: '../../../assets/img/almuerzo.jpg'
    },
    {
      word: 'alpargata',
      img: '../../../assets/img/alpargata.jpg'
    },
    {
      word: 'amapola',
      img: '../../../assets/img/amapola.jpg'
    },
    {
      word: 'amiguito',
      img: '../../../assets/img/amiguito.jpg'
    },
    {
      word: 'amistad',
      img: '../../../assets/img/amistad.jpg'
    },{
      word: 'amor',
      img: '../../../assets/img/amor.jpg'
    },
    {
      word: 'anciano',
      img: '../../../assets/img/anciano.jpg'
    },
    {
      word: 'animal',
      img: '../../../assets/img/animal.jpg'
    },{
      word: 'antifaz',
      img: '../../../assets/img/antifaz.jpg'
    },{
      word: 'anzuelo',
      img: '../../../assets/img/anzuelo.jpg'
    },{
      word: 'arcoiris',
      img: '../../../assets/img/arcoiris.jpg'
    },{
      word: 'armario',
      img: '../../../assets/img/armario.jpg'
    },{
      word: 'arrecife',
      img: '../../../assets/img/arrecife.jpg'
    },{
      word: 'arroz',
      img: '../../../assets/img/arroz.jpg'
    },{
      word: 'artesano',
      img: '../../../assets/img/artesano.jpg'
    },{
      word: 'asar',
      img: '../../../assets/img/asar.jpg'
    },{
      word: 'astro',
      img: '../../../assets/img/astro.jpg'
    },{
      word: 'astronauta',
      img: '../../../assets/img/astronauta.jpg'
    },{
      word: 'atrapar',
      img: '../../../assets/img/atrapar.jpg'
    },{
      word: 'aula',
      img: '../../../assets/img/aula.jpg'
    },{
      word: 'azahar',
      img: '../../../assets/img/azahar.jpg'
    },{
      word: 'azul',
      img: '../../../assets/img/azul.jpg'
    },{
      word: 'babero',
      img: '../../../assets/img/babero.jpg'
    },{
      word: 'bailarina',
      img: '../../../assets/img/bailarina.jpg'
    },{
      word: 'baloncesto',
      img: '../../../assets/img/baloncesto.jpg'
    },{
      word: 'balonmano',
      img: '../../../assets/img/balonmano.jpg'
    },{
      word: 'balsa',
      img: '../../../assets/img/balsa.jpg'
    },{
      word: 'bandeja',
      img: '../../../assets/img/bandeja.jpg'
    },{
      word: 'barba',
      img: '../../../assets/img/barba.jpg'
    },{
      word: 'barbero',
      img: '../../../assets/img/barbero.jpg'
    },{
      word: 'barrena',
      img: '../../../assets/img/barrena.jpg'
    },{
      word: 'barrendero',
      img: '../../../assets/img/barrendero.jpg'
    },{
      word: 'bate',
      img: '../../../assets/img/bate.jpg'
    },{
      word: 'batear',
      img: '../../../assets/img/batear.jpg'
    },{
      word: 'batido',
      img: '../../../assets/img/batido.jpg'
    },{
      word: 'beisbol',
      img: '../../../assets/img/beisbol.jpg'
    },{
      word: 'berenjena',
      img: '../../../assets/img/berenjena.jpg'
    },{
      word: 'berro',
      img: '../../../assets/img/berro.jpg'
    },{
      word: 'biajaca',
      img: '../../../assets/img/biajaca.jpg'
    },{
      word: 'bijirita',
      img: '../../../assets/img/bijirita.jpg'
    },{
      word: '',
      img: '../../../assets/img/.jpg'
    },{
      word: '',
      img: '../../../assets/img/.jpg'
    },{
      word: '',
      img: '../../../assets/img/.jpg'
    },{
      word: '',
      img: '../../../assets/img/.jpg'
    },{
      word: '',
      img: '../../../assets/img/.jpg'
    },
  ]
  imgArray: Array<imgWord> = [];

  constructor(
    private route: Router,
    public dialog: MatDialog,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIconLiteral('photo_library', sanitizer.bypassSecurityTrustHtml(PHOTO_LIBRARY_ICON));
  }

  ngOnInit(): void {
  }

  onOpenImage(imgSrc: imgWord){
    this.dialog.open(ImageModalComponent, {data: imgSrc.img});
  }

  onListAllImages() {
  }
  onShowWord(word: string) {
    this.route.navigate(['/diccionario', word]);
  }
}
