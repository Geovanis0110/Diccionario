import {catGram, FinalForm, FinalWord, NoteType, SenseField, SrcType, UsgType} from "../Interfaces/word.interface";
import {FormFieldBuilder} from "./form-field.builder";

export class FinalWordBuilder{
  private readonly _finalWord: FinalWord = {
    palabra: {form: FormFieldBuilder.newInstance().build(), forms: [], another: []},
    palabraSrc: [],
    grupoGramatical: [],
    usg: {type: '', value: ''},
    senses: [],
    notes: []
  }

  static newInstance(): FinalWordBuilder{
    return new FinalWordBuilder();
  }
  withPalabra(palabra: FinalForm): FinalWordBuilder{
    this._finalWord.palabra = palabra;
    return this;
  }

  withPalabraSrc(palabraSrc: Array<SrcType>): FinalWordBuilder {
    this._finalWord.palabraSrc = palabraSrc;
    return this;
  }

  withGrupoGramatical(grupoGramatical: Array<catGram>): FinalWordBuilder {
    this._finalWord.grupoGramatical = grupoGramatical;
    return this;
  }

  withUsg(usg: UsgType): FinalWordBuilder {
    this._finalWord.usg = usg;
    return this;
  }
  withSense(senses: Array<SenseField>): FinalWordBuilder{
    this._finalWord.senses = senses;
    return this;
  }

  withNotes(notes: Array<NoteType>): FinalWordBuilder{
    this._finalWord.notes = notes;
    return this;
  }

  build(): FinalWord{
    return this._finalWord;
  }
}
