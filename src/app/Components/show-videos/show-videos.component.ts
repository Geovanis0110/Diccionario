import {Component, OnInit} from '@angular/core';
import {animate, keyframes, query, stagger, style, transition, trigger} from "@angular/animations";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {VIDEO_LIBRARY_ICON} from "../../Icons/icons";
import {MatDialog} from "@angular/material/dialog";
import {VideoModalComponent} from "../modals/video-modal/video-modal.component";



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
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {
    iconRegistry.addSvgIconLiteral('video_library', sanitizer.bypassSecurityTrustHtml(VIDEO_LIBRARY_ICON));
  }

  ngOnInit(): void {
    for (let i = 0; i < 9; i++){
      this.videosGalery.push({
        word: 'palabra#' + i,
        src: `../../../assets/videos/a_${i+1}.swf`
      });
    }
  }

  onOpenVideo(videoSrc: string){
    this.dialog.open(VideoModalComponent, {data: videoSrc});
  }

}
