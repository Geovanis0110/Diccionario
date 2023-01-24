import {EventEmitter} from "@angular/core";
import {Injectable} from '@angular/core';
import {SuggestType} from "../Interfaces/word.interface";
import {FilterForm} from "../Interfaces/filter.interface";


@Injectable({
  providedIn: 'root'
})

export class SharedData{
  results: Array<string> = [];
  advancedSearchActivated = new EventEmitter<boolean>();
  advancedSearchClose = new EventEmitter<boolean>();
  suggestActivated = new EventEmitter<Array<SuggestType>>();
  advSearchObj = new EventEmitter<FilterForm>();
  strDontMatch = new EventEmitter<boolean>();
  advCleanOptions = new EventEmitter<boolean>();
  constructor() { }

  onSplitWord(word: string): Array<string> {
    this.results = word.split("");
    return this.results;
  }
}
