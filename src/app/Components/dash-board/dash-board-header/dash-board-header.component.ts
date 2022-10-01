import {Component, OnInit, DoCheck, Output, EventEmitter} from '@angular/core';
import {SharedData} from "../../../Services/shared-data";


import {FormControl} from "@angular/forms";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";



@Component({
  selector: 'app-dash-board-header',
  templateUrl: './dash-board-header.component.html',
  styleUrls: ['./dash-board-header.component.css'],
})

export class DashBoardHeaderComponent implements OnInit, DoCheck {
  @Output() wordFinding = new EventEmitter<{ indexWord: string, currentEntry: string }>();

  isHandSet: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(results => results.matches),
      shareReplay()
    );
  tempWord: string;
  count: number;
  indexWord: string;
  wordID: string;
  wordSearch: string;
  input_search: boolean;
  hiddenSelect = new FormControl(false);
  disableSelect: boolean;
  queryServer: XMLHttpRequest = new XMLHttpRequest();
  description: string | null = '';
  panelOpenState: boolean = false;
  hideSelect!: boolean;


  constructor(
    private breakpointObserver: BreakpointObserver,
    private _shareD: SharedData) {
    this.tempWord = '';
    this.count = 0;
    this.wordID = '';
    this.wordSearch = '';
    this.indexWord = '';
    this.input_search = false;
    this.disableSelect = false;
  }

  ngOnInit(): void {
  }

  ngDoCheck() {
    this._shareD.behaviorSub.subscribe((item: boolean) => {
      this.hideSelect = item;
    })
  }

  setDisabledTrue() {
    this.disableSelect = true;
  }

  onCurrentSearch(event: any): void {
    this.tempWord = event.target.value;
    this.indexWord = this.tempWord.substring(0, 1);
    if (this.indexWord === '') {
      this.indexWord = 'a';
    }
    this.wordFinding.emit({indexWord: this.indexWord, currentEntry: this.tempWord})
  }
}

//
