import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value:any,propName:string,arg:any):any {
    const resultList = [];
    //Parseando el JSON
    for(let item of value){
      resultList.push(item[propName][0])
    }
    //Eliminando Duplicados
    let result = resultList.reduce((a,e) => {
      if(!a.find((d:any) => d == e)){
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
    for(let itemString of result){
      if(itemString.includes(arg)){
        wordStringList.push(itemString);
      }
    }
    //Removiendo primer elemento del arreglo
    wordStringList.shift()
    return wordStringList;
  }


}
