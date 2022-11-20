import {Injectable} from "@angular/core";
import {testWordPlus, xmlObjPlus} from "./transform-data-json.service";

@Injectable({
  providedIn: 'root',
})
export class DataParserService{
  constructor(){}


  onEntryChildrenSplitter(
    data: Array<any>,
    tag: string
  ): Array<xmlObjPlus>{
    const results: Array<xmlObjPlus> = [];
    if(tag === 'sense'){
      data.forEach((item, index) => {
        if(item.tagName === tag){
          Array.from(item.children).forEach((obj: any) => {
            results.push({
              id: item.attributes['n']?.value,
              name: obj.tagName,
              content: obj.childNodes
            })
          })
        }
      })
    }else {
      data.forEach((item, index) => {
        if(item.tagName === tag){
          Array.from(item.children).forEach((obj: any) => {
            results.push({
              id: index.toString(),
              name: obj.tagName,
              content: obj.textContent
            })
          })
        }
      })
    }
    return results;
  }
  onDefSenseChildrenSplitter(
    data: Array<xmlObjPlus>,
    tag: string
  ): Array<testWordPlus>{
    const results: Array<testWordPlus> =[];
    data.forEach((item, index) => {
      item.content.forEach((obj: any) => {
        if(item.name === tag){
          if(obj.attributes !== undefined){
            results.push({
              id: item.id,
              textos: obj.textContent,
              lemmaid: obj.attributes['lemmaidtarget']?.value
            })
          }else {
            results.push({
              id: item.id,
              textos: obj.textContent,
              lemmaid: 'no have id'
            })
          }
        }
      })
    })
    return results;
  }
  onGramGrpSenseChildrenSplitter(
    data: Array<xmlObjPlus>,
    tag: string): Array<xmlObjPlus> {
    const results: Array<xmlObjPlus> =[];
    data.forEach((item) => {
      item.content.forEach((obj: any) => {
        if(item.name === tag){
          if(obj.tagName !== undefined){
            results.push({
              id: item.id,
              name: obj.tagName,
              content: obj.textContent
            })
          }
        }
      })
    })
    return results;
  }

  onEgSenseChildrenSplitter(
    data: Array<xmlObjPlus>,
    tag: string
  ): Array<xmlObjPlus>{
    const results: Array<xmlObjPlus> = [];
    data.forEach((item) => {
      item.content.forEach((obj: any) => {
        if(item.name === tag){
          if(obj.tagName !== undefined && obj.hasChildNodes()){
            results.push({
              id: item.id,
              name: obj.tagName,
              content: obj.childNodes
            })
          }
        }
      })
    })
    return results;
  }


  onExampleSenseChildrenSplitter(
    data: Array<xmlObjPlus>,
    wordRef: string
  ): Array<testWordPlus>{
    const results: Array<testWordPlus> = [];
    data.forEach((item)=> {
        item.content.forEach((item1: any) => {
          if (item1.tagName === 'w') {
            results.push({
              id: item.id,
              lemmaid: item1?.attributes['lemmaidtarget'].value,
              textos: item1.textContent
            })
          } else if (item1.tagName === 'oRef') {
            results.push({
              id: item.id,
              lemmaid: 'no have id',
              textos: wordRef
            })
          } else if (item1.tagName === 'oVar') {
            results.push({
              id: item.id,
              lemmaid: 'orthVariant',
              textos: item1.textContent
            })
          }
          else {
            results.push({
              id: item.id,
              lemmaid: 'no have id',
              textos: item1.textContent
            })
          }
        })
      })
    return results;
  }

  onAllDataSplitter(){};
}
