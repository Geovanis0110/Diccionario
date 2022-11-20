import {localReference} from "../Interfaces/word.interface";

export class LocalReferenceBuilder{
  private readonly _localReference: localReference = {
    idReferencia: '',
    referencia: '',
    tipoReferencia: ''
  }

  static newInstance(): LocalReferenceBuilder {
    return new LocalReferenceBuilder();
  }

  withIdReferencia(idReferencia: string): LocalReferenceBuilder{
    this._localReference.idReferencia = idReferencia;
    return this;
  }
  withReferenecia(referencia: string): LocalReferenceBuilder{
    this._localReference.referencia = referencia;
    return this;
  }
  withTipoReferencia(tipoReferencia: string){
    this._localReference.tipoReferencia = tipoReferencia;
    return this;
  }

  build(): localReference{
    return this._localReference;
  }
}
