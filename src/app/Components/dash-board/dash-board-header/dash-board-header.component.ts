import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import * as MyIcons from "../../../Icons/icons";
import {ActivatedRoute} from '@angular/router';
import {EntryWordSuggestService} from "../../../Services/entry-word-suggest.service";
import {SharedData} from "../../../Services/shared-data.service";
import {SuggestType} from 'src/app/Interfaces/word.interface';


@Component({
  selector: 'app-dash-board-header',
  templateUrl: './dash-board-header.component.html',
  styleUrls: ['./dash-board-header.component.css'],
})

export class DashBoardHeaderComponent implements OnInit {
  @Output() wordFinding = new EventEmitter<{ indexWord: string, currentEntry: string }>();
  @Output() selectModeSignal = new EventEmitter<{ selMod: string }>();
  isHandSet: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(results => results.matches),
      shareReplay()
    );

  snapshotWord: string = '';
  tempWord: string = '';
  count: number = 0;
  indexWord: string = '';
  wordID: string = '';
  wordSearch: string = '';
  input_search: boolean = false;
  hiddenSelect = new FormControl(false);
  filterInput = new FormControl();
  regexpPattern: string = "[A-Za-z ]*";
  disableSelect: boolean = false;
  description: string | null = '';
  panelOpenState: boolean = false;
  hideSelect!: boolean;
  underInputLetter: string = '';
  selectMode: string = 'reg0';
  suggestions: any;
  suggestionsArray: Array<any> = [];


  constructor(
    private _shared: SharedData,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private _suggest: EntryWordSuggestService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral(
      'search',
      sanitizer.bypassSecurityTrustHtml(MyIcons.SEARCH_ICON));
  }

  ngOnInit(): void {
    this.snapshotWord = this.route.snapshot.params['word'];
    if (this.snapshotWord != undefined)
      this.onRouteSearch(this.snapshotWord);

  }

  onSelectMode(e: Event) {
    console.log((<HTMLSelectElement>e.target).value);
    this.selectMode = (<HTMLSelectElement>e.target).value;
    this.selectModeSignal.emit({selMod: this.selectMode});
  }

  setDisabledTrue() {
    this.disableSelect = true;
  }

  onCurrentSearch(myInput: HTMLInputElement): void {
    this.tempWord = myInput.value;
    this._suggest.onSupplySuggestions(this.tempWord);
    this._suggest.getSuggestionsFromServer().subscribe(arg => {
      this.suggestions = new DOMParser().parseFromString(arg, 'application/xml');
      this.suggestionsArray = Array.from((this.suggestions).querySelectorAll('option'));
      console.log(this.suggestionsArray);
      const result: Array<SuggestType> = [];
      this.suggestionsArray.forEach((item: any) => {
        result.push({
          word: item.textContent,
          id: item.value
        })
      })
      this._shared.suggestActivated.emit(result);
      this.tempWord.substring(0, 1) ? this.indexWord = this.tempWord.substring(0, 1) : this.indexWord = this.tempWord;
      if (this.indexWord == '') {
        this.indexWord = 'a';
      } else if (this.indexWord == '-') {
        this.indexWord = 'az';
      }
      let standardWord: string = this.onNormalizeWord(this.indexWord.toLowerCase());
      this.wordFinding.emit({indexWord: standardWord, currentEntry: this.tempWord});
      this.selectModeSignal.emit({selMod: this.selectMode});
    })
  }

  onRouteSearch(word: string) {
    this.tempWord = word;
    this.tempWord?.substring(0, 1) ? this.indexWord = this.tempWord?.substring(0, 1) : this.indexWord = this.tempWord;
    if (this.indexWord == '') {
      this.indexWord = 'a';
    } else if (this.indexWord == '-') {
      this.indexWord = 'az';
    }
    let standardWord: string = this.onNormalizeWord(this.indexWord?.toLowerCase());
    this.wordFinding.emit({indexWord: standardWord, currentEntry: this.tempWord});
    this.selectModeSignal.emit({selMod: this.selectMode});
  }

  onKeyboardLetter(e: Event, myInput: HTMLInputElement) {
    console.log((e.target as HTMLButtonElement).textContent);
    let letterValue: any = (e.target as HTMLButtonElement).textContent;
    if (letterValue != null) {
      this.underInputLetter = letterValue;
      myInput.value += this.underInputLetter;
    }
  }

  onNormalizeWord(letter
                    :
                    string
  ):
    string {
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

