import {Component, OnInit} from '@angular/core';
import {animate, keyframes, query, stagger, style, transition, trigger} from "@angular/animations";



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
  videosGalery: Array<string> = [
  ];
  videoUrl: string = `../../../assets/videos/a_`;

  videoIconImg: string = 'play_arrow';
  videoDisabled: boolean = true;


  constructor() {
  }

  ngOnInit(): void {
    for (let i = 0; i < 9; i++){
      this.videosGalery.push(`../../../assets/videos/a_${i+1}.webm`);
    }
    
  }

  changeImg() {
    if (this.videoIconImg == 'play_arrow') {
      this.videoIconImg = 'pause';
      this.videoDisabled = false;
    } else {
      this.videoIconImg = 'play_arrow';
      this.videoDisabled = true;
    }
  }

}
