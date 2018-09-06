import { Injectable } from '@angular/core';

import { IProduct } from './product';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ProductService } from './product.service';


@Injectable()
export class ProductResolver implements Resolve<IProduct> {

    constructor(private productService: ProductService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
        let id = +route.params['id'];
        if (isNaN(id)) {
            this.router.navigate(['/products']);
            return Observable.of(null);
        }
        return this.productService.getProduct(+id)
            .map(product => {
                if (product) {
                    return product;
                }
                console.log(`Product not found: ${id}`);
                this.router.navigate(['/products']);
                return null;
            })
            .catch(error => {
                console.log(`Retrival Error: ${error}`);
                this.router.navigate(['/products']);
                return Observable.of(null);
            });
    }
}
