import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SharedData} from "../../Services/shared-data.service";

@Component({
  selector: 'app-alphabeth',
  templateUrl: './alphabeth.component.html',
  styleUrls: ['./alphabeth.component.css']
})
export class AlphabethComponent implements OnInit {
  alphaLetter: string = '';
  tCell: any;
  @Output('alphaClick') apClick = new EventEmitter<{ apLetter: string }>();

  constructor(
    private _sharedData: SharedData
  ) {
  }

  ngOnInit(): void {
  }

  onTestTable(e: Event) {
    this.tCell = (e.target as HTMLTableCellElement).textContent;
    if (this.tCell != null) {
      this.alphaLetter = this.tCell.toLowerCase();
      if (this.alphaLetter == 'ñ') {
        this.alphaLetter = 'ny';
      }
    }
    this.apClick.emit({apLetter: this.alphaLetter});
    console.log(this.alphaLetter);
  }
}
