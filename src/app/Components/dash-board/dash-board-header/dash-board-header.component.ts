import {Component, OnInit, Output, EventEmitter} from '@angular/core';


import {FormControl} from "@angular/forms";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";



@Component({
  selector: 'app-dash-board-header',
  templateUrl: './dash-board-header.component.html',
  styleUrls: ['./dash-board-header.component.css']
})
export class DashBoardHeaderComponent implements OnInit {
  @Output() wordFinding = new EventEmitter<{ indexWord: string, currentEntry: string }>();
  @Output() clickingButton = new EventEmitter();

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

  constructor(
    private breakpointObserver: BreakpointObserver,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
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
    // this.input_search = event.target.value;
    // this.wordSearch = event.target.value;
    // this.indexWord = this.wordSearch.substring(0, 1);
    // if (this.indexWord === '') {
    //   this.indexWord = 'a';
    // }
    // this.wordService.getWordsIndex(this.indexWord);
    // this.wordService.getWordListFromServer().subscribe((data => {
    //   this.words = data;
    // }))
  }

  onCurrentTest(){
    this.clickingButton.emit()
  }
}

//
