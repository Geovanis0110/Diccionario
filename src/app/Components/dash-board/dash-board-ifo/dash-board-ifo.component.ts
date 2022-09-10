import {Component, Input, OnInit} from '@angular/core';
import {EntryWordDescriptionService} from "../../../Services/entry-word-description.service";

@Component({
  selector: 'app-dash-board-ifo',
  templateUrl: './dash-board-ifo.component.html',
  styleUrls: ['./dash-board-ifo.component.css']
})
export class DashBoardIfoComponent implements OnInit {
  @Input('searching') input_search: boolean = false;
  @Input('Letter') letterIndex: string = '';
  @Input('itemList') itemList: any;
  @Input('cEntry') currentEntry: string = '';
  @Input('clickSelection') currentClick: any;
  wordID: any;
  constructor(private entryService: EntryWordDescriptionService) { }

  ngOnInit(): void {
  }

  onSelectWord(e: any){
    let text: string = e.target.value;
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
    let results: string = this.entryService.getWordListDescription();
    console.log(results);
  }

}
