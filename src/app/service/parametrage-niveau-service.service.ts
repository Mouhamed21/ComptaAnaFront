import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Compte_cp} from "../models/compte_cp";
import {environment} from "../../environments/environment.prod";
import {Parametrage_Niveau} from "../models/parametrage_Niveau";

@Injectable({
  providedIn: 'root'
})
export class ParametrageNiveauServiceService {

  constructor(private http: HttpClient) { }

    getAllParametreNiveau():Observable<Parametrage_Niveau[]>{
        return this.http.get<Parametrage_Niveau[]>(environment.apiUrl1+'/parametrageniveau');
    }

    postParametreNiveau(parametreNiveau:Parametrage_Niveau):Observable<Parametrage_Niveau[]> {
        return this.http.post<Parametrage_Niveau[]>(environment.apiUrl1 + '/parametrageniveau', parametreNiveau)
    }

    updateParametreNiveau(id:number,parametreNiveau:Parametrage_Niveau):Observable<Parametrage_Niveau[]> {
        return this.http.put<Parametrage_Niveau[]>(environment.apiUrl1+ '/parametrageniveau/' + id, parametreNiveau)
    }
}
