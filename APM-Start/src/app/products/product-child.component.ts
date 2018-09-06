import { Component, OnInit } from '@angular/core';

import { MessageService } from '../messages/message.service';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './app/products/product-child.component.html',
    styleUrls: ['./app/products/product-edit.component.css']
})
export class ProductChildComponent implements OnInit {
    pageTitle: string = 'Product Child Edit';
    errorMessage: string;
    private dataIsValid: { [key: string]: boolean } = {};
    private currentProduct: IProduct;
    private originalProduct: IProduct;
    get product(): IProduct {
        return this.currentProduct;
    }
    set product(value: IProduct) {
        this.currentProduct = value;
        this.originalProduct = Object.assign({}, value);
    }

    get isDirty(): boolean {
        return JSON.stringify(this.originalProduct) !== JSON.stringify(this.currentProduct);
    }

    reset(): void {
        this.dataIsValid = null;
        this.currentProduct = null;
        this.originalProduct = null;
    }

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        // let id = +this.route.snapshot.params['id'];
        //this.getProduct(id);
        /*  this.route.params.subscribe(
              params => {
                  let id = +params['id'];
                  this.getProduct(id);
              }
          ); */
        this.route.data.subscribe(data => {
            this.onProductRetrieved(data['product']);
        });
    }
    /*  getProduct(id: number): void {
          this.productService.getProduct(id)
              .subscribe(
                  (product: IProduct) => this.onProductRetrieved(product),
                  (error: any) => this.errorMessage = <any>error
              );
      } */

    onProductRetrieved(product: IProduct): void {
        this.product = product;

        if (this.product.id === 0) {
            this.pageTitle = 'Add Product';
        } else {
            this.pageTitle = `Edit Product: ${this.product.productName}`;
        }
    }

    deleteProduct(): void {
        if (this.product.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.product.productName}?`)) {
                this.productService.deleteProduct(this.product.id)
                    .subscribe(
                        () => this.onSaveComplete(`${this.product.productName} was deleted`),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveProduct(): void {
        if (this.isValid(null)) {
            this.productService.saveProduct(this.product)
                .subscribe(
                    () => this.onSaveComplete(`${this.product.productName} was saved`),
                    (error: any) => this.errorMessage = <any>error
                );
        } else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    }

    onSaveComplete(message?: string): void {
        if (message) {
            this.messageService.addMessage(message);
        }
        this.reset();
        // Navigate back to the product list
        this.router.navigate(['/products']);
    }

    validate(): void {
        this.dataIsValid = {};
        if (this.product.productName && this.product.productName.length >= 3 && this.product.productCode) {
            this.dataIsValid['info'] = true;
        }
        else {
            this.dataIsValid['info'] = false;
        }

        if (this.product.category && this.product.category.length >= 3) {
            this.dataIsValid['tags'] = true;
        }
        else {
            this.dataIsValid['tags'] = false;
        }
    }

    isValid(path: string): boolean {
        this.validate();
        if (path) {
            return this.dataIsValid[path];
        }
        return (this.dataIsValid && Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
    }
}
