import {Component, OnInit, Input, DoCheck} from '@angular/core';
import {WebRequestService} from "../../../Services/web-request.service";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

type wordAttributes = {
  word: string,
  def: string,
  eg: string;
  notes: string,
  gramGrp: string,
  pos: string,
};

@Component({
  selector: 'app-dash-board-content',
  templateUrl: './dash-board-content.component.html',
  styleUrls: ['./dash-board-content.component.css'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1})),
      transition('void => *', [
        animate('2s ease-in', keyframes([
          style({opacity: 0, transform: 'translateX(75px)', offset: 0}),
          style({opacity: .5, transform: 'translateX(-25px)', offset: .3}),
          style({opacity: 1, transform: 'translateX(0)', offset: 1})
        ]))
      ])
    ])
  ]
})
export class DashBoardContentComponent implements OnInit, DoCheck{
  @Input('selectionClicked') selectClick: boolean = false;
  @Input('wordsArray') wordList: wordAttributes[] = [];
  wordArrayFinal: wordAttributes[] = [];
  table: string = '';


  constructor(private webService: WebRequestService) {

  }

  ngOnInit(): void {

  }
  ngDoCheck() {
    const asTable = document.getElementById('this');
    this.table = this.webService.sendTable();
    if(asTable != null){
      asTable.innerHTML = this.table;
    }
  }
}
