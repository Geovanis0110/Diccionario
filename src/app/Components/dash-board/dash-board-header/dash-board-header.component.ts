import {Component, OnInit, DoCheck, Output, EventEmitter} from '@angular/core';



import {FormControl} from "@angular/forms";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-dash-board-header',
  templateUrl: './dash-board-header.component.html',
  styleUrls: ['./dash-board-header.component.css'],
})

export class DashBoardHeaderComponent implements OnInit{
  @Output() wordFinding = new EventEmitter<{ indexWord: string, currentEntry: string }>();
  @Output() selectModeSignal = new EventEmitter<{selMod: string}>();
  isHandSet: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(results => results.matches),
      shareReplay()
    );
  tempWord: string = '';
  count: number = 0;
  indexWord: string = '';
  wordID: string = '';
  wordSearch: string = '';
  input_search: boolean = false;
  hiddenSelect = new FormControl(false);
  disableSelect: boolean = false;
  queryServer: XMLHttpRequest = new XMLHttpRequest();
  description: string | null = '';
  panelOpenState: boolean = false;
  hideSelect!: boolean;
  underInputLetter: string = '';
  selectMode: string = '';


  constructor(
    private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
  }

  onSelectMode(e: MatSelectChange){
    this.selectMode = e.value;
    this.selectModeSignal.emit({selMod:this.selectMode});
  }

  setDisabledTrue() {
    this.disableSelect = true;
  }

  onCurrentSearch(event: Event): void {
    this.tempWord = (event.target as HTMLInputElement).value.toLowerCase();
    this.indexWord = this.tempWord.substring(0, 1);
    if (this.indexWord == '') {
      this.indexWord = 'a';
    }
    let standardWord: string = this.onNormalizeWord(this.indexWord);
    this.wordFinding.emit({indexWord: standardWord, currentEntry: this.tempWord})
  }

  onKeyboardLetter(e: Event, myInput: HTMLInputElement) {
    console.log((e.target as HTMLButtonElement).textContent);
    let letterValue: any = (e.target as HTMLButtonElement).textContent;
    if (letterValue != null) {
      this.underInputLetter = letterValue;
      myInput.value += this.underInputLetter;
    }
  }

  onNormalizeWord(letter: string): string {
    if (letter == 'á') {
      letter = 'a';
    } else if (letter == 'é') {
      letter = 'e';
    } else if (letter == 'í') {
      letter = 'i';
    } else if (letter == 'ó') {
      letter = 'o'
    } else if (letter == 'ú') {
      letter = 'u';
    } else if (letter == 'ü') {
      letter = 'u';
    } else if (letter == 'ñ') {
      letter = 'ny';
    }
    console.log(letter)
    return letter;
  }

}

