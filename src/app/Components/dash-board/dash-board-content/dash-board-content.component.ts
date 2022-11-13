import {Component, OnInit, Input} from '@angular/core';
import {WebRequestService} from "../../../Services/web-request.service";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {SharedData} from "../../../Services/shared-data.service";
import {MatSelect, MatSelectChange} from "@angular/material/select";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import * as MyIcons from "../../../Icons/icons";
import {FilterField} from "../../../Interfaces/filter.interface";
import {FilterBuilder} from "../../../Builders/filter.builder";
import {FilterCriteria} from "../../../Interfaces/filter-criteria.interface";


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

export class DashBoardContentComponent implements OnInit {
  searchCriteriaFilters: Array<FilterField> = [{
    id: 1,
    selectedValue: ''
  }];


  @Input('selectionClicked') selectClick: boolean = false;
  @Input('wordsArray') wordList: wordAttributes[] = [];
  // wordArrayFinal: wordAttributes[] = [];
  table: string = '';
  hideSelect: boolean = false;
  disableSelect: boolean = false;
  hideDeleteButton: boolean = false;
  currentSelectedOption: string = '';
  addDisabled: boolean = false;
  id: number = 1;
  catGram: Array<string> = [
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
              private sharedService: SharedData,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('add', sanitizer.bypassSecurityTrustHtml(MyIcons.ADD_ICON));
    iconRegistry.addSvgIconLiteral('delete', sanitizer.bypassSecurityTrustHtml(MyIcons.DELETE_ICON));

  }

  ngOnInit(): void {
    this.sharedService.advanceSearchActivated.subscribe(
      (result) => {
        this.hideSelect = result;
      }
    )

  }

  setDisabledTrue(sel: MatSelectChange) {
    this.disableSelect = true;
    sel.value != 'cat' ? this.addDisabled = true  : this.addDisabled = false;
  }

  onSelectOption(sel: MatSelect) {
  }

  onAddSelectionField() {
    if (this.searchCriteriaFilters.length < 3) {
      const criteriaFilter: FilterField = FilterBuilder.newInstance()
        .withId(++this.id)
        .build();
      this.searchCriteriaFilters.push(criteriaFilter);
    }
  }

  onDeleteSelectionField() {
  }
}
