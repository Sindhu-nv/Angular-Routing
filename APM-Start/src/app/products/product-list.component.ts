import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
//import { ProductService } from './product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './app/products/product-list.component.html',
    styleUrls: ['./app/products/product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = '';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: string;
    errorMessage: string;

    products: IProduct[];

    constructor(
        //private productService: ProductService, 
        private route: ActivatedRoute) { }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.pageTitle = this.route.snapshot.data['pageTitle'] || '';
        this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
        this.showImage = this.route.snapshot.queryParams['showImage'] === 'true';
        this.products = this.route.snapshot.data['products'];
        /*  this.productService.getProducts()
              .subscribe(products => this.products = products,
                  error => this.errorMessage = <any>error); */
    }
}
