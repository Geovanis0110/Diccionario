import {
  catGram,
  ReTypeFormField,
  SenseField,
  SenseSrcType,
  SrcType,
  UsgSuperType,
  UsgType
} from "../Interfaces/word.interface";
import {testWord, testWordPlus} from "../Services/transform-data-json.service";


export class SenseFieldBuilder {
  private readonly _senseField: SenseField = {
    categoriaGramatical: [],
    senseUsg: [],
    definiciones: [],
    ejemplos: [],
    entradasRelacionadas: [],
    senseSrc: [],
    notas: [],
    referenciasCruzadas: []
  }

  static newInstance(): SenseFieldBuilder {
    return new SenseFieldBuilder();
  }

  withCategoriaGramatical(categoriaGramatical: Array<catGram>): SenseFieldBuilder {
    this._senseField.categoriaGramatical = categoriaGramatical;
    return this;
  }

  withDefiniciones(definiciones: Array<Array<testWordPlus>>): SenseFieldBuilder {
    this._senseField.definiciones = definiciones;
    return this;
  }

  withUsg(senseUsg: Array<UsgSuperType>): SenseFieldBuilder {
    this._senseField.senseUsg = senseUsg;
    return this;
  }

  withEjemplos(ejemplos: Array<Array<testWordPlus>>): SenseFieldBuilder {
    this._senseField.ejemplos = ejemplos;
    return this;
  }

  withEntradasRelacionadas(entradasRelacionadas: Array<ReTypeFormField>): SenseFieldBuilder {
    this._senseField.entradasRelacionadas = entradasRelacionadas;
    return this;
  }

  withSenseSrc(senseSrc: Array<SenseSrcType>): SenseFieldBuilder {
    this._senseField.senseSrc = senseSrc;
    return this;
  }

  withNotas(notas: Array<any>): SenseFieldBuilder {
    this._senseField.notas = notas;
    return this;
  }

  withReferenciaCruzada(referenciaCruzada: Array<any>): SenseFieldBuilder {
    this._senseField.referenciasCruzadas = referenciaCruzada;
    return this;
  }

  build(): SenseField {
    return this._senseField;
  }

}
