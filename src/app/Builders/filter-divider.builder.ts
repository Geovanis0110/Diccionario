import {FilterDivider} from "../Interfaces/filter-divider.interface";

export class FilterDividerBuilder{
  private readonly _filterDivider: FilterDivider = {
    leftOperand: [],
    rightOperand: []
  }

  static newInstance(): FilterDividerBuilder{
    return new FilterDividerBuilder();
  }

  withLeftOperand(leftOperand: any[]): FilterDividerBuilder{
    this._filterDivider.leftOperand = leftOperand;
    return this;
  }

  withRightOperand(rightOperand: any[]): FilterDividerBuilder{
    this._filterDivider.rightOperand = rightOperand;
    return this;
  }

  build(): FilterDivider{
    return  this._filterDivider;
  }
}
