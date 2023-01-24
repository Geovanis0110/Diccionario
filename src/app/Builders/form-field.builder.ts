import {FormField} from "../Interfaces/word.interface";

export class FormFieldBuilder{
  private readonly _formField: FormField = {
    gram: '',
    orth: '',
    posErrores: '',
    syll: '',
    gen: '',
    lbl: '',
    number: ''
  }

  static newInstance(): FormFieldBuilder {
    return new FormFieldBuilder();
  }

  withOrtography(orth: string): FormFieldBuilder{
    this._formField.orth = orth;
    return this;
  }
  withPosErrores(posErrores: string): FormFieldBuilder{
    this._formField.posErrores = posErrores;
    return this;
  }
  withSyll(syll: string): FormFieldBuilder{
    this._formField.syll = syll;
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
