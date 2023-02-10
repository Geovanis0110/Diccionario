import {Injectable} from '@angular/core';
import {
  AllWord,
  catGram,
  catGramWithId,
  CrossReference,
  Reference,
  ReTypeFormField,
  SenseField,
  SrcType,
  StandardReType,
  UsgType,
  Word,
  WordData,
  XrFieldType,
} from '../Interfaces/word.interface';
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
    const palabrasSrc: Array<SrcType> = [];
    if (dataWord.attributes.length > 1) {
      console.log('Tiene dos atributos');
      Array.from(dataWord.attributes).forEach((item: any) => {
        if (item.name === 'itarget') {
          console.log(item.value);
          const imgTarget: SrcType = {
            url: '../../../../assets/img/' + item.value,
            type: 'img',
          };
          palabrasSrc.push({...imgTarget});
        } else if (item.name === 'vtarget') {
          console.log(item.value);
          const videoTarget: SrcType = {
            url: '../../../../assets/videos' + item.value,
            type: 'video',
          };
          palabrasSrc.push({...videoTarget});
        } else if (item.name === 'atarget') {
          console.log('../../../../assets/audios/' + item.value);
          const audioTarget: SrcType = {
            url: '../../../../assets/audios' + item.value,
            type: 'audio',
          };
          palabrasSrc.push({...audioTarget});
        } else if (item.name === 'conjtarget') {
          const conjugateTarget: SrcType = {
            url: item.value,
            type: 'conjugativo',
          };
          palabrasSrc.push({...conjugateTarget});
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

    let wordTry1: Array<xmlObjPlus> = [];
    let gramTry1: Array<xmlObjPlus> = [];
    let senseTry1: Array<xmlObjPlus> = [];
    let notesTry1: Array<xmlObjPlus> = [];
    let definity: Array<testWordPlus> = [];
    let eg: Array<xmlObjPlus> = [];
    let defGramGrp: Array<xmlObjPlus> = [];
    let finalExample: Array<testWordPlus> = [];

    wordTry1 = this._dataParser.onEntryChildrenSplitter(childrens, 'form');
    gramTry1 = this._dataParser.onEntryChildrenSplitter(childrens, 'gramGrp');
    senseTry1 = this._dataParser.onEntryChildrenSplitter(childrens, 'sense');
    const senseMedia = this._dataParser.onMediaDataSplitter(childrens, 'sense');

    const reChildrens: Array<Reference> = [];
    senseCount.forEach((item, index) => {
      const temp: Array<any> = Array.from(item.children);
      temp.forEach((obj) => {
        if (obj.tagName === 're') {
          const reObj: Reference = {idReferencia: 0, referencia: ''};
          reObj.idReferencia = item.getAttributeNode('n').value;
          reObj.referencia = obj;
          reChildrens.push({...reObj});
        }
      });
    });
    const reCount = reChildrens.length;
    console.log('Referencias - childrens => ', reChildrens);
    const re: StandardReType =
      this._dataParser.onEntryReferenceChildrenSplitter(
        reChildrens,
        formResult.form.orthography
      );
    console.log('Referencias Parseadas => ', re);

    const reTry: Array<ReTypeFormField> = [];
    for (let i = 0; i < reCount; i++) {
      const myForms = re.forms[i];
      const mySense = re.senses[i];
      const {senseNumber, reNumber} = mySense;
      const myObject = {senseNumber, reNumber, myForms, mySense};
      reTry.push({...myObject});
    }
    console.log('RETRY => ', reTry);

    const xrChildren: Array<CrossReference> = [];
    senseCount.forEach((item, index) => {
      const xrTemp: Array<any> = Array.from(item.children);
      xrTemp.forEach((insideObject) => {
        if (insideObject.tagName === 'xr') {
          const xrObj: CrossReference = {crossRefId: 0, crossReference: ''};
          xrObj.crossRefId = item.getAttributeNode('n').value;
          xrObj.crossReference = insideObject;
          xrChildren.push({...xrObj});
        }
      });
    });
    const xrCount = xrChildren.length;
    console.log('Referencias Cruzadas => ', xrChildren);
    const xr: Array<XrFieldType> =
      this._dataParser.onCrossReferenceChildrenSplitter(xrChildren, 'xr');
    console.log('Referencias Cruzadas Parseadas => ', xr);

    console.log('!!!!!WORD', wordTry1);
    console.log('!!!!!GRAM', gramTry1);
    console.log('!!!!!SENSE', senseTry1);

    // const notes = this._dataParser.onNotesChildrenSplitter(senseTry1, 'notes');
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
      const re: Array<ReTypeFormField> = reTry.filter(
        (x, i) => x.senseNumber.toString() === (index + 1).toString()
      );
      const xrFinal: Array<XrFieldType> = xr.filter(
        (x) => x.senseFather.toString() === (index + 1).toString()
      );
      const sense: SenseField = SenseFieldBuilder.newInstance()
        .withCategoriaGramatical(gramGrp)
        .withSenseSrc(senseMedia)
        .withDefiniciones(def)
        .withEjemplos(ex)
        .withEntradasRelacionadas(re)
        .withReferenciaCruzada(xrFinal)
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
}
