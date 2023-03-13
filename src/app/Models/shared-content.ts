import {FilterAbreviations} from "../Interfaces/filter.interface";

export const catGram: Array<FilterAbreviations> = [
  {
    criteria: 'adjetivo',
    abr: 'adj.|adj. excl.|adj. f.|adj. indef.|adj. indef. pl.|adj. interrog.|adj. invar.|adj. m.|adj. numeral|adj. pl.|adj. poses.|adj. sing.|adj. y pron. numeral invar.|adj. y pron. numeral'
  },
  {
    criteria: 'advervio',
    abr: 'adv.|adv. a.|adv. c.|adv. c. y neg.|adv. de duda|adv. de modo|adv. excl.|adv. interrog.|adv. interrog. y exclamativo|adv. l.|adv. neg.|adv. t.|adv. t. y l.|loc. adv.'
  },
  {
    criteria: 'artículo',
    abr: 'art.|art. f.|art. indef.|art. m.'
  },
  {
    criteria: 'conjunción',
    abr: 'conj.|conj. adversativa.|conj. causal.|conj. concesiva.|conj. consecutiva.|conj. copulativa.|conj. disyuntiva.'
  },
  {
    criteria: 'interjección',
    abr: 'interj.'
  },
  {
    criteria: 'preposición',
    abr: 'loc. prepos.|prep.'
  },
  {
    criteria: 'afijo',
    abr: 'pf.|suf.'
  },
  {
    criteria: 'pronombre',
    abr: 'pron.|pron. demos.|pron. excl.|pron. indef.|pron. indef. pl.|pron. interrog.|pron. numeral|pron. pers.|pron. pers. de tercera persona m., f. sing. y pl.|pron. pers. de tercera persona|pron. relat.'
  },
  {
    criteria: 'sustantivo (s. y s.invar.)',
    abr: 's.|s. invar.'
  },
  {
    criteria: 'sustantivo femenino',
    abr: 'sf.|sf invar.|sf. pl.'
  },
  {
    criteria: 'sustantivo masculino',
    abr: 'sm.|sm. invar.|sm. pl.'
  },
  {
    criteria: 'verbo defectivo',
    abr: 'vdefect.'
  },
  {
    criteria: 'verbo auxiliar',
    abr: 'verbo auxiliar'
  },
  {
    criteria: 'verbo copulativo',
    abr: 'verbo copulativo'
  },
  {
    criteria: 'verbo impersonal',
    abr: 'vimpers.'
  },
  {
    criteria: 'verbo intransitivo',
    abr: 'vintr.'
  },
  {
    criteria: 'verbo pronominal',
    abr: 'vpr.'
  },
  {
    criteria: 'verbo transitivo',
    abr: 'vtr.'
  }
]
export const usgType: Array<FilterAbreviations> = [
  {
    criteria: 'coloquial',
    abr: 'coloq.'
  },
  {
    criteria: 'despectivo',
    abr: 'despect.|en ocasiones despect.'
  },
  {
    criteria: 'familiar',
    abr: 'fam.'
  },
  {
    criteria: 'sentido figurado',
    abr: 'fig.'
  },
  {
    criteria: 'popular',
    abr: 'pop.'
  }
]
export const geoInfo: Array<FilterAbreviations> = [
  {
    criteria: 'americanismo',
    abr: 'amer.'
  },
  {
    criteria: 'anglicismo',
    abr: 'anglic.'
  },
  {
    criteria: 'cubanismo',
    abr: 'cub.'
  },
  {
    criteria: 'galicismo',
    abr: 'galic.'
  }
]
export const afjGram: Array<FilterAbreviations> = [
  {
    criteria: 'con prefijo(s)',
    abr: '(pf.)'
  },
  {
    criteria: 'con sufijo(s)',
    abr: '(suf.)'
  },
  {
    criteria: 'con prefijo(s) o sufijo(s)',
    abr: '(pf.)|(suf.)'
  },
  {
    criteria: 'con prefijo(s) y sufijo(s)',
    abr: '(pf. y suf.)'
  }
]
export const knowledgeArea: Array<FilterAbreviations> = [
  {criteria: "Anatomía", abr: "Anat."},

  {criteria: "Arquitectura", abr: "Arq."},

  {criteria: "Astronomía", abr: "Astron."},

  {criteria: "Biología", abr: "Biol."},

  {criteria: "Botánica", abr: "Bot."},

  {criteria: "Deporte", abr: "Dep."},

  {criteria: "Derecho", abr: "Der."},

  {criteria: "Electricidad", abr: "Electr."},

  {criteria: "Física", abr: "Fís."},

  {criteria: "Fonética", abr: "Fon."},

  {criteria: "Geografía", abr: "Geogr."},

  {criteria: "Geología", abr: "Geol."},

  {criteria: "Geometría", abr: "Geom."},

  {criteria: "Gramática", abr: "Gram."},

  {criteria: "Informática", abr: "Inform."},

  {criteria: "Lingüística", abr: "Ling."},

  {criteria: "Literatura", abr: "Lit."},

  {criteria: "Marina", abr: "Mar."},

  {criteria: "Matemáticas", abr: "Mat."},

  {criteria: "Medicina", abr: "Med."},

  {criteria: "Meteorología", abr: "Meteor."},

  {criteria: "Militar", abr: "Mil."},

  {criteria: "Mitología", abr: "Mit."},

  {criteria: "Música", abr: "Mús."},

  {criteria: "Política", abr: "Pol."},

  {criteria: "Química", abr: "Quím."},

  {criteria: "Religión", abr: "Rel."},

  {criteria: "Zoología", abr: "Zool."}
]
export const abrev_Sin_Ant_Af: Array<FilterAbreviations> = [
  {criteria: "Sinónimo", abr: "Sin."},
  {criteria: "Antónimo", abr: "Ant."},
  {criteria: "Afín", abr: "Af."},
]

export const abbrevationsTooltip: Array<FilterAbreviations> = [
  {abr: "adj.", criteria: "adjetivo."},
  {abr: "adj. indef.", criteria: "adjetivo indefinido."},
  {abr: "adj. indef. pl.", criteria: "adjetivo indefinido plural."},
  {abr: "adj. numeral", criteria: "adjetivo numeral."},
  {abr: "adj. poses.", criteria: "adjetivo posesivo."},
  {abr: "adj. sing.", criteria: "adjetivo singular."},
  {abr: "adv.", criteria: "adverbio."},
  {abr: "adv. a.", criteria: "adverbio de afirmación."},
  {abr: "adv. c.", criteria: "adverbio de cantidad."},
  {abr: "adv. de duda", criteria: "adverbio de duda."},
  {abr: "adv. de modo", criteria: "adverbio de modo."},
  {abr: "adv. interrog.", criteria: "adverbio interrogativo."},
  {abr: "adv. l.", criteria: "adverbio de lugar."},
  {abr: "adv. neg.", criteria: "adverbio de negación."},
  {abr: "adv. t.", criteria: "adverbio de tiempo."},
  {abr: "art. f.", criteria: "artículo femenino."},
  {abr: "art. indef.", criteria: "artículo indefinido."},
  {abr: "art. m.", criteria: "artículo masculino."},
  {abr: "aum.", criteria: "aumentativo."},
  {abr: "dim.", criteria: "diminutivo."},
  {abr: "fig.", criteria: "sentido figurado."},
  {abr: "fras.", criteria: "fraseologismo."},
  {abr: "fras. coloq.", criteria: "fraseologismo coloquial."},
  {abr: "interj.", criteria: "interjección."},
  {abr: "invar.", criteria: "invariable."},
  {abr: "oc. adj.", criteria: "locución adjetiva."},
  {abr: "loc. adv.", criteria: "locución adverbial."},
  {abr: "loc. conj.", criteria: "locución conjuntiva."},
  {abr: "loc. nom.", criteria: "locución nominal."},
  {abr: "loc. prepos.", criteria: "locución preposicional."},
  {abr: "loc. verb.", criteria: "locución verbal."},
  {abr: "p.p.", criteria: "participio pasivo."},
  {abr: "p.p. irreg.", criteria: "participio pasivo irregular."},
  {abr: "pf.", criteria: "prefijo."},
  {abr: "pl.", criteria: "plural."},
  {abr: "pop.", criteria: "popular. "},
  {abr: "prep.", criteria: "preposición."},
  {abr: "pron.", criteria: "pronombre."},
  {abr: "pron. demos.", criteria: "pronombre demostrativo."},
  {abr: "pron. excl.", criteria: "pronombre exclamativo."},
  {abr: "pron. indef.", criteria: "pronombre indefinido."},
  {abr: "pron. interrog.", criteria: "pronombre interrogativo."},
  {abr: "pron. pers.", criteria: "pronombre personal."},
  {abr: "pron. poses.", criteria: "pronombre posesivo."},
  {abr: "pron. relat.", criteria: "pronombre relativo."},
  {abr: "ref.", criteria: "refrán."},
  {abr: "s.", criteria: "sustantivo."},
  {abr: "sf.", criteria: "sustantivo femenino."},
  {abr: "sf. invar.", criteria: "sustantivo femenino invariable."},
  {abr: "sf. pl.", criteria: "sustantivo femenino plural."},
  {abr: "sing.", criteria: "singular."},
  {abr: "sm.", criteria: "sustantivo masculino."},
  {abr: "sm. invar.", criteria: "sustantivo masculino invariable."},
  {abr: "sm. pl.", criteria: "sustantivo masculino plural."},
  {abr: "suf.", criteria: "sufijo."},
  {abr: "vdefect.", criteria: "verbo defectivo."},
  {abr: "vimpers.", criteria: "verbo impersonal."},
  {abr: "vintr.", criteria: "verbo intransitivo."},
  {abr: "vpr.", criteria: "verbo pronominal."},
  {abr: "vtr.", criteria: "verbo transitivo."},
]
