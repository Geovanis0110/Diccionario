import {FormField} from "../Interfaces/word.interface";

export class FormFieldBuilder{
  private readonly _formField: FormField = {
    gram: '',
    orth: '',
    posError: '',
    syll: '',
  }

  static newInstance(): FormFieldBuilder {
    return new FormFieldBuilder();
  }

  withOrtography(orth: string): FormFieldBuilder{
    this._formField.orth = orth;
    return this;
  }
  withPosError(posError: string): FormFieldBuilder{
    this._formField.posError = posError;
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
