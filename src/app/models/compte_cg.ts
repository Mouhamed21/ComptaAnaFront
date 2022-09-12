import {Compte_cp} from "./compte_cp";
import {CgCompteChapeau} from "./CgCompteChapeau";

export interface Compte_cg {
    id?: number;
    libelle?: string;
    description?: string;
    objet?: string;
    chapeau?: boolean;
    code?: number;
    codesalaire?: number;
    cpCompte?: Compte_cp;
    cgCompteChapeau?: CgCompteChapeau;
}
