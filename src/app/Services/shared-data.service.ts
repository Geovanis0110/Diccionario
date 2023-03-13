import {EventEmitter, Injectable} from "@angular/core";
import {AllWord, SuggestType} from "../Interfaces/word.interface";
import {FilterForm} from "../Interfaces/filter.interface";
import {BehaviorSubject, Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class SharedData {
  results: Array<string> = [];
  advancedSearchActivated = new EventEmitter<boolean>();
  advancedSearchClose = new EventEmitter<boolean>();
  suggestActivated = new EventEmitter<Array<SuggestType>>();
  wordListContent = new BehaviorSubject<{ suggest$: Array<SuggestType>, words$: Array<AllWord> }>({
    suggest$: [],
    words$: []
  });
  advSearchObj = new EventEmitter<FilterForm>();
  strDontMatch = new EventEmitter<boolean>();
  notFound = new EventEmitter<boolean>(false);
  advCleanOptions = new EventEmitter<boolean>();
  instantMatchSearch = new Subject<{ match$: boolean, entry$: AllWord }>();
  constructor() {
  }

  onSplitWord(word: string): Array<string> {
    this.results = word.split("");
    return this.results;
  }
}
