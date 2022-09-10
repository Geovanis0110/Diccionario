import {Injectable} from '@angular/core';
import {WebRequestService} from "src/app/Services/web-request.service";


@Injectable({
  providedIn: 'root'
})
export class EntryWordDescriptionService {
  letter = '';
  letterPref = 'letterPref=';
  entrada = 'buscarEntrada.cgi?';
  entryId = '_&entryId=';
  entryIdvalue = '';
  queryServer: XMLHttpRequest = new XMLHttpRequest();
  description: string | null = '';

  constructor(private webRequest:WebRequestService) {
  }
  getWordIndexDes(index: string){
    this.letter = index;
  }
  getIdWord(id: string){
    this.entryIdvalue = id;
  }
  getWordListDescription(){
    let urlComplete: string =  this.entrada+this.letterPref+this.letter+this.entryId+this.entryIdvalue;
    return this.webRequest.getDataFromServer(urlComplete);
  }

}
