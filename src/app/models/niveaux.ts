import {Parametrage_Niveau} from "./parametrage_Niveau";
import {Compte_cg} from "./compte_cg";

export class Niveaux {
    constructor(
        centreCoutDestinataire?:number,
        centreCoutOrigine?:number,
        compte?:Compte_cg,
        id?:number,
        libelleCCDestinataire?:string,
        libelleCCOrigine?:string,
        libelleObjetDu?:string,
        libelleObjetFin?:string,
        objetAu?:string,
        objetDu?:string,
        objetFin?:string,
        parametrageNiveau?:Parametrage_Niveau
    ) { }
}
