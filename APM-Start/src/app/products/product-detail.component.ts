import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
//import { ProductService } from './product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './app/products/product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
    pageTitle: string = 'Product Detail';
    product: IProduct;
    errorMessage: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.product = this.route.snapshot.data['product'];
        //  let id = +this.route.snapshot.params['id'];
        //  this.getProduct(id);
    }
    /*  getProduct(id: number) {
          this.productService.getProduct(id).subscribe(
              product => this.product = product,
              error => this.errorMessage = <any>error);
      } */
}
