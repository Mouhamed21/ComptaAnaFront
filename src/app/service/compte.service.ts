import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.prod";
import {Compte_cp} from "../models/compte_cp";
import {Compte_cg} from "../models/compte_cg";
import {Cg_journal} from "../models/cg_journal";
import {CgCompteChapeau} from "../models/CgCompteChapeau";
import {Action_cp} from "../models/action_cp";
import {Modepaiement_cp} from "../models/modepaiement_cp";
import {TypeCompte_cp} from "../models/typeCompte_cp";
@Injectable({
    providedIn:'root'
})

export class CompteService{
    constructor(private http: HttpClient) {
    }
    getAllComptes_cp(): Observable<Compte_cp[]>{
        return this.http.get<Compte_cp[]>(environment.apiUrl+'/compte');
    }
    getAllModepaiement(): Observable<Modepaiement_cp[]>{
        return this.http.get<Modepaiement_cp[]>(environment.apiUrl+'/modepaiement');
    }
    getAllAction(): Observable<Action_cp[]>{
        return this.http.get<Action_cp[]>(environment.apiUrl+'/action');
    }
    getAllTypeCompte(): Observable<TypeCompte_cp[]>{
        return this.http.get<TypeCompte_cp[]>(environment.apiUrl+'/typecompte');
    }
    getAllChapeau(): Observable<CgCompteChapeau[]>{
        return this.http.get<CgCompteChapeau[]>(environment.apiUrl+'/cgcomptechapeau');
    }
    getAllComptes_cg(): Observable<Compte_cg[]>{
        return this.http.get<Compte_cg[]>(environment.apiUrl+'/cgcompte');
    }
    getAllCompteChapeau(): Observable<CgCompteChapeau[]>{
        return this.http.get<CgCompteChapeau[]>(environment.apiUrl+'/cgcomptechapeau');
    }
    getAllJournal_CGbydate(mois:string, annee:string): Observable<Cg_journal[]>{
        return this.http.get<Cg_journal[]>(environment.apiUrl+'/journal/mois/'+mois+'/'+annee);
    }
}
