import {Component, OnInit} from '@angular/core';
import {EntryWordListService} from "../../Services/entry-word-list.service";
import {TrasformDataJson} from "../../Services/transform-data-json.service";

import {animate, keyframes, query, stagger, style, transition, trigger} from "@angular/animations";
import {AllWord} from "../../Interfaces/word.interface";


type wordAttributes = {
  word: string,
  def: string,
  eg: string;
  notes: string,
  gramGrp: string,
  pos: string,
};

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
  //Animations
  animations: [
    trigger('slow-entry', [
      transition('* => *', [
        query(':enter', style({opacity: 0, transform: 'translateY(0)'})),
        query(':enter', stagger(300, [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75px)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1})
          ]))
        ]))
      ])
    ])
  ]
})

export class DashBoardComponent implements OnInit {

  wordResults: AllWord[] = [];
  indexWord: string = '';
  entry: string = '';
  input_search: boolean = false;
  wordArray: wordAttributes[] = []
  isNewSearch: boolean = false;
  selectionMode: string = '';

  constructor(
    private queryService: EntryWordListService,
    private dataTransform: TrasformDataJson
  ) {
  }

  ngOnInit(): void {
  }
  onSelectionMode(selectMode: {selMod: string}){
    this.selectionMode = selectMode.selMod;
  }

  onAlphaWords(alphaData: { apLetter: string }) {
    this.indexWord = alphaData.apLetter;
    if(this.selectionMode === 'reg1' || this.selectionMode === ''){
      this.queryService.setWordIndex(this.indexWord);
      this.isNewSearch = true;
      this.queryService.getWordList().subscribe((data) => {
        this.wordResults = this.dataTransform.onTransformData(data);
      })
    }else if(this.selectionMode === 'reg2' || this.selectionMode === 'reg3'){
      this.queryService.setWordIndex('az');
      this.isNewSearch = true;
      this.queryService.getWordList().subscribe((data) => {
        this.wordResults = this.dataTransform.onTransformAllData(data);
      })
    }
  }

  onSearch(headerData: { indexWord: string, currentEntry: string }): void {
    this.indexWord = headerData.indexWord;
    this.entry = headerData.currentEntry;
    if(this.selectionMode === 'reg1' || this.selectionMode === ''){
      this.queryService.setWordIndex(this.indexWord);
      this.queryService.getWordList().subscribe((data) => {
        this.wordResults = this.dataTransform.onTransformData(data);
      })
    }else if(this.selectionMode === 'reg2' || this.selectionMode === 'reg3'){
      this.queryService.setWordIndex('az');
      this.queryService.getWordList().subscribe((data) => {
        this.wordResults = this.dataTransform.onTransformAllData(data);
      })
    }
  }

  onClickButton(ifoData: { onClicked: boolean, wordArray: wordAttributes[] }) {
    this.input_search = ifoData.onClicked;
    // this.wordArray.word = ifoData.wordArray.word;
    // this.wordArray.def = ifoData.wordArray.def;
    // this.wordArray.eg = ifoData.wordArray.eg;
    // this.wordArray.gramGrp = ifoData.wordArray.gramGrp;
    // this.wordArray.pos = ifoData.wordArray.pos;
    this.wordArray = ifoData.wordArray;
    console.log(this.wordArray);
  }
}
