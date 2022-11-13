import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class EntryWordVerbsTableService {
  urlBase: string = 'http//localhost:2021/';
  findVerbal: string = 'buscarVerbo.cgi?';
  itype: string = 'itype=';
  itypeValue: string = '';
  constructor(private _http: HttpClient) { }

  setContarget(contarget: string){
    this.itypeValue = contarget;
  }

  getVerbalTable(){
    return this._http.get(this.urlBase + this.findVerbal + this.itype + this.itypeValue, {responseType: 'text'});
  }
}
