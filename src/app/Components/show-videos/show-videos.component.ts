import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-videos',
  templateUrl: './show-videos.component.html',
  styleUrls: ['./show-videos.component.css']
})
export class ShowVideosComponent implements OnInit {
  videosGalery = new Array(100)
  constructor() { }
  ngOnInit(): void {
  }

}
