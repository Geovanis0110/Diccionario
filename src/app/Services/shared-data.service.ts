import {EventEmitter} from "@angular/core";
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SharedData{
  advancedSearchActivated = new EventEmitter<boolean>();
  advancedSearchClose = new EventEmitter<boolean>();
  constructor(){}
}
