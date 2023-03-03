import {SrcType} from "../Interfaces/word.interface";

export class SrcTypeBuilder {
  private readonly _srcTypeObject: SrcType = {
    type: '',
    url: '',
  }

  static newInstance(): SrcTypeBuilder {
    return new SrcTypeBuilder();
  }

  withType(type: string): SrcTypeBuilder {
    this._srcTypeObject.type = type;
    return this;
  }

  withUrl(url: string): SrcTypeBuilder {
    this._srcTypeObject.url = url;
    return this;
  }

  build(): SrcType {
    return this._srcTypeObject;
  }
}
