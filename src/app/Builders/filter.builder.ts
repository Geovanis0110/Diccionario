import {FilterField} from "../Interfaces/filter.interface";

export class FilterBuilder {
  private readonly _filter: FilterField = {
    id: 0,
    selectedValue: ''
  }

  static newInstance(): FilterBuilder{
    return new FilterBuilder();
  }
  
  withId(id: number): FilterBuilder{
    this._filter.id = id;
    return this;
  }

  withSelectedValue(selectedValue: string): FilterBuilder{
    this._filter.selectedValue = selectedValue;
    return this;
  }

  build(): FilterField{
    return this._filter;
  }
}
