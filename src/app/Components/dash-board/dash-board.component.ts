import {Component, OnInit} from '@angular/core';
import {EntryWordListService} from '../../Services/entry-word-list.service';
import {TrasformDataJson} from '../../Services/transform-data-json.service';
import {SharedData} from '../../Services/shared-data.service';

import {animate, keyframes, query, stagger, style, transition, trigger,} from '@angular/animations';
import {AllWord, FinalWord} from '../../Interfaces/word.interface';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {MANAGE_SEARCH_ICON} from '../../Icons/icons';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
  //Animations
  animations: [
    trigger('slow-entry', [
      transition('* => *', [
        query(':enter', style({opacity: 0, transform: 'translateY(0)'})),
        query(
          ':enter',
          stagger(300, [
            animate(
              '1s ease-in',
              keyframes([
                style({
                  opacity: 0,
                  transform: 'translateY(-75px)',
                  offset: 0,
                }),
                style({
                  opacity: 0.5,
                  transform: 'translateY(35px)',
                  offset: 0.3,
                }),
                style({opacity: 1, transform: 'translateY(0)', offset: 1}),
              ])
            ),
          ])
        ),
      ]),
    ]),
  ],
})
export class DashBoardComponent implements OnInit {
  wordResults: Array<AllWord> = [];
  results: Array<AllWord> = [];
  indexWord: string = '';
  entry: string = '';
  input_search: boolean = false;
  wordArray: Array<FinalWord> = [];
  isNewSearch: boolean = false;
  selectionMode: string = 'reg0';
  activateMode: boolean = false;
  dontMatch: boolean = false;

  constructor(
    private queryService: EntryWordListService,
    private dataTransform: TrasformDataJson,
    public _sharedData: SharedData,
    private _snackbar: MatSnackBar,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIconLiteral(
      'manage_search',
      sanitizer.bypassSecurityTrustHtml(MANAGE_SEARCH_ICON)
    );
  }

  ngOnInit(): void {
    this._sharedData.advancedSearchActivated
      .subscribe((result) => {
        this.activateMode = result;
      });
  }

  onSelectionMode(selectMode: { selMod: string }) {
    this.selectionMode = selectMode.selMod;
  }

  onAlphaWords(alphaData: { apLetter: string }) {
    this.indexWord = alphaData.apLetter;
    if (this.selectionMode === 'reg0' || this.selectionMode === 'reg1') {
      this.queryService.setWordIndex(this.indexWord);
      this.isNewSearch = true;
      this.queryService.getWordList()
        .subscribe((data) => {
          const dataToParse = new DOMParser()
            .parseFromString(data, 'text/xml');
          this.wordResults = this.dataTransform.onTransformData(
            dataToParse,
            this.selectionMode
          );

        });
    } else if (this.selectionMode === 'reg2' || this.selectionMode === 'reg3') {
      this.queryService.setWordIndex('az');
      this.isNewSearch = true;
      this.queryService.getWordList()
        .subscribe((data) => {
          const dataToParse = new DOMParser()
            .parseFromString(data, 'text/xml');
          this.wordResults = this.dataTransform.onTransformData(
            dataToParse,
            this.selectionMode
          );
        });
    }
  }

  onSearch(headerData: { indexWord: string; currentEntry: string }): void {
    this.indexWord = headerData.indexWord;
    this.entry = headerData.currentEntry;
    if (this.selectionMode === 'reg0') {
      this.queryService.setWordIndex(this.indexWord);
      this.queryService.getWordList()
        .subscribe((data) => {
          const dataToParse = new DOMParser()
            .parseFromString(data, 'text/xml');
          this.wordResults = this.dataTransform
            .onTransformData(dataToParse, this.selectionMode)
            .filter((x) => x.word === this.entry);
          this.wordResults.length === 0 ? this.dontMatch = true : this.dontMatch = false;
          this._sharedData.strDontMatch.emit(this.dontMatch);
          this._sharedData.instantMatchSearch.next({match$: this.dontMatch, entry$: this.wordResults[0]});
        });
    } else if (this.selectionMode === 'reg1') {
      this.queryService.setWordIndex(this.indexWord);
      this.queryService.getWordList()
        .subscribe((data) => {
          const dataToParse = new DOMParser()
            .parseFromString(data, 'text/xml');
          this.wordResults = this.dataTransform
            .onTransformData(dataToParse, this.selectionMode)
            .filter((x) => x.word.startsWith(this.entry));
        });
    } else if (this.selectionMode === 'reg2') {
      this.queryService.setWordIndex('az');
      this.queryService.getWordList()
        .subscribe((data) => {
          const dataToParse = new DOMParser()
            .parseFromString(data, 'text/xml');
          this.wordResults = this.dataTransform
            .onTransformData(dataToParse, this.selectionMode)
            .filter((x) => x.word.includes(this.entry));
        });
    } else if (this.selectionMode === 'reg3') {
      this.queryService.setWordIndex('az');
      this.queryService.getWordList()
        .subscribe((data) => {
          const dataToParse = new DOMParser().parseFromString(data, 'text/xml');
          this.wordResults = this.dataTransform
            .onTransformData(dataToParse, this.selectionMode)
            .filter((x) => x.word.endsWith(this.entry));
        });
    }
  }

  onClickButton(ifoData: { onClicked: boolean; wordArray: Array<FinalWord> }) {
    this.input_search = ifoData.onClicked;
    this.wordArray = ifoData.wordArray;
    console.log(this.wordArray);
  }
/*   handleTouchStart( ifoData: { onClicked: boolean; wordArray: Array<FinalWord> }) {
    this.onClickButton(ifoData);
  } */

  onAdvActivate(e: MatCheckboxChange) {
     //e.checked ? this.activateMode = true : this.activateMode = false;
    this._sharedData.advancedSearchActivated.emit(e.checked);
    this._sharedData.advancedSearchActivated.subscribe((arg) => {
      if (arg) {
        this._snackbar
          .open('Búsqueda Avanzada ha sido activada', '', {
            duration: 2 * 1000,
          });
      } else {
        this._snackbar
          .open('Búsqueda Avazanda ha sido desactivada', '', {
            duration: 2 * 1000,
          });
      }
    })

  }
}
