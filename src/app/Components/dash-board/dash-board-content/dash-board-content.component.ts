import {Component, OnInit, Input, DoCheck} from '@angular/core';
import {WebRequestService} from "../../../Services/web-request.service";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {SharedData} from "../../../Services/shared-data.service";
import {MatSelect} from "@angular/material/select";

type wordAttributes = {
  word: string,
  def: string,
  eg: string;
  notes: string,
  gramGrp: string,
  pos: string,
};

@Component({
  selector: 'app-dash-board-content',
  templateUrl: './dash-board-content.component.html',
  styleUrls: ['./dash-board-content.component.css'],
  animations: [
    trigger('fade', [
      state('in', style({opacity: 1})),
      transition('void => *', [
        animate('2s ease-in', keyframes([
          style({opacity: 0, transform: 'translateX(75px)', offset: 0}),
          style({opacity: .5, transform: 'translateX(-25px)', offset: .3}),
          style({opacity: 1, transform: 'translateX(0)', offset: 1})
        ]))
      ])
    ])
  ]
})

export class DashBoardContentComponent implements OnInit, DoCheck {
  @Input('selectionClicked') selectClick: boolean = false;
  @Input('wordsArray') wordList: wordAttributes[] = [];
  // wordArrayFinal: wordAttributes[] = [];
  table: string = '';
  hideSelect: boolean = false;
  disableSelect: boolean = false;
  selectionNumber: number = 1;
  selectionArray = new Array(this.selectionNumber);
  hideDeleteButton: boolean = false;
  currentArraySelect: string [] = [];
  currentSelectOption: number = 0;
  catGram: string[] = [
    'adjetivo',
    'advervio',
    'articulo',
    'conjuncion',
    'interjecion',
    'preposicion',
    'afijo',
    'pronombre',
    'sustantivo s. y s. invar.',
    'sustantivo femenino',
    'sustantivo masculino',
    'verbo defectivo',
    'verbo auxiliar',
    'verbo copulativo',
    'verbo impersonal',
    'verbo intransitivo',
    'verbo pronominal',
    'verbo transitivo'
  ];
  tpUso: string[] = [
    'coloquial',
    'despectivo',
    'familiar',
    'sentido figurado',
    'popular'
  ];
  infoGeo: string[] = [
    'americanismo',
    'anglicismo',
    'cubanismo',
    'galicismo'
  ];
  areaConocimiento: string[] = [
    'Anatomia',
    'Arquitectura',
    'Astronomia',
    'Biologia',
    'Botanica',
    'Deporte',
    'Derecho',
    'Electricidad',
    'Fisica',
    'Fonetica ',
    'Geografia',
    'Geologia ',
    'Geometria',
    'Gramatica',
    'Informatica',
    'Linguistica',
    'Literatura',
    'Marina',
    'Matematicas',
    'Medicina',
    'Meteorologia ',
    'Militar',
    'Mitologia',
    'Musica',
    'Politica',
    'Quimica',
    'Religion',
    'Zoologia'
  ]
  palAfjPfj: string[] = [
    'con prefijo(s)',
    'con afijo(s)',
    'con prefijo(s) o afijo(s)',
    'con prefijo(s) y afijo(s)'
  ];


  constructor(private webService: WebRequestService,
              private sharedService: SharedData) {

  }

  ngOnInit(): void {

  }

  ngDoCheck() {
    this.sharedService.behaviorSub.subscribe((item: boolean) => {
      this.hideSelect = item;
    })
    const asTable = document.getElementById('this');
    this.table = this.webService.sendTable();
    if (asTable != null) {
      asTable.innerHTML = this.table;
    }
  }

  setDisabledTrue(fselect: MatSelect) {
    this.disableSelect = true;
    this.currentSelectOption = fselect.value;
    if (this.currentSelectOption == 1) {
      this.currentArraySelect = this.catGram;
    } else if (this.currentSelectOption == 2) {
      this.currentArraySelect = this.tpUso;
    } else if (this.currentSelectOption == 3) {
      this.currentArraySelect = this.infoGeo;
    } else if (this.currentSelectOption == 4) {
      this.currentArraySelect = this.areaConocimiento;
    } else if (this.currentSelectOption == 5) {
      this.currentArraySelect = this.palAfjPfj;
    } else {
      this.currentArraySelect = [];
    }
  }

  onSelectOption(sel: MatSelect){
    console.log(sel.triggerValue)
  }

  onAddSelectionField() {
    if (this.selectionNumber < 3) {
      this.selectionNumber += 1;
      this.selectionArray = new Array(this.selectionNumber);
      this.hideDeleteButton = true;
    }
  }

  onDeleteSelectionField() {
    if (this.selectionNumber <= 3 && this.selectionNumber > 1) {
      this.selectionNumber -= 1;
      this.selectionArray = new Array(this.selectionNumber);
      if (this.selectionNumber == 1) {
        this.hideDeleteButton = false;
      }
    }
  }
}
