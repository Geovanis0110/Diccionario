import {binaryObject} from "../Interfaces/word.interface";
import {testWordPlus} from "../Services/transform-data-json.service";

export class BinaryObjectBuilder {
  private readonly _binaryObject: binaryObject = {
    leftOperand: [],
    rightOperand: []
  }

  static newInstance(): BinaryObjectBuilder{
    return new BinaryObjectBuilder();
  }

  withLeftOperand(leftOperand: Array<testWordPlus>): BinaryObjectBuilder{
    this._binaryObject.leftOperand = leftOperand;
    return this;
  }

  withRightOperand(rightOperand: Array<testWordPlus>): BinaryObjectBuilder{
    this._binaryObject.rightOperand = rightOperand;
    return  this;
  }
  build(): binaryObject{
    return this._binaryObject;
  }
}
