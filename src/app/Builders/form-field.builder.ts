import {FormField} from "../Interfaces/word.interface";

export class FormFieldBuilder{
  private readonly _formField: FormField = {
    gram: '',
    orthography: '',
    positionError: '',
    syllable: '',
    gen: '',
    lbl: '',
    number: ''
  }

  static newInstance(): FormFieldBuilder {
    return new FormFieldBuilder();
  }

  withOrthography(orthography: string): FormFieldBuilder{
    this._formField.orthography = orthography;
    return this;
  }
  withPositionError(positionError: string): FormFieldBuilder{
    this._formField.positionError = positionError;
    return this;
  }
  withSyllable(syllable: string): FormFieldBuilder{
    this._formField.syllable = syllable;
    return this;
  }

  withGram(gram: string): FormFieldBuilder{
    this._formField.gram = gram;
    return this;
  }

  build(): FormField{
    return this._formField;
  }
}
