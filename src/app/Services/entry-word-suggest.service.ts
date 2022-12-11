import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EntryWordSuggestService {
  urlBase: string = 'http://localhost:2021/';
  findSuggest: string = 'obtenerSugerencias.cgi?';
  regExp: string = 'regExp=';
  indexLetters: string = '&indexLetters=';
  posSelection: string = '&posSelection=';
  pos: string = '';

  strLen: number = 0;
  regExpString: string = '';
  prevGQ: boolean = false;
  letter: string = '';
  nextLetter: string = '';
  prevLetter: string = '';
  bfrPrevLetter: string = '';
  requestLetter: string = '';

  constructor(private _http: HttpClient) {
  }

  getSuggestionsFromServer() {
    return this._http.get(
      this.urlBase +
      this.findSuggest +
      this.regExp +
      this.regExpString +
      this.indexLetters +
      this.requestLetter +
      this.posSelection +
      this.pos,
      {responseType: 'text'}
    );
  }

  onSupplySuggestions(searchStr: string) {
    let letterSplit: Array<string> = [];
    searchStr = searchStr.toLowerCase();
    letterSplit = searchStr.split('');
    this.regExpString = '';
    for (let i = 0; i < letterSplit.length; ++i) {
      this.letter = letterSplit[i];
      this.nextLetter = letterSplit[i + 1];
      i - 1 >= 0 ? this.prevLetter = letterSplit[i - 1] : this.prevLetter = '';
      i - 2 > 0 ? this.bfrPrevLetter = letterSplit[i - 2] : this.bfrPrevLetter = '';

      switch (this.letter) {
        case 'h':
          this.concatRegExp('');
          break;
        case 'l':
          this.handleL();
          break;
        case 'y':
          this.concatRegExp('(y|ll|i)');
          break;
        case 'r':
          this.handleR();
          break;
        case 'm':
          this.handleMN();
          break;
        case 'n':
          this.handleMN();
          break;
        case 'g':
          this.handleGJ(i);
          break;
        case 'j':
          this.handleGJ(i);
          break;
        case 'k':
          this.handleKCQ();
          break;
        case 'c':
          this.handleKCQ();
          break;
        case 'q':
          this.handleKCQ();
          break;
        case 's':
          this.handleSCZX(i);
          break;
        case 'z':
          this.handleSCZX(i);
          break;
        case 'x':
          this.handleSCZX(i);
          break;
        case 'b':
          this.concatRegExp('[bv]');
          break;
        case 'v':
          this.concatRegExp('[bv]');
          break;
        case 'u':
          this.handleU(i);
          break;
        case 'ú':
          this.handleU(i);
          break;
        case 'ü':
          this.handleU(i);
          break;
        case 'w':
          this.handleW(i);
          break;
        case 'a':
          this.handleA(i);
          break;
        case 'á':
          this.handleA(i);
          break;
        case 'o':
          this.handleO(i);
          break;
        case 'ó':
          this.handleO(i);
          break;
        case 'e':
          this.handleE(i);
          break;
        case 'é':
          this.handleE(i);
          break;
        case 'i':
          this.handleI(i);
          break;
        case 'í':
          this.handleI(i);
          break;
        default:
          this.concatRegExp(this.letter);
          break;
      }
    }
    let firstLetterSug: string = '';
    let ind: number = 0;
    firstLetterSug = this.obtainFirstLetters(
      this.regExpString,
      ind,
      firstLetterSug
    );
    firstLetterSug = this.sortFirstLetterSug(firstLetterSug);
    this.requestLetter = firstLetterSug;
    console.log("Expresion Regular", this.regExpString);
    console.log("Letter", this.letter);
    console.log("First Letter", firstLetterSug);
  }

  sortFirstLetterSug(fLetSug: string): string {
    let fLetSugAux: string = fLetSug;
    if (fLetSug.length > 1) {
      fLetSugAux = this.sortFirstLetterSug(
        fLetSug.substring(1, fLetSug.length)
      );
      fLetSugAux = this.insertOrdered(fLetSug.charAt(0), fLetSugAux);
    }
    return fLetSugAux;
  }

  insertOrdered(c: string, str: string) {
    let i = 0;
    while (c > str.charAt(i) && i < str.length) {
      i++;
    }
    return str.substring(0, i) + c + str.substring(i, str.length);
  }

  obtainFirstLetters(
    regExpString: string,
    ind: number,
    firstLettersSug: string
  ): string {
    if (regExpString.charAt(ind) == '[') {
      ind++;
      while (regExpString.charAt(ind) != ']') {
        if (
          regExpString.charAt(ind) >= 'a' &&
          regExpString.charAt(ind) <= 'z' &&
          firstLettersSug.indexOf(regExpString.charAt(ind)) == -1
        )
          firstLettersSug += regExpString.charAt(ind);
        if (
          regExpString.charAt(ind) == 'ñ' &&
          firstLettersSug.indexOf(regExpString.charAt(ind)) == -1
        )
          firstLettersSug += 'ñ';
        if (
          regExpString.charAt(ind) == '-' &&
          firstLettersSug.indexOf(regExpString.charAt(ind)) == -1
        )
          //12:41 2021-11-09: tratamiento de guión inicial
          firstLettersSug = this.obtainFirstLetters(
            regExpString.substring(1, regExpString.length),
            ind,
            firstLettersSug
          );
        ind++;
      }
    } else {
      if (regExpString.charAt(ind) == '(') {
        ind++;
        while (regExpString.charAt(ind) != ')') {
          if (
            regExpString.charAt(ind) >= 'a' &&
            regExpString.charAt(ind) <= 'z' &&
            firstLettersSug.indexOf(regExpString.charAt(ind)) == -1
          )
            firstLettersSug += regExpString.charAt(ind);
          if (
            regExpString.charAt(ind) == 'ñ' &&
            firstLettersSug.indexOf(regExpString.charAt(ind)) == -1
          )
            firstLettersSug += 'ñ';
          if (
            regExpString.charAt(ind) == '-' &&
            firstLettersSug.indexOf(regExpString.charAt(ind)) == -1
          )
            //12:41 2021-11-09: tratamiento de guión inicial
            firstLettersSug = this.obtainFirstLetters(
              regExpString.substring(1, regExpString.length),
              ind,
              firstLettersSug
            );
          ind++;
          while (
            regExpString.charAt(ind) != '|' &&
            regExpString.charAt(ind) != ')'
            ) {
            ind++;
          }
          if (regExpString.charAt(ind) == '|') ind++;
        }
      } else {
        // la expresión regular empieza con un carácter alfabético o guión
        if (
          regExpString.charAt(ind) >= 'a' &&
          regExpString.charAt(ind) <= 'z' &&
          firstLettersSug.indexOf(regExpString.charAt(ind)) == -1
        )
          firstLettersSug += regExpString.charAt(ind);
        if (
          regExpString.charAt(ind) == 'ñ' &&
          firstLettersSug.indexOf(regExpString.charAt(ind)) == -1
        )
          firstLettersSug += 'ñ';
        if (
          regExpString.charAt(ind) == '-' &&
          firstLettersSug.indexOf(regExpString.charAt(ind)) == -1
        )
          //12:41 2021-11-09: tratamiento de guión inicial
          firstLettersSug = this.obtainFirstLetters(
            regExpString.substring(1, regExpString.length),
            ind,
            firstLettersSug
          );
        ind++;
        if (regExpString.charAt(ind) == '?') {
          ind++;
          firstLettersSug = this.obtainFirstLetters(
            regExpString,
            ind,
            firstLettersSug
          );
        }
      }
    }
    return firstLettersSug;
  }

  concatRegExp(addString: string) {
    this.regExpString = this.regExpString + addString;
  }

  concatRegExpVowel(addString: string) {
    this.regExpString = this.regExpString + 'h?' + addString;
    console.log(this.nextLetter)
    if ('aáeéiíoóuú'.indexOf(this.nextLetter) === -1) {
      this.concatRegExp('s?');
    }
  }

  handleA(i: number) {
    this.concatRegExpVowel('[aá]');
    if (i == this.strLen - 1) this.regExpString = this.regExpString + 'd?';
  }

  handleE(i: number) {
    this.concatRegExpVowel('[eé]');
    if (i == this.strLen - 1) this.regExpString = this.regExpString + 'd?';
  }

  handleI(i: number) {
    this.concatRegExpVowel('[iíy]');
    if (i == this.strLen - 1) this.regExpString = this.regExpString + 'd?';
  }

  handleO(i: number) {
    this.concatRegExpVowel('[oó]');
    if (i == this.strLen - 1) this.regExpString = this.regExpString + 'd?';
  }

  handleU(i: number) {
    if (!this.prevGQ) {
      this.concatRegExpVowel('[uúüw]');
    } else this.prevGQ = false;
    if (i == this.strLen - 1) this.regExpString = this.regExpString + 'd?';
  }

  handleW(i: number) {
    this.concatRegExpVowel('[uüw]');
    if (i == this.strLen - 1) this.regExpString = this.regExpString + 'd?';
  }

  handleL() {
    // special case (ll, y)
    // first appearance of double l after another character, put (ll | y)
    if (this.nextLetter != 'l' && this.prevLetter != 'l')
      this.concatRegExp('[lr]');
    else if (this.nextLetter == 'l' && this.prevLetter != 'l')
      this.concatRegExp('(ll|y)');
  }

  handleR() {
    // special case (rr, r)
    // put (rr | r) if current r is the first r after another character
    // or put (rr | r) if the current r follows after two other r's
    // so do nothing if the current r comes after another r which is the first r in a sequence (...arra...)

    if (
      this.prevLetter != 'r' ||
      (this.prevLetter == 'r' && this.bfrPrevLetter == 'r')
    ) {
      if ('aáeéiíoóuú'.indexOf(this.prevLetter) != -1)
        // r->l
        this.concatRegExp('(l|r|rr)');
      else this.concatRegExp('(r|rr)');
    }
  }

  handleMN() {
    // special case (m, n), substitute [mn] if they appear before p or b (or v: anvidiestro)
    if (
      this.nextLetter == 'p' ||
      this.nextLetter == 'b' ||
      this.nextLetter == 'v'
    ) {
      this.concatRegExp('[mn]');
    } else if (this.nextLetter == 'm' || this.nextLetter == 'n') {
      // (2019) n+n or n+m or m+n or m+m (changing the first this.letter)
      this.concatRegExp('[mn]');
    } else if (this.prevLetter == 'm' || this.prevLetter == 'n') {
      // (2019) n+n or n+m or m+n or m+m (changing the second this.letter)
      this.concatRegExp('[mn]');
    } else if ('aáeéiíoóuú'.indexOf(this.nextLetter) === -1) {
      // (2019) n+vowel or m+vowel: add m or n before or after this.letter
      this.concatRegExp(
        '(' +
        this.letter +
        '|m' +
        this.letter +
        '|n' +
        this.letter +
        '|' +
        this.letter +
        'm|' +
        this.letter +
        'n)'
      );
    } else {
      this.concatRegExp(this.letter);
    }
  }

  handleGJ(i: number) {
    // special case (gu, g) and (j,ge,gi)
    if (this.letter == 'g') {
      if ('aáeéiíoó'.indexOf(this.nextLetter) != -1)
        this.concatRegExp('(g|gu|gü|j)');
      else if (
        this.nextLetter == 'u' ||
        this.nextLetter == 'ü' ||
        this.nextLetter == 'ú'
      ) {
        // process this.letter u issues, and remember for later
        this.prevGQ = true;
        this.concatRegExp('(g|gu|gú|gü)');
      } else this.concatRegExp(this.letter);
    }

    if (this.letter == 'j') {
      if ('eéií'.indexOf(this.nextLetter) != -1) this.concatRegExp('(g|j)');
      // else normal j
      else this.concatRegExp(this.letter);
    }
  }

  handleKCQ() {
    if (this.letter == 'q') {
      if (this.nextLetter == 'u') {
        this.concatRegExp('(c|k|qu)');
        this.prevGQ = true;
      } else {
        // else normal q
        this.concatRegExp('(q|qu)');
      }
    }
    if (this.letter == 'k') {
      this.concatRegExp('(c|k|qu)');
    }
    if (this.letter == 'c') {
      if ('eéií'.indexOf(this.nextLetter) != -1) {
        this.concatRegExp('[csxz]');
      } else {
        this.concatRegExp('(c|k|qu)');
      }
    }
  }

  handleSCZX(i: number) {
    if (this.letter == 'z' && i == this.strLen - 1) this.concatRegExp('[dsxz]');
    else if ('eéií'.indexOf(this.nextLetter) != -1) this.concatRegExp('[csxz]');
    else this.concatRegExp('[sxz]');
  }
}
