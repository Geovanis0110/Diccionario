import { Component, OnInit, Input } from '@angular/core';
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { SharedData } from '../../../Services/shared-data.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import * as MyIcons from '../../../Icons/icons';
import { FilterField } from '../../../Interfaces/filter.interface';
import { FilterBuilder } from '../../../Builders/filter.builder';
import { FinalWord } from 'src/app/Interfaces/word.interface';
import { EntryWordDescriptionService } from 'src/app/Services/entry-word-description.service';
import { TrasformDataJson } from 'src/app/Services/transform-data-json.service';
import { EntryWordVerbsTableService } from "../../../Services/entry-word-verbs-table.service";
import { MatDialog } from "@angular/material/dialog";
import { VerbalTableModalComponent } from '../../modals/verbal-table-modal/verbal-table-modal.component';


@Component({
  selector: 'app-dash-board-content',
  templateUrl: './dash-board-content.component.html',
  styleUrls: ['./dash-board-content.component.css'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        animate(
          '2s ease-in',
          keyframes([
            style({ opacity: 0, transform: 'translateX(75px)', offset: 0 }),
            style({
              opacity: 0.5,
              transform: 'translateX(-25px)',
              offset: 0.3,
            }),
            style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})



export class DashBoardContentComponent implements OnInit {
  searchCriteriaFilters: Array<FilterField> = [
    {
      id: 1,
      selectedValue: '',
    },
  ];

  @Input('selectionClicked') selectClick: boolean = false;
  @Input('wordsArray') wordList: Array<FinalWord> = [];
  dataWord: Array<any> = [];
  wordListResults!: FinalWord;
  verbalTableData: string = '';
  dataToParse: any;
  selectionsOptions: Array<string> = [''];
  table: string = '';
  hideSelect: boolean = false;
  disableSelect: boolean = false;
  hideAllButtons: boolean = false;
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
    'verbo transitivo',
  ];
  tpUso: string[] = [
    'coloquial',
    'despectivo',
    'familiar',
    'sentido figurado',
    'popular',
  ];
  infoGeo: string[] = ['americanismo', 'anglicismo', 'cubanismo', 'galicismo'];
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
    'Zoologia',
  ];
  palAfjPfj: string[] = [
    'con prefijo(s)',
    'con afijo(s)',
    'con prefijo(s) o afijo(s)',
    'con prefijo(s) y afijo(s)',
  ];

  constructor(
    private sharedService: SharedData,
    private verbalTable: EntryWordVerbsTableService,
    private fapi: EntryWordDescriptionService,
    private _transformData: TrasformDataJson,
    public _dialog: MatDialog,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIconLiteral(
      'add',
      sanitizer.bypassSecurityTrustHtml(MyIcons.ADD_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'close',
      sanitizer.bypassSecurityTrustHtml(MyIcons.CLOSE_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'remove',
      sanitizer.bypassSecurityTrustHtml(MyIcons.REMOVE_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'volume_up',
      sanitizer.bypassSecurityTrustHtml(MyIcons.VOLUMEN_UP_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'image',
      sanitizer.bypassSecurityTrustHtml(MyIcons.IMAGE_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'videos',
      sanitizer.bypassSecurityTrustHtml(MyIcons.MOVIE_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'check',
      sanitizer.bypassSecurityTrustHtml(MyIcons.CHECK_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'play_circle',
      sanitizer.bypassSecurityTrustHtml(MyIcons.PLAY_CIRCLE_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'aod_table',
      sanitizer.bypassSecurityTrustHtml(MyIcons.AOD_TABLE_ICON)
    );
  }


  ngOnInit(): void {
    this.sharedService.advancedSearchActivated.subscribe((result) => {
      this.hideSelect = result;
    });
  }

  setDisabledTrue(sel: Event) {
    this.currentSelectedOption = (<HTMLSelectElement>sel.target).value;
    this.disableSelect = true;
    if (this.currentSelectedOption === 'defaultValue') {
      this.hideAllButtons = true;
      this.disableSelect = false;
      this.searchCriteriaFilters = [
        {
          id: 1,
          selectedValue: '',
        },
      ];
    } else if (this.currentSelectedOption === 'cat') {
      this.hideAllButtons = true;
      this.selectionsOptions = this.catGram;
    } else if (this.currentSelectedOption === 'tip') {
      this.searchCriteriaFilters = [
        {
          id: 1,
          selectedValue: '',
        },
      ];
      this.selectionsOptions = this.tpUso;
    } else if (this.currentSelectedOption === 'geo') {
      this.searchCriteriaFilters = [
        {
          id: 1,
          selectedValue: '',
        },
      ];
      this.selectionsOptions = this.infoGeo;
    } else if (this.currentSelectedOption === 'con') {
      this.searchCriteriaFilters = [
        {
          id: 1,
          selectedValue: '',
        },
      ];
      this.selectionsOptions = this.areaConocimiento;
    } else if (this.currentSelectedOption === 'afjGram') {
      this.searchCriteriaFilters = [
        {
          id: 1,
          selectedValue: '',
        },
      ];
      this.selectionsOptions = this.palAfjPfj;
    }
    (<HTMLSelectElement>sel.target).value != 'cat'
      ? (this.addDisabled = true)
      : (this.addDisabled = false);
  }

  onAddSelectionField() {
    if (this.searchCriteriaFilters.length < 3) {
      const criteriaFilter: FilterField = FilterBuilder.newInstance()
        .withId(++this.id)
        .build();
      this.searchCriteriaFilters.push(criteriaFilter);
    }
  }

  onDeleteSelectionField(value: FilterField) {
    this.searchCriteriaFilters.splice(
      this.searchCriteriaFilters.indexOf(value),
      1
    );
  }

  onCloseAdvSearch() {
    this.hideSelect ? (this.hideSelect = false) : (this.hideSelect = true);
    this.sharedService.advancedSearchClose.emit(this.hideSelect);
  }

  onLemmaWord(lemmaId: string){
    this.fapi.setWordIndex(lemmaId.substring(0,1));
    this.fapi.setWordId(lemmaId);
    this.fapi.getWordListDescription().subscribe((arg) => {
      this.dataToParse = new DOMParser().parseFromString(arg, 'text/xml');
      this.dataWord = this._transformData.getEntrysCount(this.dataToParse);

      if(this.dataWord.length > 1){
        for(let i = 0; i < this.dataWord.length; i++){
          this.wordListResults = this._transformData.onTransformDataWord(this.dataWord[i]);
          this.wordList.push({...this.wordListResults});
        }
      }else {
        this.wordListResults = this._transformData.onTransformDataWord(this.dataWord);
        this.wordList.push(this.wordListResults);
      }
    })
  }

  onConj(conjtarget: string) {
    this.verbalTable.setContarget(conjtarget);
    this.verbalTable.getVerbalTable().subscribe((arg: string) => {
      this.verbalTableData = arg;
      this._dialog.open(VerbalTableModalComponent, { data: this.verbalTableData });
    })
  }

}
