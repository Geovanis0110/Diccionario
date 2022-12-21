import {Pipe, PipeTransform} from "@angular/core";
import {AllWord, UsgType} from "../Interfaces/word.interface";
import {FilterField, FilterForm, FilterUsg} from "../Interfaces/filter.interface";


@Pipe({
  name: 'advfilter'
})
export class AdvFilterPipe implements PipeTransform{
  test: Array<AllWord> = [];
  testResult: Array<FilterUsg> = []; 
  transform(value: Array<AllWord>, args: FilterForm) {
    const result: Array<AllWord> = [];
    
    
    if (args != undefined) {
      const { options } = args;
      switch (args.category) {
        case 'cat':
          value = this.handleFilter(value, 'cat', options);
          break;
        case 'style':
          value = this.handleFilter(value, 'style', options);
          break;
        case 'geo':
          value = this.handleFilter(value, 'geo', options);
          break;
        case 'dom':
          value = this.handleFilter(value, 'dom', options);
          break;
        case 'afjGram':
          value = this.handleFilter(value, 'afjGram', options);
          break;
      
        default:
          break;
      }
    }

    return value;
  }

  handleFilter(a: Array<AllWord>, atype: string, avalue: Array<FilterField>) {
    this.test = [];
    this.testResult = [];
    const result: Array<any> = [];
    a.forEach((item: AllWord, index: number) => {
      item.usg.forEach((obj: UsgType) => {
        const { type, value } = obj;
        const usgForm = { index, item, type, value };
        result.push({ ...usgForm });
      })
    })
    
    const rst = result.filter((item: FilterUsg) => item.type === atype);
    if (avalue.length === 1) {
      this.testResult = rst.filter((item: FilterUsg) => item.value === avalue[0].selectedValue);
    } 

    this.testResult.forEach((item: FilterUsg) => {
      this.test.push({...item.item})
    })
    
    return this.test;
  }
}
