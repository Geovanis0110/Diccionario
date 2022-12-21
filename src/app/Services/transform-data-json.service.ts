import {Injectable} from '@angular/core';
import {
  AllWord,
  binaryObject,
  catGram,
  catGramWithId,
  FinalWord,
  FormField,
  senseField,
  UsgType,
  Word,
  WordData
} from '../Interfaces/word.interface';
import {FormFieldBuilder} from "../Builders/form-field.builder";
import {BinaryObjectBuilder} from "../Builders/binary-object.builder";
import {TestWordPlusBuilder} from "../Builders/test-word-plus.builder";
import {SenseFieldBuilder} from "../Builders/sense-field.builder";
import {FinalWordBuilder} from "../Builders/final-word.builder";
import {DataParserService} from "./data-parser.service";

export interface testWord {
  textos: string,
  idTextos: any
}

export interface testWordPlus {
  textos: string,
  lemmaid: string,
  id: string
}

export interface xmlObj {
  name: string,
  content: any
}

export interface xmlObjPlus {
  id: string,
  name: string,
  content: any
}


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
    afjGram: [''],
    pos: [''],
    usg: [],
  }

  wordData: WordData = {
    wordOrth: '',
    contarget: '',
    definition: [],
    examples: []
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
  formArray: Array<any> = [];
  gramGrpArray: Array<any> = [];
  senseArray: Array<any> = [];
  attributeArray: Array<any> = [];


  constructor(private _dataParser: DataParserService) {
  }

  onTransformData(data: any, searchType: string) {
    if (searchType === 'reg1') {
      const result: Array<AllWord> = [];
    const entrys = Array.from(data.querySelectorAll('entry'));
    entrys.forEach((item: any) => {
      const Usg: UsgType = { type: '', value: ''};
      const Usgs: Array<UsgType> = [];
      const Poss: Array<string> = [];
      const AfjGrams: Array<string> = [];
      this.wordAll.id = item.attributes['id']?.value;
      const entrysChildrens = Array.from(item.children);
      // console.log(entrysChildrens);
      entrysChildrens.forEach((obj: any) => {
        if (obj.tagName === 'orth') {
          this.wordAll.word = obj.textContent;
        } else if (obj.tagName === 'pos') {
          Poss.push(obj.textContent);
        } else if (obj.tagName === 'usg') {
          Usg.type = obj.attributes['type']?.value;
          Usg.value = obj.textContent;
          Usgs.push({ ...Usg });
        } else if (obj.tagName === 'afjGram') {
          AfjGrams.push(obj.textContent);
        } 
      })  
      this.wordAll.usg = Usgs;
      this.wordAll.pos = Poss;
      this.wordAll.afjGram = AfjGrams;
      this.wordAll.reverseWord = '';
      result.push({...this.wordAll});
    })
    return result;
    } else {
      const result: Array<AllWord> = [];
      const entrys = Array.from(data.querySelectorAll('entry'));
    entrys.forEach((item: any) => {
      const Usg: UsgType = { type: '', value: ''};
      const Usgs: Array<UsgType> = [];
      const Poss: Array<string> = [];
      const AfjGrams: Array<string> = [];
      this.wordAll.id = item.attributes['id']?.value;
      const entrysChildrens = Array.from(item.children);
      // console.log(entrysChildrens);
      entrysChildrens.forEach((obj: any) => {
        if (obj.tagName === 'orth') {
          this.wordAll.word = obj.textContent;
          this.wordAll.reverseWord = obj.attributes['htro']?.value;
        } else if (obj.tagName === 'pos') {
          Poss.push(obj.textContent);
        } else if (obj.tagName === 'usg') {
          Usg.type = obj.attributes['type']?.value;
          Usg.value = obj.textContent;
          Usgs.push({ ...Usg });
        } else if (obj.tagName === 'afjGram') {
          AfjGrams.push(obj.textContent);
        } 
      })  
      this.wordAll.usg = Usgs;
      this.wordAll.pos = Poss;
      this.wordAll.afjGram = AfjGrams;
      result.push({...this.wordAll});
    })
    return result;
    }
    
  }


  getEntrysCount(dataWord: any): Array<any> {
     return Array.from(dataWord.querySelectorAll("entry")).map(x => x);
  }

  onTransformDataWord(dataWord: any) {
    //Split the entry
    // const entrys: Array<any> = Array.from(dataWord.querySelectorAll("entry")).map((x: any) => {
    //   return x;
    // })
    // const entrysChildsName: any = Array.from(dataWord.querySelectorAll("entry").children).map((x: any) => {
    //   return x.tagName;
    // })

    const senseCount = Array.from(dataWord.querySelectorAll("sense")).map(x => x);
    console.log("senseCount: ", senseCount.length);

    console.log("Entradas (Comienzo)", dataWord);

    // Objeto con la palabra, error y silaba
    let wordTry1: Array<xmlObjPlus> = []
    // Objeto con la gramatica de la palabra
    let gramTry1: Array<xmlObjPlus> = [];
    // Objeto que contiene el arbol de definiciones y ejemplos
    let senseTry1: Array<xmlObjPlus> = [];
    //Notas
    let notesTry1: Array<xmlObjPlus> = [];
    // Objeto que contiene las definiciones con su id
    let definity: Array<testWordPlus> = [];
    // Objeto de nivel superior al texto de ejmplos
    let eg: Array<xmlObjPlus> = [];
    // Objeto que contiene la gramatica de los ejemplos
    let defGramGrp: Array<xmlObjPlus> = [];
    // Objeto que contiene los ejemplos finales por id
    let finalExample: Array<testWordPlus> = [];
    // Cadena que contiene el numero de la tabla verbal
    let contarget: string = '';
    // const fnWs: Array<FinalWord> =[];

    // if (entrys.length > 1) {
    //   console.log("Multiples Entradas", entrys);

    // } else
      // if (dataWord.length === 1) {

      if (dataWord.attributes != undefined) {
        contarget = dataWord.attributes['conjtarget']?.value;
      }
      console.log("Tiene Tabla Verbal con Id:", contarget);

      this.apiData = Array.from(dataWord.children).map((x: any) => {
        return x;
      })

      wordTry1 = this._dataParser.onEntryChildrenSplitter(this.apiData, 'form');
      gramTry1 =  this._dataParser.onEntryChildrenSplitter(this.apiData, 'gramGrp');
      senseTry1 = this._dataParser.onEntryChildrenSplitter(this.apiData, 'sense');

      console.log("!!!!!WORD", wordTry1)
      console.log("!!!!!GRAM", gramTry1);
      console.log("!!!!!SENSE", senseTry1);

      definity = this._dataParser.onDefSenseChildrenSplitter(senseTry1, 'def');
      eg = this._dataParser.onEgSenseChildrenSplitter(senseTry1, 'eg');
      defGramGrp = this._dataParser.onGramGrpSenseChildrenSplitter(senseTry1, 'gramGrp');
      finalExample = this._dataParser.onExampleSenseChildrenSplitter(eg, wordTry1[0].content);

      console.log("!!!!!DEFINITIONS => ",definity);
      console.log("!!!!!EG => ",eg);
      console.log("!!!!!GRAMTICAL DEFINITIONS => ",defGramGrp);
      console.log("!!!!!EXAMPLES => ",finalExample);
    // }

    const some: FormField = {orth: '', syll: '', posError: '', gram: ''};
    const other: FormField = {orth: '', syll: '', posError: '', gram: ''};
    const anothersForms: Array<FormField> = [];
    wordTry1.forEach((item) => {
      if(item.id === '0'){
        if(item.name === 'orth'){
          some.orth = item.content
        }else if(item.name === 'syll'){
          some.syll = item.content
        }else if(item.name === 'posErrores'){
          some.posError = item.content
        }
      } else if(item.id !== '0'){
        if(item.name === 'orth'){
          other.orth = item.content
        }else if(item.name === 'syll'){
          other.syll = item.content
        }else if(item.name === 'posError'){
          other.posError = item.content
        }else if(item.name === 'gram'){
          other.gram = item.content
        }
        anothersForms.push(other);
      }
    })
    console.log("Palabras",some)
    console.log("Otras Formas", anothersForms);

    const some2: catGram = {pos: '', itype: ''};
    gramTry1.forEach((item) => {
      if(item.name === 'pos'){
        some2.pos = item.content
      }else if(item.name === 'itype'){
        some2.itype = item.content
      }
    })
    console.log("Gramatica", some2)

    const resultsOfGram: Array<catGramWithId> = [];
    defGramGrp.forEach((item, index) => {
      const tempGram1: catGramWithId = { id:'', pos: '', itype: ''}
      if (item.name === 'pos') {
        tempGram1.id = item.id;
        tempGram1.pos = item.content;
      } else if (item.name === 'itype') {
        tempGram1.id = item.id;
        tempGram1.itype = item.content;
      }
      resultsOfGram.push(tempGram1);
    })
    console.log(resultsOfGram);

    const resultsOfResults: Array<Array<testWordPlus>> = this.vectorTransform(definity, senseCount.length);
    const examplesOfResults: Array<Array<testWordPlus>> = this.vectorTransform(finalExample, senseCount.length);
    console.log("Definiciones",resultsOfResults);
    console.log("Ejemplos", examplesOfResults);

    const sensesVector: Array<senseField> = [];
    senseCount.forEach((item, index) => {
      const gramGrp: Array<catGram> = resultsOfGram.filter((x)=> x.id === (index + 1).toString());
      const def: Array<Array<testWordPlus>> = resultsOfResults.filter((x, i) => i === index);
      const ex: Array<Array<testWordPlus>> = examplesOfResults.filter((x, i) => i === index);
      const sense: senseField = SenseFieldBuilder.newInstance()
        .withCategoriaGramatical(gramGrp)
        .withDefiniciones(def)
        .withEjemplos(ex)
        .build();
      sensesVector.push(sense);
    })
    console.log("SENSESS",sensesVector);

    return FinalWordBuilder.newInstance()
      .withPalabra(some)
      .withContarget(contarget)
      .withCategoriaGramatical(some2)
      .withSense(sensesVector)
      .withHomofonas(anothersForms.slice(1))
      .build();
  }

  vectorTransform(myVector: Array<testWordPlus>, senseCount: number): Array<Array<testWordPlus>>{
    let count: number = 0;
    const finalsResults: Array<Array<testWordPlus>> = [];
    while(count != senseCount){
     const results: Array<testWordPlus> = myVector.filter(x => x.id == (count + 1).toString());
     count++;
     finalsResults.push(results);
    }
    return finalsResults;
  }
  // dividerInTwo(value: Array<Array<any>>): Array<testWordPlus>{
  //   if(value.length === 0) throw new Error("Error Vector Vacio");
  //   if(value.length === 1) return value[0];
  //   const result: binaryObject = BinaryObjectBuilder.newInstance()
  //     .withLeftOperand(value[0])
  //     .withRightOperand((this.dividerInTwo(value.slice(1))))
  //     .build();
  //   return result.leftOperand
  // }
}
