import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'verbal-table-modal',
  templateUrl: './verbal-table-modal.component.html',
  styleUrls: ['./verbal-table-modal.component.css']
})

export class VerbalTableModalComponent implements OnInit{
  @ViewChild('verbalTable', {static: true}) vtable!: ElementRef;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
  }

  ngOnInit(): void { 
    const asVerbalTable = this.vtable.nativeElement;
    asVerbalTable.innerHTML = this.data;
  }
}
