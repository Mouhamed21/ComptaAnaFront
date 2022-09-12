import { Component, OnInit } from '@angular/core';
import {Product} from "../../../../api/product";
import {ProductService2} from "../../../../service/productservice2";
import {ConfirmationService, MessageService} from "primeng/api";
import {CompteService} from "../../../../service/compte.service";
import {Compte_cp} from "../../../../models/compte_cp";
import {Compte_cg} from "../../../../models/compte_cg";
import {environment} from "../../../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {CgCompteChapeau} from "../../../../models/CgCompteChapeau";

@Component({
  selector: 'app-cg-compte',
  templateUrl: './cg-compte.component.html',
  styleUrls: ['./cg-compte.component.scss']
})
export class CgCompteComponent implements OnInit {

    Comptes_cg: Compte_cg[];

    compte_cg: Compte_cg;

    chapeaux: CgCompteChapeau[];

    chapeau: CgCompteChapeau;

    Comptes_cp: Compte_cp[];

    compte_cp: Compte_cp;

    CompteDialog: boolean;

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
                private confirmationService: ConfirmationService) {}

    ngOnInit() {

        this.compte_Service.getAllComptes_cg().subscribe(
            (data)=>{
                this.Comptes_cg=data;
            }
        );
        this.compte_Service.getAllCompteChapeau().subscribe(
            (data)=>{
                this.chapeaux=data;
            }
        );
        this.compte_Service.getAllComptes_cp().subscribe(
            (data)=>{
                this.Comptes_cp=data;
            }
        );
        this.productService.getProducts().then(data => this.products = data);

        this.cols = [
            {field: 'name', header: 'Name'},
            {field: 'price', header: 'Price'},
            {field: 'category', header: 'Category'},
            {field: 'rating', header: 'Reviews'},
            {field: 'inventoryStatus', header: 'Status'}
        ];

        this.statuses = [
            {label: 'INSTOCK', value: 'instock'},
            {label: 'LOWSTOCK', value: 'lowstock'},
            {label: 'OUTOFSTOCK', value: 'outofstock'}
        ];
        this.items = [];
        for (let i = 0; i < 100; i++) {
            this.items.push({label: 'Item ' + i, value: 'Item ' + i});
        }
        this.CompteSubject.subscribe
        ( (data)=>
            {
                this.haveAllCompte();
            }
        )
        this.haveAllCompte();
    }
    haveAllCompte() {
        this.compte_Service.getAllComptes_cg().subscribe (

            (data:Compte_cg[])=>
            {
                this.Comptes_cg=data
            }
        )

    }
    openNew() {
        this.compte_cg = {};
        this.submitted = false;
        this.CompteDialog = true;
        console.log(this.compte_cg)
    }
    filterChapeau(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        let query = event.query;

        for(let i = 0; i < this.chapeaux.length; i++) {
            let item = this.chapeaux[i];
            if (item.objet.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }

        this.filteredChapeau = filtered;
    }
    filterCompteCP(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        let query = event.query;

        for(let i = 0; i < this.Comptes_cp.length; i++) {
            let item = this.Comptes_cp[i];
            if (item.objet.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }

        this.filteredCompteCP = filtered;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editCompte(compte_cg: Compte_cg) {
        this.compte_cg = {...compte_cg};
        this.CompteDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = {...product};
    }

    confirmDeleteSelected(){
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedProducts = null;
    }

    confirmDelete(){
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        this.product = {};
    }

    hideDialog() {
        this.CompteDialog = false;
        this.submitted = false;
    }

    saveCompte() {
        this.submitted = true;

        console.log(this.compte_cg)
        if (this.compte_cg.objet.trim()) {
            if (this.compte_cg.id) {/*
                this.http.put<Compte_cg>(environment.apiUrl+`/compte/${this.utilisateur.id}`, this.utilisateur).subscribe((data) => {
                        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Utilisateur modifié', life: 3000});
                        this.userSubject.next()
                    },
                    (error)=>
                    {this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Utilisateur Non modifié', life: 3000});
                    })*/
            }
            else {
                console.log(this.compte_cg)
                this.http.post<Compte_cg>(environment.apiUrl+'/cgcompte', this.compte_cg).subscribe((data) => {
                        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Nouveau compte Ajouté', life: 3000});
                        console.log(this.compte_cg)
                        this.CompteSubject.next()

                    },
                    (error)=>
                    {this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Compte Non Ajouté', life: 3000});
                    })
            }
        }
        this.CompteDialog = false;
        this.compte_cg = {};
        this.submitted = false;
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
}
