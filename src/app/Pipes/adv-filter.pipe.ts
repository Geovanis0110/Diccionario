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
    
    if (args != undefined) {
      const { options } = args;
      switch (args.category) {
        case 'cat':
          value = this.handleFilterWithPos(value, 'cat', options);
          break;
        case 'style':
          value = this.handleFilterWithUsg(value, 'style', options);
          break;
        case 'geo':
          value = this.handleFilterWithUsg(value, 'geo', options);
          break;
        case 'dom':
          value = this.handleFilterWithUsg(value, 'dom', options);
          break;
        case 'afjGram':
          value = this.handleFilterWithAfj(value, options);
          break;
      
        default:
          break;
      }
    }

    return value;
  }

  handleFilterWithUsg(a: Array<AllWord>, atype: string, avalue: Array<FilterField>) {
    const response: Array<AllWord> = [];
    const result: Array<FilterUsg> = [];
    a.forEach((item: AllWord) => {
      item.usg.forEach((obj: UsgType) => {
        const { type, value } = obj;
        const usgForm = { item, type, value };
        result.push({ ...usgForm });
      })
    })
    
    result.filter((item: FilterUsg) => item.type === atype && item.value === avalue[0].selectedValue)
      .forEach((item) => response.push({ ...item.item }));
    return response;
  }

  handleFilterWithPos(a: Array<AllWord>, atype: string, avalue: Array<FilterField>) {
    const response: Array<AllWord> = [];
    const result: Array<any> = [];
    return response;
  }
  handleFilterWithAfj(a: Array<AllWord>, avalue: Array<FilterField>) {
    const selVal: string = avalue[0].selectedValue;
    let response: Array<AllWord> = [];
    if (selVal === '(pf. y suf.)') {
      response = a.filter((item: AllWord) => item.afjGram.length === 2);
    } else if (selVal === '(pf.)|(suf.)') {
      response = a.filter((item: AllWord) => item.afjGram.length === 1);
    } else if(selVal === '(pf.)') {
      response = a.filter((item: AllWord) => item.afjGram[0] === selVal && item.afjGram.length === 1);
    } else if (selVal === '(suf.)') {
      response = a.filter((item: AllWord) => item.afjGram[0] === selVal && item.afjGram.length === 1);
    }
    return response;
  }
}
