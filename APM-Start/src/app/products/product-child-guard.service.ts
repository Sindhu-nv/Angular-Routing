import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ProductChildComponent } from './product-child.component';

@Injectable()
export class ProductChildEditGuard implements CanDeactivate<ProductChildComponent> {

    canDeactivate(component: ProductChildComponent): boolean {
        if (component.isDirty) {
            let productName = component.product.productName || 'New Product';
            return confirm(`Navigate will lose all changes to ${productName}?`)
        }
        return true;
    }
}
