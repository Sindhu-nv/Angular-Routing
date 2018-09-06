import { Injectable } from '@angular/core';

import { IProduct } from './product';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ProductService } from './product.service';


@Injectable()
export class ProductListResolver implements Resolve<IProduct[]> {

    constructor(private productService: ProductService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct[]> {
        return this.productService.getProducts()
            .map(products => {
                if (products) {
                    return products;
                }
                console.log(`Products not found`);
                this.router.navigate(['/welcome']);
                return null;
            })
            .catch(error => {
                console.log(`Retrival Error: ${error}`);
                this.router.navigate(['/welcome']);
                return Observable.of(null);
            });
    }
}
