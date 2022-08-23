import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
words= new Array(100)
  input_search=false;
  constructor() { }

  ngOnInit(): void {
  }

  onSearch(event: any) {
    console.log('Dime que tu tienes',event)
    this.input_search=event.target.value ;
  }
}
