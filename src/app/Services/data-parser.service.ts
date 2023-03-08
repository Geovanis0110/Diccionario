import {Injectable} from '@angular/core';
import {testWordPlus, xmlObjPlus, xmlObjPlusUltra,} from './transform-data-json.service';
import {
  AnotherForms,
  CrossReference,
  FormField,
  NoteType,
  Reference,
  ReType,
  SenseSrcType,
  StandardReType,
  SuggestType,
  XrFieldType,
} from '../Interfaces/word.interface';
import {FinalFormBuilder} from '../Builders/final-form.builder';
import {FormFieldBuilder} from '../Builders/form-field.builder';

@Injectable({
  providedIn: 'root',
})
export class DataParserService {
  firstForm: FormField = FormFieldBuilder.newInstance().build();
  allFirstsForms: Array<FormField> = [];
  othersForms: Array<AnotherForms> = [];
  wordRefG: string = '';
  rstDef: Array<testWordPlus> = [];
  rstExample: Array<testWordPlus> = [];

  constructor() {}

  /**
   * Determina los nodos hijos de una entrada y los procesa incialmente
   * @param data Vector con la informacion de los nodos hijos de la entrada
   * @param tag Nombre del nodo hijo que va a ser procesado
   * @return Informacion correspondiente a un nodo hijo de la entrada de forma legible
   */
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

  /**
   * Realiza la mismo operacion que la funcion {@link onEntryChildrenSplitter} pero esta vez cuenta con un identifador
   * @param data Misma documentacion que en {@link onEntryChildrenSplitter}
   * @param tag Misma documentacion que en {@link onEntryChildrenSplitter}
   * @param id Identificador del nodo padre
   * @return {@link Misma documentacion que en}
   */
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

  /**
   * Determina todas las definiciones que contiene la palabra correspondiente a la entrada.
   * @param data Vector con la informacion de la definicion de la entrada actual.
   * @param tag Nombre del nodo que contiene la informacion.
   * @return Un Vector con todas las definiciones correspondientes a la entrada actual.
   */
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

  /**
   * Determina todos los grupos gramaticales a los que pertenece la entrada.
   * @param data Vector que contiene la informacion de los grupos gramticales.
   * @param tag Nombre del nodo que se va procesar.
   * @return Vector con todas los grupos gramaticales.
   */
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

  /**
   * Determina las definiciones y las formas ortagraficas de una referencia que se encuentra en una entrada dada.
   * @param data Vector de elementos que contiene informacion de las referencias.
   * @param word Nombre del nodo que se va a procesar.
   * @return Objeto que contine la forma ortografica y las definiciones de una referencia dada en una entrada.
   */
  onEntryReferenceChildrenSplitter(
    data: Array<Reference>,
    word: string
  ): StandardReType {
    this.rstDef = [];
    this.rstExample = [];
    let tempForm: Array<FormField> = [];
    let def: Array<testWordPlus> = [];
    let eg: Array<xmlObjPlus> = [];
    let example: Array<testWordPlus> = [];
    const result: Array<ReType> = [];
    let count: number = 0;
    let initial: number = 1;

    data.forEach((dataItem, index) => {
      const temp: Array<any> = Array.from(dataItem.referencia.children);
      temp.forEach((obj) => {
        if (obj.tagName === 'form') {
          tempForm = this.homogeniesForms(obj);
        } else if (obj.tagName === 'sense') {
          const objItem = this.onEntryChildrenSplitterAlternative(
            temp,
            'sense',
            index + 1
          );
          def = this.onDefSenseChildrenSplitter(objItem, 'def');
          this.rstDef = this.rstDef.concat(def);
          eg = this.onEgSenseChildrenSplitter(objItem, 'eg');
          example = this.onExampleSenseChildrenSplitter(eg, word);
          this.rstExample = this.rstExample.concat(example);
          count++;
          if (initial != dataItem.idReferencia) {
            count = 1;
            initial = dataItem.idReferencia;
          }
          const rareType: ReType = {
            senseNumber: dataItem.idReferencia,
            reNumber: count,
            definition: def,
            examples: example,
          };
          result.push({ ...rareType });
        }
      });
    });
    return { forms: tempForm.slice(1), senses: result };
  }

  /**
   * Determina cuales son los referencias de Antonimo y Sinonimo de la entrada actual.
   * @param data Vector que contiene las referencias a parsear.
   * @param tag Nombre del nodo.
   * @return Vector de todos las referencias cruzadas en formato JSON.
   */
  onCrossReferenceChildrenSplitter(data: Array<CrossReference>, tag: string) {
    let references: Array<SuggestType> = [];
    let count = 0;
    let initial = 1;
    let result: any;
    let results: Array<XrFieldType> = [];
    data.forEach((item) => {
      const tempItem: Array<any> = Array.from(item.crossReference.children);
      count++;
      if (initial != item.crossRefId) {
        count = 1;
        initial = item.crossRefId;
      }
      if (tempItem.length === 2) {
        result = {
          senseFather: item.crossRefId,
          xrNumber: count,
          lbl: tempItem[0].textContent,
          ref: [{
            id: tempItem[1].getAttributeNode('target')?.value,
            word: tempItem[1].textContent,
          }]
        };
      } else {
        references = [];
        for (let i = 1; i < tempItem.length; i++) {
          references.push({
            id: tempItem[i].getAttributeNode('target')?.value,
            word: tempItem[i].textContent,
          });
        }
        result = {
          senseFather: item.crossRefId,
          xrNumber: count,
          lbl: tempItem[0].textContent,
          ref: references,
        };
      }
      results.push({ ...result });
    });
    console.log(results);
    return results;
  }

  /**
   * Determina cuales son las notas correspondientes a la entrada actual.
   * @param data
   * @param tag
   * @return */
  onNotesChildrenSplitter(data: Array<any>, tag: string): NoteType {
    let noteId: number = 0;
    const results: Array<testWordPlus> = [];
    data.forEach((item, index) => {
      if (item.tagName === tag) {
        noteId++;
        Array.from(item.childNodes).forEach((n: any, nIndex) => {
          if (n.tagName === 'w') {
            results.push({
              id: (nIndex).toString(),
              lemmaid: n.getAttributeNode('lemmaidtarget').value,
              textos: n.textContent
            })
          } else if(n.tagName === 'emph'){
            if(n.children.length === 1){
               results.push({
                 id: (nIndex).toString() + " " + n.getAttributeNode('rend').value,
                 lemmaid: n.children[0].getAttributeNode('lemmaidtarget').value,
                 textos: n.children[0].textContent
               })
            }
          } else {
            results.push({
              id: (nIndex).toString(),
              lemmaid: 'no have id',
              textos: n.textContent
            })
          }
        })
      }
    })

    console.log("Notes Test", {noteId, results});
    let note: NoteType = {id: 0, noteDefinition: [], type: " "};
    note.id = noteId;
    note.noteDefinition = results;
    note.type = " ";
    return note;
  }

  /**
   * Determina cuales son los ejemplos de la entrada actual.
   * @param  data Vector de xmlObjPlus.
   * @param  wordRef Referencia a la palabra principal de la entrada.
   * @return Un vector que contiene los ejemplos correspondiente a la entrada.
   */
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
            lemmaid: 'oRef',
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

  /**
   * Encuentra todas los videos, audios e imagenes que contenga la entrada correspondiente.
   * @param data Vector que contiene toda la informacion de la multimedia de la entrada.
   * @param tag Nombre del nodo que contiene informacion en la entrada.
   * @return Un Vector que contiene las direcciones de la multimedia de la entrada.
   */
  onMediaDataSplitter(data: Array<any>, tag: string) {
    const result: Array<SenseSrcType> = [];
    const obj: SenseSrcType = { id: 0, url: '', type: '' };
    data.forEach((item: any) => {
      if (item.tagName === tag) {
        if (item.getAttributeNode('itarget')) {
          obj.id = item.getAttributeNode('n').value;
          obj.type = 'img';
          obj.url =
            '../../../../assets/img/' + item.getAttributeNode('itarget').value;
          result.push({ ...obj });
        } else if (item.getAttributeNode('vtarget')) {
          obj.id = item.getAttributeNode('n')?.value;
          obj.type = 'video';
          obj.url =
            '../../../../assets/videos/' +
            item.getAttributeNode('vtarget').value;
          result.push({ ...obj });
        }
      }
    });
    console.log('Media', result);
    return result;
  }

  /**
   * Determina todas las formas que contiene la entrada especificada.
   * @param data recive el primer elemento de tipo "form" que se encuentra en el documento procesado.
   * @returns un array con todas las formas alternativas de la palabra procesada.
   */
  homogeniesForms(data: any): Array<FormField> {
    if (
      Array.from(data.children).filter((x: any) => x.tagName === 'form')
        .length === 0
    ) {
      this.firstForm = FormFieldBuilder.newInstance().build();
      Array.from(data.children).forEach((obj: any) => {
        switch (obj.tagName) {
          case 'orth':
            this.firstForm.orthography = obj.textContent;
            break;
          case 'syll':
            this.firstForm.syllable = obj.textContent;
            break;
          case 'posErrores':
            this.firstForm.positionError = obj.textContent;
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
      this.allFirstsForms.push({ ...this.firstForm });
      return this.allFirstsForms; // returnando el caso base de la funcion recursiva
    } else {
      Array.from(data.children)
        .filter((x: any) => x.tagName === 'form')
        .forEach((x) => {
          this.allFirstsForms.concat(this.homogeniesForms(x));
        }); // filtra y luego concatena el resultado de los distintos casos base
    }
    return this.allFirstsForms;
  }

  /**
   * Explora todas las formas ortgraficas de la entrada y devuelve un objeto que contiene las mismas.
   * @param data Vector que contiene todas las formas de la entrada.
   * @return un objecto que contiene todas las formas ortograficas de la entrada.
   */
  formConstructor(data: Array<any>) {
    this.allFirstsForms = [];
    this.othersForms = [];
    data.forEach((item: any, i: number) => {
      if (i === 0) {
        Array.from(item.children).forEach((obj: any) => {
          switch (obj.tagName) {
            case 'orth':
              this.firstForm.orthography = obj.textContent;
              break;
            case 'syll':
              this.firstForm.syllable = obj.textContent;
              break;
            case 'posErrores':
              this.firstForm.positionError = obj.textContent;
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
        this.allFirstsForms.push({ ...this.firstForm });
        this.homogeniesForms(item);
      } else {
        Array.from(item.children).forEach((obj: any) => {
          switch (obj.tagName) {
            case 'orth':
              this.firstForm.orthography = obj.textContent;
              break;
            case 'number':
              this.firstForm.number = obj.textContent;
              break;
            case 'gram':
              this.firstForm.gram = obj.textContent;
              break;
            case 'syll':
              this.firstForm.syllable = obj.textContent;
              break;
          }
        });
        this.othersForms.push({ ...this.firstForm });
      }
    });
    console.log('First Form: ', this.firstForm);
    console.log('Others Forms: ', this.othersForms);
    return FinalFormBuilder.newInstance()
      .withForm(this.allFirstsForms[0])
      .withForms(this.allFirstsForms.splice(1))
      .withAnother(this.othersForms)
      .build();
  }
}
