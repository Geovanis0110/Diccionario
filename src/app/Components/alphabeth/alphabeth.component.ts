import {Component, EventEmitter, OnInit, Output, ElementRef} from '@angular/core';
//import { HammerModule } from "@angular/platform-browser";
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
    private _sharedData: SharedData,
    private elementRef: ElementRef
  ) {
  }

  ngOnInit(): void {
    /* const el=document.getElementById("trow");
    const hammer= new Hammer(el); */
    this.elementRef.nativeElement.addEventListener("touchstart",this.onTestTable,{capture:false});
  }

  onTestTable1(ev: Event){
    const newEvent = this.cloneEvent(ev);
    newEvent.type="PointerEvent";
    this.onTestTable(newEvent);

  }

  //clonar un evento

  cloneEvent(event: any){
    return new event.constructor(event.type,event);
  }
/*
  onTestTable(e: Event) {
  //e.preventDefault();
    console.log({e});
    this.tCell = (e.target as HTMLTableCellElement).textContent;
    if (this.tCell != null) {
      this.alphaLetter = this.tCell.toLowerCase();
      if (this.alphaLetter == 'ñ') {
        this.alphaLetter = 'ny';
      }
    }
    this.apClick.emit({apLetter: this.alphaLetter});
    console.log(this.alphaLetter);
  } */
  onTestTable(e: Event) {
    //e.preventDefault();  // Evita el comportamiento predeterminado del evento (tanto clic como touchstart).
    if (e.type === 'click' || e.type === 'touchstart') {  // Verifica si el evento es de tipo clic o touchstart.
     // let this.tCell: string |null ;this.tCell=null;
      if (e.type === 'click') {
        this.tCell = (e.target as HTMLTableCellElement).textContent;  // Obtiene el texto de la celda en caso de un clic.
      } else if (e.type === 'touchstart') {
        this.tCell = (e.target as HTMLTableCellElement).textContent;  // Obtiene el texto de la celda en caso de un touchstart.
      }
      if (this.tCell != null) {
        this.alphaLetter = this.tCell.toLowerCase();  // Convierte el texto a minúsculas.
        if (this.alphaLetter == 'ñ') {
          this.alphaLetter = 'ny';
        }
        console.log({e});
        console.log(this.alphaLetter);  // Imprime en la consola la letra procesada.
        this.apClick.emit({apLetter: this.alphaLetter});  // Emite un evento con la letra procesada.

      }
    }
  }

}
