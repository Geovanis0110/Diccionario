import {testWord, testWordPlus, xmlObj, xmlObjPlus} from "../Services/transform-data-json.service";

export interface UsgType{
  type: string,
  value: string
}

export interface SuggestType{
  word: string,
  id: string
}

export interface FinalWord{
  palabra: FinalForm,
  palabraSrc: Array<SrcType>
  grupoGramatical: catGram,
  senses: Array<SenseField>,
  usg: UsgType,
}

export interface FormField{
  orthography: string,
  positionError: string,
  syllable: string,
  gram: string,
  gen: string,
  number: string,
  lbl: string,
}

export interface AnotherForms{
  orthography: string,
  number: string,
  syllable: string,
  gen: string
}

export interface FinalForm{
  form: FormField,
  forms: Array<FormField>
  another: Array<AnotherForms>
}

export interface SenseField{
  senseSrc: Array<SenseSrcType>,
  categoriaGramatical: Array<catGram>,
  definiciones: Array<Array<testWordPlus>>,
  ejemplos: Array<Array<testWordPlus>>,
  entradasRelacionadas: Array<any>,
  referenciasCruzadas: Array<any>,
  notas: Array<any>
}

export interface catGram{
  pos: string,
  itype: string
}

export interface catGramWithId{
  id: string,
  pos: string,
  itype: string
}

export interface Reference{
  referencia: any,
  idReferencia: number
}

export interface reForm{
  id: number,
  form: FinalForm,
  sense: Array<SenseField>
}

export interface Word{
    id: string,
    word: string,
    afjGram: string,
    pos: Array<string>,
    usg: Array<string>
}

export interface WordData{
    wordOrth: string,
    contarget: string,
    definition: Array<testWordPlus>,
    examples: Array<testWordPlus>
}

export interface AllWord{
    id: string,
    word: string,
    reverseWord: string,
    afjGram: Array<string>,
    pos: Array<string>,
    usg: Array<UsgType>
}

export interface binaryObject{
  leftOperand: Array<testWordPlus>,
  rightOperand: Array<testWordPlus>
}

export interface SrcType{
  url: string,
  type: string
}

export interface SenseSrcType{
  url: string,
  type: string,
  id: number;
}

