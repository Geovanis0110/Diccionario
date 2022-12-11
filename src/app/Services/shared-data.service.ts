import {EventEmitter} from "@angular/core";
import {Injectable} from '@angular/core';
import {SuggestType} from "../Interfaces/word.interface";


@Injectable({
  providedIn: 'root'
})

export class SharedData{
  results: Array<string> = [];
  advancedSearchActivated = new EventEmitter<boolean>();
  advancedSearchClose = new EventEmitter<boolean>();
  suggestActivated = new EventEmitter<SuggestType>();
  constructor() { }

  onSplitWord(word: string): Array<string> {
    this.results = word.split("");
    return this.results;
  }
}
