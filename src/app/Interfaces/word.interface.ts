export interface Word{
    id: string,
    word: string,
    afjGram: string,
    pos: Array<string>,
    usg: Array<string>
}

export interface WordData{
    wordOrth: string,
    contarget: string
}

export interface AllWord{
    id: string,
    word: string,
    reverseWord: string,
    afjGram: string,
    pos: Array<string>,
    usg: Array<string>
}
