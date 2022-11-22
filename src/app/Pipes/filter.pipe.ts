import {Pipe, PipeTransform} from '@angular/core';
import { AllWord } from "../Interfaces/word.interface";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: Array<AllWord>, ...args: any): AllWord[]{
    value = value.reduce((a: Array<AllWord>, e: AllWord) => {
      if (!a.find((d: AllWord) => d.word === e.word)) {
        a.push(e);
      }
      return a;
    },[])
    return value;
  }
}
