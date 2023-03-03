import {catGram, FinalForm, FinalWord, NoteType, Resources, SenseField, UsgType} from "../Interfaces/word.interface";
import {FormFieldBuilder} from "./form-field.builder";
import {ResourcesBuilder} from "./resources.builder";

export class FinalWordBuilder{
  private readonly _finalWord: FinalWord = {
    palabra: {form: FormFieldBuilder.newInstance().build(), forms: [], another: []},
    palabraSrc: ResourcesBuilder.newInstance().build(),
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

  withPalabraSrc(palabraSrc: Resources): FinalWordBuilder {
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
