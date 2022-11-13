import {Pipe, PipeTransform} from '@angular/core';
import {AllWord} from "../Interfaces/word.interface";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


  transform(arrayFinal: Array<any>, searchMode: string, arg: string): AllWord[]{
    let _allWord: AllWord[] = arrayFinal;

    let _result: AllWord[] = [];

    _allWord = _allWord.reduce((a: Array<AllWord>, e: AllWord) => {
      if (!a.find((d: AllWord) => d.word == e.word)) {
        a.push(e);
      }
      return a;
    }, []);

    // console.log(_allWord);

    if(searchMode === 'reg1' || searchMode === ''){
      _allWord.forEach((item)=>{
        if(item.word.startsWith(arg)){
          _result.push({...item})
        }
      })
    }else if(searchMode === 'reg2'){
      _allWord.forEach((item)=>{
        if(item.word.includes(arg)){
          _result.push({...item})
        }
      })
    }else if(searchMode === 'reg3'){
      _allWord.forEach((item)=>{
        if(item.word.endsWith(arg)){
          _result.push({...item})
        }
      })
    }
    return _result;
  }
}
