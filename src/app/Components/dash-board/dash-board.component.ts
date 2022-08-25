import {Component, OnInit} from '@angular/core';
import {EntryWordListService} from "../../Services/entry-word-list.service";
import {FormControl} from "@angular/forms";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";
import {isAsciiLetter} from "@angular/compiler/src/chars";


@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  isHandSet: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(results => results.matches),
      shareReplay()
    );
  words: any;
  wordID = '';
  wordSearch = '';
  input_search = false;
  hiddenSelect = new FormControl(false);
  disableSelect = false;

  constructor(private wordService: EntryWordListService, private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
  }

  setTrueDisable() {
    this.disableSelect = true;
  }

  onSearch(event: any) {
    // console.log('Dime que tu tienes',event)
    this.input_search = event.target.value;
    this.wordSearch = event.target.value;
    let indexWord = this.wordSearch.substring(0, 1);
    if (indexWord === '') {
      indexWord = 'a';
    }
    this.wordService.getWordsIndex(indexWord);
    this.wordService.getWordListFromServer().subscribe((data => {
      this.words = data;
    }))
  }

  onClickSelection(text: string) {
    this.words.forEach((object:any) =>{
      // console.log('id: '+object['$']['id'] + '\n palabra: '+object['orth'][0])
      if(text == object['orth'][0]){
        // alert(object['$']['id'])
        this.wordID = object['$']['id']
      }
    })
    alert(this.wordID)
  }
}
