import { Injectable } from '@angular/core';
import {WebRequestService} from "./web-request.service";


@Injectable({
  providedIn: 'root'
})
export class EntryWordListService {
  letter = '';
  docIndice = 'buscarDocIndice.cgi?';
  letterPref = 'letterPref=';
  posSelection = '_&posSelection=';
  constructor(private webRequestService:WebRequestService) { }
  getWordsIndex(text: string){
    this.letter = text;
  }
  getWordListFromServer(){
    return this.webRequestService.get(this.docIndice+this.letterPref+this.letter+this.posSelection);
  }
}
