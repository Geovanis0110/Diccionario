import {AnotherForms, catGram, FinalWord, FormField, senseField} from "../Interfaces/word.interface";
import { xmlObj } from "../Services/transform-data-json.service";

export class FinalWordBuilder{
  private readonly _finalWord: FinalWord = {
    palabra: {
      orth: '',
      posError: '',
      syll: '',
      gram: ''
    },
    conjtarget: '',
    catergoriaGramatical: {
       pos: '',
      itype: ''
    },
    usg: '',
    senses: [],
    homofonas: []
  }

  static newInstance(): FinalWordBuilder{
    return new FinalWordBuilder();
  }
  withPalabra(palabra: FormField): FinalWordBuilder{
    this._finalWord.palabra = palabra;
    return this;
  }
  withContarget(conjtarget: string): FinalWordBuilder{
    this._finalWord.conjtarget = conjtarget;
    return this;
  }
  withCategoriaGramatical(categoriaGramatical: catGram): FinalWordBuilder{
    this._finalWord.catergoriaGramatical = categoriaGramatical;
    return this;
  }
  withUsg(usg: string): FinalWordBuilder{
    this._finalWord.usg = usg;
    return this;
  }
  withSense(senses: Array<senseField>): FinalWordBuilder{
    this._finalWord.senses = senses;
    return this;
  }
  withHomofonas(homofonas: Array<xmlObj>): FinalWordBuilder{
    this._finalWord.homofonas = homofonas;
    return this;
  }

  build(): FinalWord{
    return this._finalWord;
  }
}
