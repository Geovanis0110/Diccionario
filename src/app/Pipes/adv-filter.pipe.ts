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
    let despectivo: Array<string> = [];
    let isDespectivo: boolean = false;
    if (avalue[0].selectedValue === 'despect.|en ocasiones despect.') {
      despectivo = avalue[0].selectedValue.split("|");
      isDespectivo = true;
    }
    a.forEach((item: AllWord) => {
      item.usg.forEach((obj: UsgType) => {
        const { type, value } = obj;
        const usgForm = { item, type, value };
        result.push({ ...usgForm });
      })
    })

    if (isDespectivo) {
      result.forEach((item: FilterUsg) => {
        despectivo.forEach((obj) => {if(item.value === obj) {response.push({...item.item})}})
      })
    } else {
      result.filter((item: FilterUsg) => item.type === atype && item.value === avalue[0].selectedValue)
      .forEach((item) => response.push({ ...item.item }));
    }

    return response;
  }

  handleFilterWithPos(a: Array<AllWord>, atype: string, avalue: Array<FilterField>) {
    const response: Array<AllWord> = [];
    if (avalue.length === 1) {
      const result: Array<string> = avalue[0].selectedValue.split('|');
      console.log(result);
      a.forEach((item) => {
        item.pos.forEach((pos) => {
          result.forEach((obj) => { if (pos === obj) { console.log(obj); response.push(item) } });
        })
      })
    } else if (avalue.length === 2) {
      const result1: Array<string> = avalue[0].selectedValue.split('|');
      const result2: Array<string> = avalue[1].selectedValue.split('|');
      a.forEach((item) => {
        item.pos.forEach((pos) => {
          result1.forEach((obj) => { if (pos === obj) { response.push(item) } });
          result2.forEach((obj) => { if (pos === obj) { response.push(item) } });
        })
      })
    } else {
      const result1: Array<string> = avalue[0].selectedValue.split('|');
      const result2: Array<string> = avalue[1].selectedValue.split('|');
      const result3: Array<string> = avalue[2].selectedValue.split('|');
      a.forEach((item) => {
        item.pos.forEach((pos) => {
          result1.forEach((obj) => { if (pos === obj) { response.push(item) } });
          result2.forEach((obj) => { if (pos === obj) { response.push(item) } });
          result3.forEach((obj) => { if (pos === obj) { response.push(item) } });
        })
      })
    }
    console.log(response);
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
    console.log("Hola Mundo ");
  }
}
