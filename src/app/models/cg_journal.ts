import {Compte_cg} from "./compte_cg";

export interface Cg_journal {
    id?: number;
    libelle?: string;
    montant?: number;
    nombre?: number;
    date?: Date;
    numcompte?: string;
    user_id?: number;
    caisse_id?: number;
    centreCout?: number;
    compte?: Compte_cg;
}
