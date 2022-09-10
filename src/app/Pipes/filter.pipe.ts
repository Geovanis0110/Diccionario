import {Pipe, PipeTransform} from '@angular/core';



@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, propOne: string, propTwo: string, propSubTwo: string, arg: any): any {
    const resultList = [];
    const resultIdList = [];
    //Parseando el JSON
    for (let item of value) {
      resultList.push(item[propOne][0])
      resultIdList.push(item[propTwo][propSubTwo])
    }

    //Eliminando Duplicados
    let result = resultList.reduce((a, e) => {
      if (!a.find((d: any) => d == e)) {
        a.push(e);
      }
      return a;
    }, [])
    //Mostrando Tamaño del arreglo sin duplicados
    // console.log(result.length)
    //Mostrando arreglo sin duplicados
    // console.log(result);
    //
    const wordStringList = [''];
    for (let itemString of result) {
      if (itemString.includes(arg)) {
        wordStringList.push(itemString);
      }
    }
    //Removiendo primer elemento del arreglo
    wordStringList.shift();
    return wordStringList;
  }
}
