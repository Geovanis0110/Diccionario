import {Component, OnInit} from '@angular/core';
import {animate, keyframes, query, stagger, style, transition, trigger} from "@angular/animations";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {VIDEO_LIBRARY_ICON} from "../../Icons/icons";
import {MatDialog} from "@angular/material/dialog";
import {VideoModalComponent} from "../modals/video-modal/video-modal.component";
import { Router } from '@angular/router';


export interface videoWord{
  word: string,
  src: string
}

@Component({
  selector: 'app-show-videos',
  templateUrl: './show-videos.component.html',
  styleUrls: ['./show-videos.component.css'],
  animations: [
    trigger('slow-entry', [
      transition('* => *', [
        query(':enter', style({opacity: 0, transform: 'translateX(0)'})),
        query(':enter', stagger(300, [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateX(-75px)', offset: 0}),
            style({opacity: .5, transform: 'translateX(25px)', offset: .3}),
            style({opacity: 1, transform: 'translateX(0)', offset: 1})
          ]))
        ]))
      ])
    ])
  ]
})

export class ShowVideosComponent implements OnInit {
  videosGalery: Array<videoWord> = [
  ];
  videoUrl: string = `../../../assets/videos/a_`;

  videoIconImg: string = 'play_arrow';
  videoDisabled: boolean = true;


  constructor(
    private route: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {
    iconRegistry.addSvgIconLiteral('video_library', sanitizer.bypassSecurityTrustHtml(VIDEO_LIBRARY_ICON));
  }

  ngOnInit(): void {
var palabras ="a_1.abrazar.a_2.absorber.a_3.afeitar.a_4.apagar.a_5.aplaudir.a_6.aplauso.a_7.ascender.a_8.aterrizaje.a_9.aterrizar." +
"b_1.bajar.b_2.barajar.b_3.batear.b_4.beber.b_5.besar.b_6.brincar."+
"c_1.calzar.c_2.caminar.c_3.cepillar.c_4.chapear.c_5.conectar.c_6.contar.c_7.correr.c_8.cortar."+
"d_1.descender.d_2.desconectar.d_3.despegar.d_4.despegue.e_1.encender.e_2.enchufar.e_3.escribir.e_4.estirar."+
"f_1.fumar.g_1.gatear.h_1.hablar.i_1.inflar.l_1.leer.m_1.manejar.n_1.nevar.o_1.ondear.p_1.parpadear.p_2.pestañear.p_3.pintar.p_4.planchar.r_1.rasurar.r_2.recitar.s_1.saltar.s_2.saludar.s_3.sonreír.s_4.soplar.s_5.subir.s_6.suiza.t_1.tachar";
var ar= palabras.split(".");
for(let i= 0; i<ar.length; i+=2){
  this.videosGalery.push({
    word: ar[i+1],
    src: `../../../assets/videos/` + ar[i]+`.webm`
  });

}



 }
/*
*/

onShowWord(word: string) {
  this.route.navigate(['/diccionario', word]);
}

  onOpenVideo(videoSrc: string){
    this.dialog.open(VideoModalComponent, {data: videoSrc});
  }


}
