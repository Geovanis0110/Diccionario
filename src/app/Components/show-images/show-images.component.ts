import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-images',
  templateUrl: './show-images.component.html',
  styleUrls: ['./show-images.component.css']
})
export class ShowImagesComponent implements OnInit {
  imagesGalery: string [] = [
    'https://th.bing.com/th/id/R.efd1a47904a80c58e7f985f925167f52?rik=CJQiQU%2bCzR2wnA&riu=http%3a%2f%2fwww.cenart.gob.mx%2fwp-content%2fuploads%2f2014%2f10%2fgaleria_central_01.jpg&ehk=UyMgMfHnQDAm%2br6w7fqaZmVJZDcbzO5NNv8mVg4L3X8%3d&risl=&pid=ImgRaw&r=0',
    'https://www.topolino.es/wp-content/uploads/2020/09/WhatsApp-Image-2020-09-07-at-15.26.06-2.jpeg',
    'https://th.bing.com/th/id/R.fff7aa077469c36064c8184ac3dc522f?rik=jlqNz6h6sX%2f5vw&riu=http%3a%2f  %2fwww.cenart.gob.mx%2fwp-content%2fuploads   %2f2014%2f10%2fgaleria_central_02.jpg&ehk=lMwKXJiIL29Kf8nVc3HjgFuH5Q2OGTHkPWMcKj2dl     %2b0%3d&risl=&pid=ImgRaw&r=0',
    'https://conceptodefinicion.de/wp-content/uploads/2018/11/Galer%C3%ADa.jpg',
    'https://th.bing.com/th/id/R.d79fe9e341477721f32fe02c1287009c?rik=TqrOWQKSgT%2bi%2bw&riu=http%3a%2f%2fteatrobernal.com%2fwp-content%2fuploads%2f2020%2f01%2fD-3-1024x604.jpg&ehk=3ZBobO3Az4DzZdS9oHISZlG8omeqDYuYo0isaxqRUd4%3d&risl=&pid=ImgRaw&r=0',
    'https://www.tusoporteonline.es/blog/wp-content/uploads/2014/02/naturaleza.jpg',
    'https://www.tusoporteonline.es/blog/wp-content/uploads/2014/04/paisaje.jpg',
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
