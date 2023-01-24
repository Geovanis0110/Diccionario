import {Injectable} from '@angular/core';
import {
  AllWord,
  AnotherForms,
  binaryObject,
  catGram,
  catGramWithId,
  FinalWord,
  FormField, Reference,
  SenseField,
  SrcType,
  UsgType,
  Word,
  WordData,
} from '../Interfaces/word.interface';
import {FormFieldBuilder} from '../Builders/form-field.builder';
import {BinaryObjectBuilder} from '../Builders/binary-object.builder';
import {TestWordPlusBuilder} from '../Builders/test-word-plus.builder';
import {SenseFieldBuilder} from '../Builders/sense-field.builder';
import {FinalWordBuilder} from '../Builders/final-word.builder';
import {DataParserService} from './data-parser.service';

export interface testWord {
  textos: string;
  idTextos: any;
}

export interface testWordPlus {
  textos: string;
  lemmaid: string;
  id: string;
}

export interface xmlObj {
  name: string;
  content: any;
}

export interface xmlObjPlus {
  id: string;
  name: string;
  content: any;
}

export interface xmlObjPlusUltra {
  id: string;
  name: string;
  itarget: string;
  vtarget: string;
  atarget: string;
  content: any;
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
  };

  wordData: WordData = {
    wordOrth: '',
    contarget: '',
    definition: [],
    examples: [],
  };

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
        const Usg: UsgType = {type: '', value: ''};
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
            Usgs.push({...Usg});
          } else if (obj.tagName === 'afjGram') {
            AfjGrams.push(obj.textContent);
          }
        });
        this.wordAll.usg = Usgs;
        this.wordAll.pos = Poss;
        this.wordAll.afjGram = AfjGrams;
        this.wordAll.reverseWord = '';
        result.push({...this.wordAll});
      });
      return result;
    } else {
      const result: Array<AllWord> = [];
      const entrys = Array.from(data.querySelectorAll('entry'));
      entrys.forEach((item: any) => {
        const Usg: UsgType = {type: '', value: ''};
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
            Usgs.push({...Usg});
          } else if (obj.tagName === 'afjGram') {
            AfjGrams.push(obj.textContent);
          }
        });
        this.wordAll.usg = Usgs;
        this.wordAll.pos = Poss;
        this.wordAll.afjGram = AfjGrams;
        result.push({...this.wordAll});
      });
      return result;
    }
  }

  getEntrysCount(dataWord: any) {
    return Array.from(dataWord.querySelectorAll('entry')).map((x) => x);
  }

  onTransformDataWord(dataWord: any) {
    console.log(this.xmlToJSONManualParser(dataWord));

    //Split the entry
    // const entrys: Array<any> = Array.from(dataWord.querySelectorAll("entry")).map((x: any) => {
    //   return x;
    // })
    // const entrysChildsName: any = Array.from(dataWord.querySelectorAll("entry").children).map((x: any) => {
    //   return x.tagName;
    // })
    //   let haveImages: boolean = false;
    let attributesArray: Array<any> = [];
    let videosSrc: string = '';
    let audioSrc: string = '';
    let imgSrc: string = '';
    let contarget: string = '';
    const palabrasSrc: Array<SrcType> = [];
    if (dataWord.attributes.length > 1) {
      console.log('Tiene dos atributos');
      Array.from(dataWord.attributes).forEach((item: any) => {
        if (item.name === 'itarget') {
          console.log(item.value);
          const itarget: SrcType = {url: "../../../../assets/img/" + item.value, type: 'img'}
          palabrasSrc.push({...itarget});
        } else if (item.name === 'vtarget') {
          console.log(item.value);
          const vtarget: SrcType = {url: "../../../../assets/videos" + item.value, type: 'video'}
          palabrasSrc.push({...vtarget});
        } else if (item.name === 'atarget') {
          console.log("../../../../assets/audios/" + item.value);
          const atarget: SrcType = {url: "../../../../assets/audios" + item.value, type: 'audio'}
          palabrasSrc.push({...atarget});
        } else if (item.name === 'conjtarget') {
          const conjtarget: SrcType = {url: item.value, type: 'conjugativo'}
          palabrasSrc.push({...conjtarget});
        }
      });
    } else {
      console.log('Tiene uno o menos');
    }
    const childrens: Array<any> = Array.from(dataWord.children);
    console.log('My childrens =>', childrens);
    const senseCount: Array<any> = childrens.filter(
      (item: any) => item.tagName === 'sense'
    );
    const formCount: Array<any> = childrens.filter(
      (item: any) => item.tagName === 'form'
    );

    console.log('formCount: ', formCount.length, 'AllForms: ', formCount);
    console.log('senseCount: ', senseCount.length, 'AllSense: ', senseCount);
    console.log('Entradas (Comienzo)', dataWord);

    const formResult = this._dataParser.formConstructor(formCount);

    // Objeto con la palabra, error y silaba
    let wordTry1: Array<xmlObjPlus> = [];
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
    // if (entrys.length > 1) {
    //   console.log("Multiples Entradas", entrys);

    // } else
    // if (dataWord.length === 1) {

    //   Esto falta
    console.log('Tiene Tabla Verbal con Id:', contarget);

    wordTry1 = this._dataParser.onEntryChildrenSplitter(childrens, 'form');
    gramTry1 = this._dataParser.onEntryChildrenSplitter(childrens, 'gramGrp');
    senseTry1 = this._dataParser.onEntryChildrenSplitter(childrens, 'sense');
    const senseMedia = this._dataParser.onMediaDataSplitter(childrens, 'sense');

    const reChildrens: Array<Reference> = [];
    senseCount
      .forEach((item, index) => {
        const temp: Array<any> = Array.from(item.children);
        temp
          .forEach((obj) => {
            if (obj.tagName === 're') {
              const reObj: Reference = {idReferencia: 0, referencia: ""};
              reObj.idReferencia = item.getAttributeNode('n').value;
              reObj.referencia = obj;
              reChildrens.push({...reObj});
            }
          });
      })
    console.log("Hijos de la Referencias: ", reChildrens)
    const re = this._dataParser.onEntryReferenceChildrenSplitter(reChildrens);

    console.log('!!!!!WORD', wordTry1);
    console.log('!!!!!GRAM', gramTry1);
    console.log('!!!!!SENSE', senseTry1);

    // const notes = this._dataParser.onNotesChildrenSplitter(senseTry1, 'notes');
    // const xr = this._dataParser.onCrossReferenceChildrenSplitter(senseTry1, 'xr');
    definity = this._dataParser.onDefSenseChildrenSplitter(senseTry1, 'def');
    eg = this._dataParser.onEgSenseChildrenSplitter(senseTry1, 'eg');
    defGramGrp = this._dataParser.onGramGrpSenseChildrenSplitter(
      senseTry1,
      'gramGrp'
    );
    finalExample = this._dataParser.onExampleSenseChildrenSplitter(
      eg,
      wordTry1[0].content
    );
    console.log('!!!!!DEFINITIONS => ', definity);
    console.log('!!!!!EG => ', eg);
    console.log('!!!!!GRAMTICAL DEFINITIONS => ', defGramGrp);
    console.log('!!!!!EXAMPLES => ', finalExample);
    // }

    // const some: FormField = {
    //   orth: '',
    //   syll: '',
    //   posErrores: '',
    //   gram: '',
    //   gen: '',
    //   lbl: '',
    //   number: '',
    // };
    // const other: xmlObj = { name: '', content: '' };
    // const anothersForms: Array<xmlObj> = [];
    // wordTry1.forEach((item) => {
    //   if (item.id === '0') {
    //     if (item.name === 'orth') {
    //       some.orth = item.content;
    //     } else if (item.name === 'syll') {
    //       some.syll = item.content;
    //     } else if (item.name === 'posErrores') {
    //       some.posErrores = item.content;
    //     }
    //   }
    // });
    // for (let i = 0; i < wordTry1.length; i++) {
    //   if (+wordTry1[i].id != 0) {
    //     if (wordTry1[i].id === wordTry1[i + 1]?.id) {
    //       other.name = wordTry1[i].content;
    //       other.content = wordTry1[i + 1].content;
    //       anothersForms.push({ ...other });
    //     }
    //   }
    // }
    // console.log('Palabras', some);
    // console.log('Otras Formas', anothersForms);
    //
    const some2: catGram = {pos: '', itype: ''};
    gramTry1.forEach((item) => {
      if (item.name === 'pos') {
        some2.pos = item.content;
      } else if (item.name === 'itype') {
        some2.itype = item.content;
      }
    });
    console.log('Gramatica', some2);

    const resultsOfGram: Array<catGramWithId> = [];
    defGramGrp.forEach((item, index) => {
      const tempGram1: catGramWithId = {id: '', pos: '', itype: ''};
      if (item.name === 'pos') {
        tempGram1.id = item.id;
        tempGram1.pos = item.content;
      } else if (item.name === 'itype') {
        tempGram1.id = item.id;
        tempGram1.itype = item.content;
      }
      resultsOfGram.push(tempGram1);
    });
    console.log(resultsOfGram);

    const resultsOfResults: Array<Array<testWordPlus>> = this.vectorTransform(
      definity,
      senseCount.length
    );
    const examplesOfResults: Array<Array<testWordPlus>> = this.vectorTransform(
      finalExample,
      senseCount.length
    );
    console.log('Definiciones', resultsOfResults);
    console.log('Ejemplos', examplesOfResults);

    const sensesVector: Array<SenseField> = [];
    senseCount.forEach((item, index) => {
      const gramGrp: Array<catGram> = resultsOfGram.filter(
        (x) => x.id === (index + 1).toString()
      );
      const def: Array<Array<testWordPlus>> = resultsOfResults.filter(
        (x, i) => i === index
      );
      const ex: Array<Array<testWordPlus>> = examplesOfResults.filter(
        (x, i) => i === index
      );
      const sense: SenseField = SenseFieldBuilder.newInstance()
        .withCategoriaGramatical(gramGrp)
        .withSenseSrc(senseMedia)
        .withDefiniciones(def)
        .withEjemplos(ex)
        .build();
      sensesVector.push(sense);
    });
    console.log('SENSESS', sensesVector);

    return FinalWordBuilder.newInstance()
      .withPalabra(formResult)
      .withPalabraSrc(palabrasSrc)
      .withGrupoGramatical(some2)
      .withSense(sensesVector)
      .build();
  }

  vectorTransform(
    myVector: Array<testWordPlus>,
    senseCount: number
  ): Array<Array<testWordPlus>> {
    let count: number = 0;
    const finalsResults: Array<Array<testWordPlus>> = [];
    while (count != senseCount) {
      const results: Array<testWordPlus> = myVector.filter(
        (x) => x.id == (count + 1).toString()
      );
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

  xmlToJSONManualParser(xml: any) {
    let objeto: any = {};

    if (xml.nodeType == 1) {
      if (xml.attributes.length > 0) {
        objeto["@attributes"] = {};
        for (let j = 0; j < xml.attributes.length; j++) {
          let attribute = xml.attributes.item(j);
          objeto["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) {
      objeto = xml.nodeValue;
    }

    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        let item = xml.childNodes.item(i);
        let nodeName = item.nodeName;

        if (typeof (objeto[nodeName]) == "undefined") {
          objeto[nodeName] = this.xmlToJSONManualParser(item);
        } else {
          if (typeof (objeto[nodeName].push) == "undefined") {
            let attributeValue = objeto[nodeName];
            objeto[nodeName] = [];
            objeto[nodeName].push(attributeValue);
          }
          objeto[nodeName].push(this.xmlToJSONManualParser(item));
        }
      }
    }

    return objeto;
  }

}
