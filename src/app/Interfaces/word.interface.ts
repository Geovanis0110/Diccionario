import {testWord, testWordPlus} from "../Services/transform-data-json.service";

export interface FinalWord{
  palabra: FormField,
  conjtarget: string,
  catergoriaGramatical: catGram,
  senses: Array<senseField>,
  usg: string,
  homofonas: Array<FormField>
}

export interface FormField{
  orth: string,
  posError: string,
  syll: string,
  gram: string,
}

export interface senseField{
  categoriaGramatical: Array<catGram>,
  definiciones: Array<Array<testWordPlus>>,
  ejemplos: Array<Array<testWordPlus>>,
  referenciaLocal: Array<localReference> | string;
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

export interface localReference{
  tipoReferencia: string,
  referencia: string,
  idReferencia: string
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
    afjGram: string,
    pos: Array<string>,
    usg: Array<string>
}

export interface binaryObject{
  leftOperand: Array<testWordPlus>,
  rightOperand: Array<testWordPlus>
}
