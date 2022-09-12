import { Component, OnInit } from '@angular/core';
import {Compte_cg} from "../../models/compte_cg";
import {CgCompteChapeau} from "../../models/CgCompteChapeau";
import {Compte_cp} from "../../models/compte_cp";
import {Subject} from "rxjs";
import {Product} from "../../api/product";
import {CompteService} from "../../service/compte.service";
import {HttpClient} from "@angular/common/http";
import {ProductService2} from "../../service/productservice2";
import {ConfirmationService, MessageService} from "primeng/api";
import {ParametrageNiveauServiceService} from "../../service/parametrage-niveau-service.service";
import {Parametrage_Niveau} from "../../models/parametrage_Niveau";

@Component({
  selector: 'app-parametrage-niveau',
  templateUrl: './parametrage-niveau.component.html',
  styleUrls: ['./parametrage-niveau.component.scss']
})
export class ParametrageNiveauComponent implements OnInit {
    Comptes_cg: Compte_cg[];

    compte_cg: Compte_cg;

    chapeaux: CgCompteChapeau[];

    chapeau: CgCompteChapeau;

    Comptes_cp: Compte_cp[];
    parametreNiveaux: Parametrage_Niveau[];

    compte_cp: Compte_cp;

    CompteDialog: boolean;

    editParametreNiveauDialog:boolean;

    parametreNiveau:Parametrage_Niveau;

    parametreNiveauDialog:boolean;

    CompteSubject = new Subject<void>();

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[];

    product: Product;

    selectedProducts: Product[];

    submitted: boolean;

    cols: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];

    selectedItem: any;

    filteredChapeau: any[];

    filteredCompteCP: any[];

    items: any[];

    constructor(private compte_Service: CompteService, private http: HttpClient, private productService: ProductService2, private messageService: MessageService,
                private confirmationService: ConfirmationService, private parametreNiveauService: ParametrageNiveauServiceService) {}

  ngOnInit(): void {
        this.getAllParametreNiveau();
  }
    getAllParametreNiveau() {
        this.parametreNiveauService.getAllParametreNiveau().subscribe(

            (data)=>
            {
                this.parametreNiveaux=data
            }
        )
    }
    public postParametreNiveau() {
        this.submitted = true;

        if (this.parametreNiveau.libelle.trim()) {
            if (this.parametreNiveau.id) {
                this.parametreNiveauService.updateParametreNiveau(this.parametreNiveau.id,this.parametreNiveau).subscribe(
                    data => {
                        console.log(data);
                        this.editParametreNiveauDialog = false;
                        this.parametreNiveau = {};
                        this.getAllParametreNiveau();
                    },
                    error => {
                        console.log(error);
                    }
                );
                this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Mis à jour Parametrage Niveau', life: 3000});
            }
            else {
                //debugger
                this.parametreNiveauService.postParametreNiveau(this.parametreNiveau).subscribe( data =>
                    {
                        console.log(this.parametreNiveau);
                        this.parametreNiveauDialog = false;
                        this.getAllParametreNiveau();
                    },
                    error => {
                        console.log(error);
                    }
                ),
                    this.messageService.add({severity:'success', summary: 'Réussi', detail: 'Ajout Niveau', life: 3000});
            }
            this.parametreNiveaux = [...this.parametreNiveaux];
            this.parametreNiveauDialog = false;
            this.editParametreNiveauDialog = false;
            this.parametreNiveau = {};
        }
    }
    editParametreNiveau(parametreNiveau: Parametrage_Niveau) {
        this.parametreNiveau = {...parametreNiveau};
        this.parametreNiveauDialog = true;
    }
    openNew() {
        this.parametreNiveau = {};
        this.submitted = false;
        this.parametreNiveauDialog = true;
    }
    hideDialog() {
        this.parametreNiveauDialog = false;
        this.submitted = false;
        this.editParametreNiveauDialog = false;
        //this.editClasseDialog = false;
    }

}
