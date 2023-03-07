import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {EntryWordDescriptionService} from '../../../Services/entry-word-description.service';
import {TrasformDataJson} from '../../../Services/transform-data-json.service';
import {SharedData} from "../../../Services/shared-data.service";

import {AllWord, FinalWord, SuggestType} from '../../../Interfaces/word.interface';
import {FilterForm} from "../../../Interfaces/filter.interface";


@Component({
  selector: 'app-dash-board-ifo',
  templateUrl: './dash-board-ifo.component.html',
  styleUrls: ['./dash-board-ifo.component.css'],
})
export class DashBoardIfoComponent implements OnInit {
  @ViewChild('Select', { static: true }) myChild!: ElementRef;
  @Input('searching') input_search: boolean = false;
  @Input('letter') letterIndex: string = '';
  @Input('itemList') itemList!: AllWord[];
  @Input('cEntry') currentEntry: string = '';
  @Input('clickSelection') currentClick: any;
  @Input('newCurrentSearch') newSearch!: boolean;
  @Input('selectionMode') selMod: string = '';
  @Output() backClick: any = new EventEmitter<{
    onClicked: boolean;
    wordArray: Array<FinalWord>;
  }>();
  wordID: string = '';
  advSearchObj!: FilterForm;
  clicked: boolean = false;
  table: string = '';
  dataWord: any;
  wordDataTest!: FinalWord;
  wordDataTestResults: Array<FinalWord> = [];
  wordData: Array<any> = [];
  suggestedWord!: Array<SuggestType>;
  isMatch: boolean = false;
  isAdvSearch: boolean = false;

  constructor(
    private entryService: EntryWordDescriptionService,
    private dataTransform: TrasformDataJson,
    private _shared: SharedData
  ) {}

  ngOnInit(): void {
    this._shared.suggestActivated.subscribe(arg => this.suggestedWord = arg);
    this._shared.advancedSearchActivated.subscribe(arg => this.isAdvSearch = arg);
    this._shared.advCleanOptions.subscribe(arg => { if(arg) this.itemList = [] });
    this._shared.advSearchObj.subscribe(arg => this.advSearchObj = arg);
  }


  onSelectWord(e: Event) {
    console.log(e);
    this.clicked = true;
    this.wordDataTestResults = [];
    this.wordID = (<HTMLSelectElement>e.target).value;
    this.entryService.setWordIndex(this.wordID.substring(0, 1));
    this.entryService.setWordId(this.wordID);
    this.entryService.getWordListDescription().subscribe((data) => {
      this.dataWord = new DOMParser().parseFromString(data, 'application/xml');

      this.wordData = this.dataTransform.getEntrysCount(
        this.dataWord
      );
      if (this.wordData.length > 1) {
        for (let i = 0; i < this.wordData.length; i++){
          this.wordDataTest = this.dataTransform.onTransformDataWord(this.wordData[i]);
          this.wordDataTestResults.push({ ...this.wordDataTest });
        }
        this.backClick.emit({
          onClicked: this.clicked,
          wordArray: this.wordDataTestResults
        })
        console.log("ITEMSON", this.wordDataTestResults);
      } else {
        this.wordDataTest = this.dataTransform.onTransformDataWord(this.wordData[0]);
        this.wordDataTestResults.push(this.wordDataTest);
        this.backClick.emit({
          onClicked: this.clicked,
          wordArray: this.wordDataTestResults
        });
      }
    });
  }
  // onSelectWordRoute(e: Event) {
  //   this.clicked = true;
  //   this.wordDataTestResults = [];
  //   this.wordID = (<HTMLSelectElement>e.target).value;
  //   this.entryService.setWordIndex(this.wordID.substring(0, 1));
  //   this.entryService.setWordId(this.wordID);
  //   this.entryService.getWordListDescription().subscribe((data) => {
  //     this.dataWord = new DOMParser().parseFromString(data, 'application/xml');
  //
  //     this.wordData = this.dataTransform.getEntrysCount(
  //       this.dataWord
  //     );
  //     if (this.wordData.length > 1) {
  //       for (let i = 0; i < this.wordData.length; i++){
  //         this.wordDataTest = this.dataTransform.onTransformDataWord(this.wordData[i]);
  //         this.wordDataTestResults.push({ ...this.wordDataTest });
  //       }
  //       console.log("ITEMSON", this.wordDataTestResults);
  //     } else {
  //       this.wordDataTest = this.dataTransform.onTransformDataWord(
  //         this.wordData[0]
  //       );
  //       this.wordDataTestResults.push(this.wordDataTest);
  //       this.backClick.emit({
  //         onClicked: this.clicked,
  //         wordArray: this.wordDataTestResults,
  //       });
  //     }
  //   });
  // }

  // onSelectWordWithEnter(e: Event) {
  //   console.log(e);
  //   console.log((e.currentTarget as HTMLSelectElement).value);
  // }

  // onSelected(option: HTMLOptionElement) {
  //   console.log(option.value);
  //   return true;
  // }
}
