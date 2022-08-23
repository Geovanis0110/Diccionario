import { Component, OnInit } from '@angular/core';
import {EntryWordListService} from "../../Services/entry-word-list.service";


@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  words: any;
  wordSearch = '';
  input_search=false;
  constructor(private wordService:EntryWordListService) { }

  ngOnInit(): void {
  }

  onSearch(event: any) {
    // console.log('Dime que tu tienes',event)
    this.input_search=event.target.value ;
    this.wordSearch = event.target.value;
    let indexWord = this.wordSearch.substring(0,1);
    if(indexWord === ''){
      indexWord = 'a';
    }
    this.wordService.getWordsIndex(indexWord);
    this.wordService.getWordListFromServer().subscribe((data =>{
      this.words = data;
    }))
  }
}
