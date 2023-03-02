import {catGram} from "../Interfaces/word.interface";

export class CatGramBuilder {
  private readonly _catGramObject: catGram = {
    value: " ",
    type: " ",
    tooltipName: " "
  }

  static newInstance(): CatGramBuilder {
    return new CatGramBuilder();
  }

  withValue(value: string): CatGramBuilder {
    this._catGramObject.value = value;
    return this;
  }

  withType(type: string): CatGramBuilder {
    this._catGramObject.type = type;
    return this;
  }

  withToolTipName(tooltipName: string): CatGramBuilder {
    this._catGramObject.tooltipName = tooltipName;
    return this;
  }

  build(): catGram {
    return this._catGramObject;
  }
}
