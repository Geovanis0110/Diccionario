import {Injectable} from '@angular/core';
import {
  testWordPlus,
  xmlObjPlus,
  xmlObjPlusUltra,
} from './transform-data-json.service';
import {AnotherForms, FormField, Reference, reForm, SenseSrcType, SrcType} from '../Interfaces/word.interface';
import {FinalFormBuilder} from '../Builders/final-form.builder';
import {FormFieldBuilder} from "../Builders/form-field.builder";
import {SenseFieldBuilder} from "../Builders/sense-field.builder";


@Injectable({
  providedIn: 'root',
})
export class DataParserService {
  firstForm: FormField = FormFieldBuilder.newInstance().build();
  allfirstsForms: Array<FormField> = [];
  othersForms: Array<AnotherForms> = [];
  resultObj: reForm = { id: 0,form: FinalFormBuilder.newInstance().build(), sense: [] } ;
  wordRefG: string = '';

  constructor() {}

  onEntryChildrenSplitter(
    data: Array<any>,
    tag: string
  ): Array<xmlObjPlusUltra> {
    const results: Array<xmlObjPlusUltra> = [];
    if (tag === 'sense') {
      data.forEach((item) => {
        if (item.tagName === tag) {
          Array.from(item.children).forEach((obj: any) => {
            results.push({
              id: item.attributes['n']?.value,
              itarget: item.attributes['itarget']?.value,
              vtarget: item.attributes['vtarget']?.value,
              atarget: item.attributes['atarget']?.value,
              name: obj.tagName,
              content: obj.childNodes,
            });
          });
        }
      });
    } else {
      data.forEach((item, index) => {
        if (item.tagName === tag) {
          Array.from(item.children).forEach((obj: any) => {
            results.push({
              id: index.toString(),
              itarget: 'no have',
              vtarget: 'no have',
              atarget: 'no have',
              name: obj.tagName,
              content: obj.textContent,
            });
          });
        }
      });
    }
    return results;
  }

  onEntryChildrenSplitterAlternative(
    data: Array<any>,
    tag: string,
    id: number
  ): Array<xmlObjPlus> {
    const results: Array<xmlObjPlus> = [];
    if (tag === 'sense') {
      data.forEach((item) => {
        if (item.tagName === tag) {
          Array.from(item.children).forEach((obj: any) => {
            results.push({
              id: id.toString(),
              name: obj.tagName,
              content: obj.childNodes,
            });
          });
        }
      });
    }
    return results;
  }

  onDefSenseChildrenSplitter(
    data: Array<xmlObjPlus>,
    tag: string
  ): Array<testWordPlus> {
    const results: Array<testWordPlus> = [];
    data.forEach((item) => {
      item.content.forEach((obj: any) => {
        if (item.name === tag) {
          if (obj.attributes !== undefined) {
            results.push({
              id: item.id,
              textos: obj.textContent,
              lemmaid: obj.attributes['lemmaidtarget']?.value,
            });
          } else {
            results.push({
              id: item.id,
              textos: obj.textContent,
              lemmaid: 'no have id',
            });
          }
        }
      });
    });
    return results;
  }

  onGramGrpSenseChildrenSplitter(
    data: Array<xmlObjPlus>,
    tag: string
  ): Array<xmlObjPlus> {
    const results: Array<xmlObjPlus> = [];
    data.forEach((item) => {
      item.content.forEach((obj: any) => {
        if (item.name === tag) {
          if (obj.tagName !== undefined) {
            results.push({
              id: item.id,
              name: obj.tagName,
              content: obj.textContent,
            });
          }
        }
      });
    });
    return results;
  }

  onEgSenseChildrenSplitter(
    data: Array<xmlObjPlus>,
    tag: string
  ): Array<xmlObjPlus> {
    const results: Array<xmlObjPlus> = [];
    data.forEach((item) => {
      item.content.forEach((obj: any) => {
        if (item.name === tag) {
          if (obj.tagName !== undefined && obj.hasChildNodes()) {
            results.push({
              id: item.id,
              name: obj.tagName,
              content: obj.childNodes,
            });
          }
        }
      });
    });
    return results;
  }

  onEntryReferenceChildrenSplitter(data: Array<Reference>) {
    data.forEach((dataItem) => {
      const temp: Array<any> = Array.from(dataItem.referencia.children);
      const tempForm: FormField = FormFieldBuilder.newInstance().build();
      temp.forEach((obj) => {
        if(obj.tagName === 'form'){

        } else if(obj.tagName === 'sense'){

        }
      })
      console.log(tempForm);
    })
  }

  onCrossReferenceChildrenSplitter(data: any, tag: string) {
  }

  onNotesChildrenSplitter(data: any, tag: string) {
  }

  onExampleSenseChildrenSplitter(
    data: Array<xmlObjPlus>,
    wordRef: string
  ): Array<testWordPlus> {
    this.wordRefG = wordRef;
    const results: Array<testWordPlus> = [];
    data.forEach((item) => {
      item.content.forEach((item1: any) => {
        if (item1.tagName === 'w') {
          results.push({
            id: item.id,
            lemmaid: item1?.attributes['lemmaidtarget'].value,
            textos: item1.textContent,
          });
        } else if (item1.tagName === 'oRef') {
          results.push({
            id: item.id,
            lemmaid: 'no have id',
            textos: wordRef,
          });
        } else if (item1.tagName === 'oVar') {
          results.push({
            id: item.id,
            lemmaid: 'orthVariant',
            textos: item1.textContent,
          });
        } else {
          results.push({
            id: item.id,
            lemmaid: 'no have id',
            textos: item1.textContent,
          });
        }
      });
    });
    return results;
  }

  onMediaDataSplitter(data: Array<any>, tag: string) {
    const result: Array<SenseSrcType> = [];
    const obj: SenseSrcType = {id: 0, url: '', type: ''};
    data.forEach((item: any) => {
      if (item.tagName === tag) {
        if (item.getAttributeNode('itarget')) {
          obj.id = item.getAttributeNode('n').value;
          obj.type = 'img';
          obj.url = '../../../../assets/img/' + item.getAttributeNode('itarget').value;
          result.push({...obj});
        } else if (item.getAttributeNode('vtarget')) {
          obj.id = item.getAttributeNode('n').value;
          obj.type = 'video';
          obj.url = '../../../../assets/videos/' + item.getAttributeNode('vtarget').value;
          result.push({...obj});
        }
      }
    })
    console.log("Media", result);
    return result;
  }

  /**
   *
   * @param data recive el primer elemento de tipo "form" que se encuentra en el documento procesado
   * @returns un array con todas las formas alternativas de la palabra procesada
   */
  homogeniesForms(data: any): Array<FormField> {
    if (
      Array.from(data.children).filter((x: any) => x.tagName === 'form')
        .length === 0
    ) {
      Array.from(data.children).forEach((obj: any) => {
        switch (obj.tagName) {
          case 'orth':
            this.firstForm.orth = obj.textContent;
            break;
          case 'syll':
            this.firstForm.syll = obj.textContent;
            break;
          case 'posErrores':
            this.firstForm.posErrores = obj.textContent;
            break;
          case 'gen':
            this.firstForm.gen = obj.textContent;
            break;
          case 'number':
            this.firstForm.number = obj.textContent;
            break;
          case 'gram':
            this.firstForm.gram = obj.textContent;
            break;
          case 'lbl':
            this.firstForm.lbl = obj.textContent;
            break;
          default:
            break;
        }
      });
      this.allfirstsForms.push({...this.firstForm});
      return this.allfirstsForms; // returnando el caso base de la funcion recursiva
    } else {
      Array.from(data.children)
        .filter((x: any) => x.tagName === 'form')
        .forEach((x) => {
          this.allfirstsForms.concat(this.homogeniesForms(x));
        }); // filtra y luego concatena el resultado de los distintos casos base
    }
    return this.allfirstsForms;
  }

  /**
   *
   * @param data
   */
  formConstructor(data: Array<any>) {
    this.allfirstsForms = [];
    this.othersForms = [];
    data.forEach((item: any, i: number) => {
      if (i === 0) {
        Array.from(item.children).forEach((obj: any) => {
          switch (obj.tagName) {
            case 'orth':
              this.firstForm.orth = obj.textContent;
              break;
            case 'syll':
              this.firstForm.syll = obj.textContent;
              break;
            case 'posErrores':
              this.firstForm.posErrores = obj.textContent;
              break;
            case 'gen':
              this.firstForm.gen = obj.textContent;
              break;
            case 'number':
              this.firstForm.number = obj.textContent;
              break;
            case 'gram':
              this.firstForm.gram = obj.textContent;
              break;
            case 'lbl':
              this.firstForm.lbl = obj.textContent;
              break;
            default:
              break;
          }
        });
        this.allfirstsForms.push({...this.firstForm});
        this.homogeniesForms(item);
      } else {
        Array.from(item.children).forEach((obj: any) => {
          switch (obj.tagName) {
            case 'orth':
              this.firstForm.orth = obj.textContent;
              break;
            case 'number':
              this.firstForm.number = obj.textContent;
              break;
            case 'gram':
              this.firstForm.gen = obj.textContent;
              break;
            case 'syll':
              this.firstForm.gen = obj.textContent;
              break;
          }
        });
        this.othersForms.push({...this.firstForm});
      }
    });
    console.log('First Form: ', this.firstForm);
    console.log('Others Forms: ', this.othersForms);
    return FinalFormBuilder.newInstance()
      .withForm(this.allfirstsForms[0])
      .withForms(this.allfirstsForms.splice(1))
      .withAnothers(this.othersForms)
      .build();
  }

  vectorTransform(
    myVector: Array<testWordPlus>,
    senseCount: number
  ): Array<Array<testWordPlus>> {
    let count: number = 0;
    const finalsResults: Array<Array<testWordPlus>> = [];
    while (count != senseCount) {
      const results: Array<testWordPlus> = myVector.filter(
        (x) => x.id == (count + 1).toString()
      );
      count++;
      finalsResults.push(results);
    }
    return finalsResults;
  }
}

