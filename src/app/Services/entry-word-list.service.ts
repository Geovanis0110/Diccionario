import { Injectable } from '@angular/core';
import {WebRequestService} from "./web-request.service";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class EntryWordListService {
  urlBase: string = 'http://localhost:2021/'
  letter = '';
  docIndice = 'buscarDocIndice.cgi?';
  letterPref = 'letterPref=';
  posSelection = '&posSelection=';
  constructor(private _http: HttpClient) { }
  setWordIndex(text: string){
    if(text == 'az'){
      this.letter = 'az';
    }else {
      this.letter = text + '_';
    }
  }
  getWordList(){
    return this._http.get(this.urlBase + this.docIndice+this.letterPref+this.letter+this.posSelection)
  }
}
