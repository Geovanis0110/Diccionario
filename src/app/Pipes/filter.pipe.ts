import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


  transform(arrayFinal: Array<any>, propOne: string, searchMode: string, arg: string): any {
    console.log(searchMode);
    //Parseando el JSON
    let resultList: Array<any> = [];
    try {
      arrayFinal.forEach((item: any) => {
        resultList.push(item[propOne][0]);
      })
    } catch (error) {
    }


    //Eliminando Duplicados
    let result: Array<string> = resultList.reduce((a: Array<string>, e: string) => {
      if (!a.find((d: string) => d == e)) {
        a.push(e);
      }
      return a;
    }, [])


    let wordStringList: Array<string> = [''];
    //Realizando filtrado de las palabras e insertando en el listado final que va a ser mostrado

    if(searchMode == ''){
      for (let itemString of result) {
        if (itemString.match(arg)) {
          wordStringList.push(itemString);
        }
      }
    } else if(searchMode == 'af'){
      for (let itemString of result) {
        if (itemString.startsWith(arg, 0)) {
          wordStringList.push(itemString);
        }
      }
    }else if(searchMode == 'reg'){
      for (let itemString of result) {
        if (itemString.includes(arg)) {
          wordStringList.push(itemString);
        }
      }
    }else if(searchMode == 'subf'){
      for (let itemString of result) {
        if (itemString.endsWith(arg)) {
          wordStringList.push(itemString);
        }
      }
    }
    //Removiendo primer elemento del arreglo
    wordStringList.shift();
    return wordStringList;
  }
}
