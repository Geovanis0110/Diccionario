import {testWordPlus} from '../Services/transform-data-json.service';

export interface UsgType {
  type: string;
  value: string;
}

export interface SuggestType {
  word: string;
  id: string;
}

export interface FinalWord {
  palabra: FinalForm;
  palabraSrc: Resources;
  grupoGramatical: Array<catGram>;
  senses: Array<SenseField>;
  usg: UsgType;
  notes: Array<NoteType>
}

export interface FormField {
  orthography: string;
  positionError: Array<string>;
  syllable: string;
  gram: string;
  gen: string;
  number: string;
  lbl: string;
}

export interface AnotherForms {
  orthography: string;
  number: string;
  syllable: string;
  gen: string;
  gram: string;
}

export interface FinalForm {
  form: FormField;
  forms: Array<FormField>;
  another: Array<AnotherForms>;
}

export interface UsgSuperType{
  id: number,
  usg: UsgType
}

export interface SenseField {
  senseSrc: Array<SenseSrcType>;
  senseUsg: Array<UsgSuperType>;
  categoriaGramatical: Array<catGramWithId>;
  definiciones: Array<Array<testWordPlus>>;
  ejemplos: Array<Array<testWordPlus>>;
  entradasRelacionadas: Array<ReTypeFormField>;
  referenciasCruzadas: Array<XrFieldType>;
  notas: Array<any>;
}

export interface catGram {
  value: string;
  type: string;
  tooltipName: string;
}

export interface catGramWithId {
  id: string;
  pos: string;
  itype: string;
}

export interface Reference {
  referencia: any;
  idReferencia: number;
}

export interface reForm {
  id: number;
  form: FinalForm;
  sense: Array<SenseField>;
}

export interface Word {
  id: string;
  word: string;
  afjGram: string;
  pos: Array<string>;
  usg: Array<string>;
}

export interface WordData {
  wordOrth: string;
  contarget: string;
  definition: Array<testWordPlus>;
  examples: Array<testWordPlus>;
}

export interface AllWord {
  id: string;
  word: string;
  reverseWord: string;
  afjGram: Array<string>;
  pos: Array<string>;
  usg: Array<UsgType>;
}

export interface binaryObject {
  leftOperand: Array<testWordPlus>;
  rightOperand: Array<testWordPlus>;
}

export interface SrcType {
  url: string;
  type: string;
}

export interface SenseSrcType {
  url: string;
  type: string;
  id: number;
}

export interface ReType {
  senseNumber: number;
  reNumber: number;
  definition: Array<testWordPlus>;
  examples: Array<testWordPlus>;
}

export interface StandardReType {
  forms: Array<FormField>;
  senses: Array<ReType>;
}

export interface ReTypeFormField {
  senseNumber: number;
  reNumber: number;
  myForms: FormField;
  mySense: ReType;
}

export interface CrossReference {
  crossRefId: number;
  crossReference: any;
}

export interface XrFieldType {
  senseFather: number;
  xrNumber: number;
  lbl: string;
  ref: Array<SuggestType>;
  refArr: Array<SuggestType>
}

export interface NoteType {
  id: number,
  type: string,
  noteDefinition: Array<testWordPlus>
}

export interface Resources {
  img: SrcType;
  video: SrcType;
  audio: SrcType;
  conj: SrcType;
}

