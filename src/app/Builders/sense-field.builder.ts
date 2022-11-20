import {catGram, localReference, senseField} from "../Interfaces/word.interface";
import {testWord, testWordPlus} from "../Services/transform-data-json.service";


export class SenseFieldBuilder{
  private readonly _senseField: senseField = {
    categoriaGramatical: [],
    definiciones: [],
    ejemplos: [],
    referenciaLocal: []
  }

  static newInstance(): SenseFieldBuilder{
    return new SenseFieldBuilder();
  }

  withCategoriaGramatical(categoriaGramatical: Array<catGram>): SenseFieldBuilder{
    this._senseField.categoriaGramatical = categoriaGramatical;
    return this;
  }

  withDefiniciones(definiciones: Array<Array<testWordPlus>>): SenseFieldBuilder{
    this._senseField.definiciones = definiciones;
    return this;
  }

  withEjemplos(ejemplos: Array<Array<testWordPlus>>): SenseFieldBuilder{
    this._senseField.ejemplos = ejemplos;
    return this;
  }
  withReferenciaLocal(referenciaLocal: Array<localReference>): SenseFieldBuilder{
    this._senseField.referenciaLocal = referenciaLocal;
    return this;
  }

  build(): senseField{
    return this._senseField;
  }

}
