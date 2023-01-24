import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
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
import {
  FilterAbreviations,
  FilterField,
  FilterForm
} from '../../../Interfaces/filter.interface';
import { FilterBuilder } from '../../../Builders/filter.builder';
import { FinalWord } from 'src/app/Interfaces/word.interface';
import { EntryWordDescriptionService } from 'src/app/Services/entry-word-description.service';
import { TrasformDataJson } from 'src/app/Services/transform-data-json.service';
import { EntryWordVerbsTableService } from '../../../Services/entry-word-verbs-table.service';
import { MatDialog } from '@angular/material/dialog';
import { VerbalTableModalComponent } from '../../modals/verbal-table-modal/verbal-table-modal.component';
import * as ShareContent from '../../../Models/shared-content';
import { ImageModalComponent } from '../../modals/image-modal/image-modal.component';
import {VideoModalComponent} from "../../modals/video-modal/video-modal.component";

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
  @ViewChild('mySelect', {static: false}) myChild!: ElementRef;
  @ViewChild('mySelect2', {static: false}) myFilter!: ElementRef;
  @Input('selectionClicked') selectClick: boolean = false;
  @Input('wordsArray') wordList: Array<FinalWord> = [];
  searchCriteriaFilters: Array<FilterField> = [
    {
      id: 1,
      selectedValue: 'defaultOption',
    },
  ];
  isDefaultValue: boolean = true;
  dataWord: Array<any> = [];
  wordListResults!: FinalWord;
  verbalTableData: string = '';
  dataToParse: any;
  selectionsOptions: Array<FilterAbreviations> = [];
  table: string = '';
  hideSelect: boolean = false;
  disableSelect: boolean = false;
  hideAllButtons: boolean = false;
  currentSelectedOption: string = '';
  addDisabled: boolean = false;
  id: number = 1;

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
    this.sharedService.advancedSearchActivated.subscribe((result) => this.hideSelect = result);
    this.sharedService.advancedSearchClose.subscribe((result) => this.hideSelect = result);
  }

  setDisabledTrue(sel: Event) {
    this.currentSelectedOption = (<HTMLSelectElement>sel.target).value;
    this.disableSelect = true;
    if (this.currentSelectedOption === 'defaultValue') {
      this.hideAllButtons = true;
      this.disableSelect = false;
      this.isDefaultValue = true;
      this.searchCriteriaFilters = [
        {
          id: 1,
          selectedValue: 'defaultOption',
        },
      ];
    } else if (this.currentSelectedOption === 'cat') {
      this.isDefaultValue = false;
      this.hideAllButtons = true;
      this.searchCriteriaFilters = [
        {
          id: 1,
          selectedValue: 'defaultOption'
        }
      ]
      this.selectionsOptions = ShareContent.catGram;
    } else if (this.currentSelectedOption === 'style') {
      this.isDefaultValue = false;
      this.searchCriteriaFilters = [
        {
          id: 1,
          selectedValue: 'defaultOption',
        },
      ];
      this.selectionsOptions = ShareContent.usgType;
    } else if (this.currentSelectedOption === 'geo') {
      this.isDefaultValue = false;
      this.searchCriteriaFilters = [
        {
          id: 1,
          selectedValue: 'defaultOption',
        },
      ];
      this.selectionsOptions = ShareContent.geoInfo;
    } else if (this.currentSelectedOption === 'dom') {
      this.isDefaultValue = false;
      this.searchCriteriaFilters = [
        {
          id: 1,
          selectedValue: 'defaultOption',
        },
      ];
      this.selectionsOptions = ShareContent.knowledgeArea;
    } else if (this.currentSelectedOption === 'afjGram') {
      this.isDefaultValue = false;
      this.searchCriteriaFilters = [
        {
          id: 1,
          selectedValue: 'defaultOption',
        },
      ];
      this.selectionsOptions = ShareContent.afjGram;
    }
    (<HTMLSelectElement>sel.target).value != 'cat'
      ? (this.addDisabled = true)
      : (this.addDisabled = false);
  }

  onAddSelectionField() {
    if (this.searchCriteriaFilters.length < 3) {
      const criteriaFilter: FilterField = FilterBuilder.newInstance()
        .withId(++this.id)
        .withSelectedValue('defaultOption')
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
    console.log("Closing!!!")
    this.hideSelect ? this.hideSelect = true : this.hideSelect = false;
    this.sharedService.advancedSearchClose.emit(this.hideSelect);
  }

  onLemmaWord(lemmaId: string) {
    this.fapi.setWordIndex(lemmaId.substring(0, 1));
    this.fapi.setWordId(lemmaId);
    this.fapi.getWordListDescription().subscribe((arg) => {
      const dataToParse = new DOMParser().parseFromString(arg, 'text/xml');
      this.dataWord = this._transformData.getEntrysCount(dataToParse);
      this.wordList = [];
      if (this.dataWord.length > 1) {
        this.dataWord.forEach((item) => {
          this.wordListResults = this._transformData.onTransformDataWord(item);
          this.wordList.push({ ...this.wordListResults});
        })
      } else {
        this.wordListResults = this._transformData.onTransformDataWord(this.dataWord[0]);
        this.wordList.push({ ...this.wordListResults });
      }

      // if (this.dataWord.length > 1) {
      //   for (let i = 0; i < this.dataWord.length; i++) {
      //     this.wordListResults = this._transformData.onTransformDataWord(this.dataWord[i]);
      //     this.wordList.push({ ...this.wordListResults });
      //   }
      // } else {
      //   this.wordListResults = this._transformData.onTransformDataWord(this.dataWord);
      //   this.wordList.push(this.wordListResults);
      // }
      console.log(this.dataWord);
    });
  }

  onConj(conjtarget: string) {
    this.verbalTable.setContarget(conjtarget);
    this.verbalTable.getVerbalTable().subscribe((arg: string) => {
      this.verbalTableData = arg;
      this._dialog.open(VerbalTableModalComponent, {
        data: this.verbalTableData,
      });
    });
  }

  onApplyFilter() {
    const result: FilterForm = {
      category: this.currentSelectedOption,
      options: this.searchCriteriaFilters
    }
    console.log(result);
    this.sharedService.advSearchObj.emit(result);
  }

  onCleanFilter() {
    if (this.searchCriteriaFilters.length === 3) {
      this.searchCriteriaFilters = this.searchCriteriaFilters.slice(1, 2);
      this.searchCriteriaFilters[0].selectedValue = 'defaultOption';
    } else if (this.searchCriteriaFilters.length === 2) {
      this.searchCriteriaFilters = this.searchCriteriaFilters.slice(1);
      this.searchCriteriaFilters[0].selectedValue = 'defaultOption';
    }
    this.disableSelect = false;
    this.addDisabled = true;
    this.isDefaultValue = true;
    this.myChild.nativeElement.value = 'defaultValue';
    this.myFilter.nativeElement.value = 'defaultOption';
    this.sharedService.advCleanOptions.emit(true);
  }

  onOpenWordImage(url: string) {
    this._dialog.open(ImageModalComponent, {data: url})
  }

  onOpenWordVideo(url: string){
    this._dialog.open(VideoModalComponent, {data: url});
  }
}
