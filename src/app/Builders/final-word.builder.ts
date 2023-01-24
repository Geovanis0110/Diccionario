import {SrcType,AnotherForms, catGram, FinalWord, FormField, SenseField, FinalForm, UsgType} from "../Interfaces/word.interface";
import { xmlObj } from "../Services/transform-data-json.service";

export class FinalWordBuilder{
  private readonly _finalWord: FinalWord = {
    palabra: { form: {
      orth: '',
      posErrores: '',
      syll: '',
      gram: '',
      gen: '',
      lbl: '',
      number: ''
    }, forms: [], anothers: []},
    palabraSrc: [],
    grupoGramatical: {
       pos: '',
      itype: ''
    },
    usg: {type: '', value: ''},
    senses: [],
  }

  static newInstance(): FinalWordBuilder{
    return new FinalWordBuilder();
  }
  withPalabra(palabra: FinalForm): FinalWordBuilder{
    this._finalWord.palabra = palabra;
    return this;
  }
  withPalabraSrc(palabraSrc: Array<SrcType>): FinalWordBuilder{
    this._finalWord.palabraSrc = palabraSrc;
    return this;
  }
  withGrupoGramatical(grupoGramatical: catGram): FinalWordBuilder{
    this._finalWord.grupoGramatical = grupoGramatical;
    return this;
  }
  withUsg(usg: UsgType): FinalWordBuilder{
    this._finalWord.usg = usg;
    return this;
  }
  withSense(senses: Array<SenseField>): FinalWordBuilder{
    this._finalWord.senses = senses;
    return this;
  }

  build(): FinalWord{
    return this._finalWord;
  }
}
