import {EventEmitter} from "@angular/core";
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SharedData{
  advanceSearchActivated = new EventEmitter<boolean>();

  constructor(){}
}
