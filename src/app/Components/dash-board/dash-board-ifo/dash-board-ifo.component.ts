import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EntryWordDescriptionService} from "../../../Services/entry-word-description.service";
import {WebRequestService} from "../../../Services/web-request.service";


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
  @Input('itemList') itemList: any;
  @Input('cEntry') currentEntry: string = '';
  @Input('clickSelection') currentClick: any;
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
    this.clicked = true;
    let text: string = (e.target as HTMLInputElement).value;
    this.itemList.forEach((object: any) => {
      // console.log('id: '+object['$']['id'] + '\n palabra: '+object['orth'][0])
      if (text == object['orth'][0]) {
        // alert(object['$']['id'])
        this.wordID = object['$']['id']
      }
    })
    // alert(this.wordID)
    this.entryService.getIdWord(this.wordID);
    this.entryService.getWordIndexDes(this.letterIndex);
    this.wordArray = this.entryService.getWordListDescription();
    this.table = this.webService.sendTable();



    this.backClick.emit({onClicked: this.clicked, wordArray: this.wordArray});
  }
}
