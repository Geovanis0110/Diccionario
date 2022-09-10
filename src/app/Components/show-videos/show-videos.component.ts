import {Component, OnInit} from '@angular/core';



@Component({
  selector: 'app-show-videos',
  templateUrl: './show-videos.component.html',
  styleUrls: ['./show-videos.component.css']
})

export class ShowVideosComponent implements OnInit {
  videosGalery = new Array(100);
  videoUrl: string = '../../../assets/videos/video.mp4';

  videoIconImg: string = 'play_arrow';
  videoDisabled: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
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
