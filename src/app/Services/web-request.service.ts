import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {setTypeScriptVersionForTesting} from "@angular/compiler-cli/src/typescript_support";

//Alias para los atributos del objeto palabra
type wordAttributes = {
  word: string,
  def: string,
  eg: string;
  notes: string,
  gramGrp: string,
  pos: string,
};

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {
  readonly ROOT_URL: string = '';
  serverQuery: XMLHttpRequest = new XMLHttpRequest();
  wordInfo: wordAttributes = {word: '', def: '', eg: '', notes: '', gramGrp: '', pos: ''};
  wordsInfo: wordAttributes[] = [];
  table: string = '';


  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:2021';
  }

  get(url: string) {
    return this.http.get(`${this.ROOT_URL}/${url}`)
  }

  getDataFromServer(url: string): any {
    this.serverQuery.open('GET', `${this.ROOT_URL}/${url}`, false);
    this.serverQuery.send(null);
    if (this.serverQuery.status == 200) {
      return this.convertHTMLtoJSON(this.serverQuery.responseText);
    }
  }

  convertHTMLtoJSON(xmltext: string): wordAttributes[] {
    let xml = (new DOMParser()).parseFromString(xmltext, "text/html");
    console.log(xml);
    this.table = xml.getElementsByTagName("table")[0].innerHTML;
    let tableContent = xml.getElementsByTagName('table');
    let tableHeaderWord: string = tableContent[0].getElementsByTagName('table')[0].getElementsByTagName('b')[0].innerHTML;
    let tableHeaderPos = tableContent[0].getElementsByTagName('table')[0].getElementsByTagName('pos')[0].textContent;
    let tableBody = tableContent[0].getElementsByTagName('table')[1].textContent;
    let tableFooter = tableContent[0].getElementsByTagName('table')[2].textContent;
    console.log(tableHeaderWord, tableHeaderPos)
    console.log(tableBody)
    console.log(tableFooter)
    return this.wordsInfo;
  }

  sendTable() {
    return this.table;
  }
}
