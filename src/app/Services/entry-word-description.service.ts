import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class EntryWordDescriptionService {
  urlBase: string = 'http://localhost:2021/';
  letter = '';
  letterPref = 'letterPref=';
  entrada = 'buscarEntrada.cgi?';
  entryId = '_&entryId=';
  entryIdvalue = '';

  constructor(private _http: HttpClient) {
  }
  setWordIndex(index: string){
    this.letter = index;
  }
  setWordId(id: string){
    this.entryIdvalue = id;
  }
  getWordListDescription(){
    return this._http.get(this.urlBase + this.entrada + this.letterPref + this.letter + this.entryId + this.entryIdvalue);
  }

}
