import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-images',
  templateUrl: './show-images.component.html',
  styleUrls: ['./show-images.component.css']
})
export class ShowImagesComponent implements OnInit {
  imagesGalery = new Array(100);
  constructor() { }

  ngOnInit(): void {
  }

}
