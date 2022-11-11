import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EntryWordDescriptionService} from "../../../Services/entry-word-description.service";
import {WebRequestService} from "../../../Services/web-request.service";
import {AllWord} from "../../../Interfaces/word.interface";


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
    onClicked: boolean, wordArray: wordAttributes[]
  }>();
  wordID: any;
  wordArray: wordAttributes[] = []
  clicked: boolean = false;
  table: string = '';


  constructor(private entryService: EntryWordDescriptionService, private webService: WebRequestService) {
  }

  ngOnInit(): void {
  }

  onSelectWord(e: Event) {

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
