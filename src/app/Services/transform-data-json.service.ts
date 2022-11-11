import {Injectable} from '@angular/core';
import {AllWord, Word, WordData} from '../Interfaces/word.interface';

@Injectable({
  providedIn: 'root',
})
export class TrasformDataJson {
  apiData: Array<any> = [];
  completeWord: Array<Word> = [];
  completeAllWord: Array<AllWord> = [];
  // Objeto donde se va almacenar la campos del indice de la palabra
  word: Word = {
    id: '',
    word: '',
    afjGram: '',
    pos: [''],
    usg: [''],
  };

  wordAll: AllWord = {
    id: '',
    word: '',
    reverseWord: '',
    afjGram: '',
    pos: [''],
    usg: [''],
  }

  wordData: WordData = {
    wordOrth: '',
    contarget:  ''
  }

  // Campos de los indices de la palabra
  ortographyForm: string = 'orth';
  idForm: string = '$';
  usgForm: string = 'usg';
  afjGramForm: string = 'afjGram';
  posForm: string = 'pos';

  // Campo de la entrada de la palabra
  itype: string = '';
  wordOrth: string = '';
  body: string = 'body';
  entry: string = 'entry';
  form: string = 'form';
  sense: string = 'sense';
  gramGrp: string = 'gramGrp';
  itypeForm: string = 'itype';
  text: string = '_text';
  attributes: string = '_attributes';
  conjtargetForm: string = 'conjtarget';
  conjtarget: string = '';

  // Arrays de los campos
  formArray: any;
  gramGrpArray: any = [];
  senseArray: any = [];
  attributeArray: any = [];


  constructor() {
  }

  onTransformData(data: any) {
    // console.log(data);
    data.forEach((element: any) => {
      // Guardando los Id de las palabras
      this.wordAll.id = element[this.idForm]['id'];
      // Guardando las palabras
      this.wordAll.word = element[this.ortographyForm][0];
      // Guardando los afijos Gramaticales
      this.wordAll.afjGram = element[this.afjGramForm];
      // Guardando los pos
      this.wordAll.pos = element[this.posForm];
      // Guardando los usg
      this.wordAll.usg = element[this.usgForm];
      //   Guardando el objeto en un array
      this.wordAll.reverseWord = '';
      this.completeAllWord.push({
        id: this.wordAll.id,
        word: this.wordAll.word,
        reverseWord: this.wordAll.reverseWord,
        afjGram: this.wordAll.afjGram,
        pos: this.wordAll.pos,
        usg: this.wordAll.usg,
      });
    });
    return this.completeAllWord;
  }

  onTransformAllData(data: any) {
    // console.log(data);
    data.forEach((element: any) => {
      // Guardando los Id de las palabras
      this.wordAll.id = element[this.idForm]['id'];
      // Guardando las palabras
      this.wordAll.word = element[this.ortographyForm][0]['_'];
      // Guardando el reverso de las palabras
      this.wordAll.reverseWord = element[this.ortographyForm][0][this.idForm]['htro'];
      // Guardando los afijos Gramaticales
      this.wordAll.afjGram = element[this.afjGramForm];
      // Guardando los pos
      this.wordAll.pos = element[this.posForm];
      // Guardando los usg
      this.wordAll.usg = element[this.usgForm];
      //   Guardando el objeto en un array
      this.completeAllWord.push({
        id: this.wordAll.id,
        word: this.wordAll.word,
        reverseWord: this.wordAll.reverseWord,
        afjGram: this.wordAll.afjGram,
        pos: this.wordAll.pos,
        usg: this.wordAll.usg,
      });
    });
    return this.completeAllWord;
  }
  onTransformDataWord(dataWord: any) {
    let body;
    let entry;
    let form;
    let afjGram;
    let sense;

    console.log(dataWord);
    body = dataWord.getElementsByTagName('body');
    if(body[0].lastChild.localName == 'entry') {
      console.log("Tiene una sola entrada");
      entry = body[0].childNodes[0];
      if (entry.attributes[1]) {
        this.wordData.contarget = entry.attributes[1].nodeValue;
      } else {
        this.wordData.contarget = '';
      }
      this.wordData.wordOrth = entry.getElementsByTagName('form')[0].getElementsByTagName(this.ortographyForm)[0].textContent;
    }else if(body[0].lastChild.localName == 'superentry'){
      console.log("Tiene dos o mas entradas");
    }else {
      console.log("Entrada Incorrecta");
    }

    console.log(body);
    console.log(this.wordData);
    return this.wordData;
  }

  onClearCurrentData() {
    this.completeWord = [];
  }
}
