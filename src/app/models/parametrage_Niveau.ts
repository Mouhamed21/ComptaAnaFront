import {Niveaux} from "./niveaux";

export class Parametrage_Niveau {
    constructor(
        public id?: number,
        public libelle?: string,
        public niveaux?:Niveaux,
        public repartitions?:string
    ) { }
}
