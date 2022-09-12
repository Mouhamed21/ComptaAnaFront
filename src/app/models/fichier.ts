import {Evenement} from "./evenement";
import {Statut} from "./statut";

export class Fichier {


    constructor(
        public id?: number,
        public montantGlobal?: number,
        public nbrLigne?: number,
        public certification?: boolean,
        public dateChargement?: Date,
        public idUserChargement?: number,
        public statut: Statut = new Statut(),
        public evenement: Evenement = new Evenement(),
        public nomFichier?:String
    ) {
    }
}
