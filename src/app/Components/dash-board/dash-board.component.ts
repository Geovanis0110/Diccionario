import {Component, OnInit} from '@angular/core';
import {EntryWordListService} from "../../Services/entry-word-list.service";


@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  wordResults: {} = {};
  indexWord: string = '';
  entry: string = '';
  input_search: boolean = false;

  constructor(private queryService: EntryWordListService) {
  }

  ngOnInit(): void {
  }

  onSearch(headerData: { indexWord: string, currentEntry: string }): void {
    this.indexWord = headerData.indexWord;
    this.entry = headerData.currentEntry;
    this.input_search = true;
    this.queryService.getWordsIndex(this.indexWord);
    this.queryService.getWordListFromServer().subscribe((data => {
      this.wordResults = data;
    }))
  }

  onClickButton() {

  }

}
