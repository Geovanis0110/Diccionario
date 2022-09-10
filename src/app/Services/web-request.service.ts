import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {escapeXml} from "@angular/compiler/src/i18n/serializers/xml_helper";
import {serializeNodes} from "@angular/compiler/src/i18n/digest";


@Injectable({
  providedIn: 'root'
})
export class WebRequestService {
  readonly ROOT_URL;
  serverQuery: XMLHttpRequest = new XMLHttpRequest();
  description: string[] | null = [];
   /* wordData: {
      word: string,
     definition: string,
     syllDivition: string,
     sex: string,
     gen: string,
     gramGrp: string,
     example: {text: string, note: string}

  };*/

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:2021';
  }

  getServer(url: string) {
    return this.http.get(`${this.ROOT_URL}/${url}`, {responseType: "arraybuffer"})
  }

  get(url: string) {
    return this.http.get(`${this.ROOT_URL}/${url}`)
  }

  getDataFromServer(url: string): any{
    this.serverQuery.open('GET', `${this.ROOT_URL}/${url}`, false);
    this.serverQuery.send(null);
    if(this.serverQuery.status == 200){
      return this.convertHTMLtoJSON(this.serverQuery.responseText);
    }
  }
  convertHTMLtoJSON(xmltext: string): string[] | null {
    let xml = (new DOMParser()).parseFromString(xmltext, "text/xml");
    console.log(xml);
    let entry = xml.getElementsByTagName('entry');
    // let form  = xml.getElementsByTagName('form');
    let orth = xml.getElementsByTagName('orth');
    let gramGrp = xml.getElementsByTagName('gramGrp');
    let def = xml.getElementsByTagName('def');
    let example = xml.getElementsByTagName('eg');
    let sense = xml.getElementsByTagName('sense');


    return this.description;
  }
}
