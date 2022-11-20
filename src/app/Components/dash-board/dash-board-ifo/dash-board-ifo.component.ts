import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EntryWordDescriptionService} from "../../../Services/entry-word-description.service";
import {TrasformDataJson} from "../../../Services/transform-data-json.service";
import {AllWord, FinalWord} from "../../../Interfaces/word.interface";


type wordAttributes = {
  word: string,
  def: string,
  eg: string;
  notes: string,
  gramGrp: string,
  pos: string,
};

@Component({
  selector: 'app-dash-board-ifo',
  templateUrl: './dash-board-ifo.component.html',
  styleUrls: ['./dash-board-ifo.component.css'],
})
export class DashBoardIfoComponent implements OnInit {
  @Input('searching') input_search: boolean = false;
  @Input('letter') letterIndex: string = '';
  @Input('itemList') itemList!: AllWord[];
  @Input('cEntry') currentEntry: string = '';
  @Input('clickSelection') currentClick: any;
  @Input('newCurrentSearch') newSearch!: boolean;
  @Input('selectionMode') selMod: string = '';
  @Output() backClick: any = new EventEmitter<{
    onClicked: boolean, wordArray: FinalWord
  }>();
  wordID: string = '';

  clicked: boolean = false;
  table: string = '';
  dataWord: any;
  wordDataTest!: FinalWord;


  constructor(
    private entryService: EntryWordDescriptionService,
    private dataTransform: TrasformDataJson) {
  }

  ngOnInit(): void {
  }

  onSelectWord(e: Event) {
    this.clicked = true;
    this.wordID = (<HTMLSelectElement>e.target).value;
    this.entryService.setWordIndex(this.wordID.substring(0, 1));
    this.entryService.setWordId(this.wordID);
    this.entryService.getWordListDescription().subscribe((data) => {
      this.dataWord = (new DOMParser().parseFromString(data, 'application/xml'));
      this.wordDataTest = this.dataTransform.onTransformDataWord(this.dataWord);
      this.backClick.emit({ onClicked: this.clicked, wordArray: this.wordDataTest });
    }) 
  }

  onSelectWordWithEnter(e: Event){
    console.log(e);
    console.log((e.currentTarget as HTMLSelectElement).value);
  }

  onSelected(option: HTMLOptionElement){
    console.log(option.value);
    return true;
  }

}
