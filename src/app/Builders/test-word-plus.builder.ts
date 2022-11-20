import {testWordPlus} from "../Services/transform-data-json.service";

export class TestWordPlusBuilder{
  private readonly _testWord: testWordPlus = {
    id: '0',
    textos: '',
    lemmaid: ''
  }

  static newInstance(): TestWordPlusBuilder{
    return new TestWordPlusBuilder();
  }

  withId(id: string): TestWordPlusBuilder{
    this._testWord.id = id;
    return this;
  }

  withTextos(textos: string): TestWordPlusBuilder{
    this._testWord.textos = textos;
    return this;
  }

  withLemmaId(lemmaid: string): TestWordPlusBuilder{
    this._testWord.lemmaid = lemmaid;
    return this;
  }

  build(): testWordPlus{
    return this._testWord;
  }
}
