import { Component, OnInit } from '@angular/core';
import {Compte_cg} from "../../../models/compte_cg";
import {Product} from "../../../api/product";
import {CompteService} from "../../../service/compte.service";
import {HttpClient} from "@angular/common/http";
import {ProductService2} from "../../../service/productservice2";
import {ConfirmationService, MessageService} from "primeng/api";
import {environment} from "../../../../environments/environment.prod";
import {Subject} from "rxjs";
import {Cg_journal} from "../../../models/cg_journal";
import {Router} from "@angular/router";


import * as xlsx from 'xlsx';
import {Fichier} from "../../../models/fichier";

@Component({
    selector: 'app-cg-journal',
    templateUrl: './cg-journal.component.html',
    styleUrls: ['./cg-journal.component.scss']
})
export class ImportationComponent implements OnInit {

    Cg_journals: Cg_journal[];

    Cgjournal: Compte_cg;

    CompteDialog: boolean;

    ImportDialog: boolean;

    uploadedFiles: any[] = [];

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

    filteredItems: any[];

    items: any[];





    montantGlobal:number = 0;
    ws: any[];
    wb: xlsx.WorkBook;
    charger:boolean;
    charger2:boolean;
    fichierChoisi : Fichier = new Fichier();
    nameFichier:any;




    constructor(private compte_Service: CompteService, private http: HttpClient, private productService: ProductService2, private messageService: MessageService,
                private confirmationService: ConfirmationService, private router: Router) {}

    ngOnInit() {

        this.compte_Service.getAllJournal_CG().subscribe(
            (data)=>{
                this.Cg_journals=data;
                console.log(this.Cg_journals)
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
        }/*
        this.CompteSubject.subscribe
        ( (data)=>
            {
                this.haveAllCompte();
            }
        )
        this.haveAllCompte();*/
    }
    haveAllCompte() {
        this.compte_Service.getAllComptes_cg().subscribe (

            (data:Cg_journal[])=>
            {
                this.Cg_journals=data
            }
        )

    }
    openNew() {
        this.Cgjournal = {};
        this.submitted = false;
        this.CompteDialog = true;
//        console.log(this.compte_cg)
    }
    filterItems(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        let query = event.query;

        for(let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            if (item.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }

        this.filteredItems = filtered;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editCompte(compte_cg: Compte_cg) {
        //      this.compte_cg = {...compte_cg};
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

        /*    console.log(this.compte_cg)
            if (this.compte_cg.objet.trim()) {
                if (this.compte_cg.id) {/*
                    this.http.put<Compte_cg>(environment.apiUrl+`/compte/${this.utilisateur.id}`, this.utilisateur).subscribe((data) => {
                            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Utilisateur modifié', life: 3000});
                            this.userSubject.next()
                        },
                        (error)=>
                        {this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Utilisateur Non modifié', life: 3000});
                        })
                }
                else {
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
            */

    }
    openNew2(){
        this.ImportDialog=true;
    }
    onUpload(event) {
        // for (let f=0;f<this.nameFichier.length;f++)
        // {
        // console.log()
        console.log(event.target.files)

        const target: DataTransfer = <DataTransfer>(event.target);
        console.log(target.files);

//verification existence fichier
        /*     if (this.comparaisonFichiers(target.files[0].name))
             {
                 console.log('Vous ne pouvez pas charger ce fichier car il a déja été chargé');

                 this.charger = false;
                 // break;
             }
             else
             {*/
        console.log(target.files[0].name);
        this.fichierChoisi.nomFichier = target.files[0].name

        console.log('Good');
        this.charger=true;
        this.charger2=true;
        // this.chargefichierService.uploadFile(event.target.files[0]).subscribe(data =>
        // {
        //     console.log(data);
        // })

        if (target.files.length !== 1) throw new Error('Cannot use multiple files');
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
            /* read workbook */
            let bstr = e.target.result;
            this.wb = xlsx.read(bstr, {type: 'binary'});

            /* grab first sheet */
            this.wb.SheetNames.forEach(ele => {
                this.ws = xlsx.utils.sheet_to_json(this.wb.Sheets[ele])
                console.log(this.ws);
            });
            /* wire up file reader */

            for (let index = 0; index < this.ws.length; index++) {
                console.log(this.ws.length)
                console.log(index)

                this.ws[index];
                console.log(this.ws[index]);
                console.log(this.ws[index].MontantCFA)
                console.log(this.montantGlobal)
                this.montantGlobal += this.ws[index].MontantCFA
                console.log(this.montantGlobal)
            }
            console.log(this.ws.length);
            console.log(this.montantGlobal);

            console.log(this.ws);
        };
        reader.readAsBinaryString(target.files[0]);
    }
    //}

    comparaisonFichiers(fileName):boolean{
        let res:boolean;

        for (let f of this.nameFichier){
            if (f == fileName){
                res =true
                break
            }
            else {
                res = false
            }
        }
        return res
    }
}
