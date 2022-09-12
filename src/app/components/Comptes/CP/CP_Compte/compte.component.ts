import { Component, OnInit } from '@angular/core';
import {Product} from "../../../../api/product";
import {ProductService} from "../../../../service/productservice";
import {ConfirmationService, MessageService} from "primeng/api";
import {CompteService} from "../../../../service/compte.service";
import {Compte_cp} from "../../../../models/compte_cp";
import {Action_cp} from "../../../../models/action_cp";
import {CgCompteChapeau} from "../../../../models/CgCompteChapeau";
import {Modepaiement_cp} from "../../../../models/modepaiement_cp";
import {TypeCompte_cp} from "../../../../models/typeCompte_cp";

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {

    Comptes_cp: Compte_cp[];

    actions: Action_cp[];

    chapeaux: CgCompteChapeau[];

    modepaiements: Modepaiement_cp[];

    typeComptes: TypeCompte_cp[];

    CompteDialog: boolean;

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

    filteredChapeaux: any[];

    filteredActions: any[];

    filteredModepaiement: any[];

    filteredTypeCompte: any[];

    items: any[];

    constructor(private compte_Service: CompteService, private messageService: MessageService, private productService: ProductService,
                private confirmationService: ConfirmationService) {}

    ngOnInit() {
        this.compte_Service.getAllComptes_cp().subscribe(
            (data)=>{
                this.Comptes_cp=data;
                console.log(this.Comptes_cp);
            }
        );
        this.compte_Service.getAllAction().subscribe(
            (data)=>{
                this.actions=data;
                console.log(this.actions);
            }
        );
        this.compte_Service.getAllChapeau().subscribe(
            (data)=>{
                this.chapeaux=data;
                console.log(this.chapeaux);
            }
        );
        this.compte_Service.getAllModepaiement().subscribe(
            (data)=>{
                this.modepaiements=data;
                console.log(this.modepaiements);
            }
        );
        this.compte_Service.getAllTypeCompte().subscribe(
            (data)=>{
                this.typeComptes=data;
                console.log(this.typeComptes);
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
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.CompteDialog = true;
    }
    filterActions(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        let query = event.query;

        for(let i = 0; i < this.actions.length; i++) {
            let item = this.actions[i];
            if (item.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }

        this.filteredActions = filtered;
    }
    filterChapeaux(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        let query = event.query;

        for(let i = 0; i < this.chapeaux.length; i++) {
            let item = this.chapeaux[i];
            if (item.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }

        this.filteredChapeaux = filtered;
    }
    filterModepaiement(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        let query = event.query;

        for(let i = 0; i < this.modepaiements.length; i++) {
            let item = this.modepaiements[i];
            if (item.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }

        this.filteredModepaiement = filtered;
    }
    filterTypeCompte(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        let query = event.query;

        for(let i = 0; i < this.typeComptes.length; i++) {
            let item = this.typeComptes[i];
            if (item.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(item);
            }
        }

        this.filteredTypeCompte = filtered;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = {...product};
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

    saveProduct() {
        this.submitted = true;

        if (this.product.name.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value: this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
            }

            this.products = [...this.products];
            this.CompteDialog = false;
            this.product = {};
        }
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
