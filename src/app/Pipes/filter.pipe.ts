import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(arrayFinal: any[], propOne: string, propTwo: string, propSubTwo: string, arg: any): any {
    const resultList: any[] = [];
    // const resultIdList: any[] = [];
    //Parseando el JSON
    arrayFinal.forEach((item:any, index:number) => {
      resultList.push(item[propOne][0]);
      // resultIdList.push(item[propTwo][propSubTwo]);
    })

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

    //Realizando filtrado de las palabras e insertando en el listado final que va a ser mostrado
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
