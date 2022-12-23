import { AllWord } from "./word.interface";

export interface FilterField{
  id: number;
  selectedValue: string;
}

export interface FilterAbreviations{
  criteria: string,
  abr: string
}

export interface FilterForm{
  category: string,
  options: Array<FilterField>
}

export interface FilterUsg{
  item: AllWord,
  type: string,
  value: string
}
