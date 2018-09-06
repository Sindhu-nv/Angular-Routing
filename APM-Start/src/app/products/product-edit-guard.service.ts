import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ProductEditComponent } from './product-edit.component';

@Injectable()
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {

    canDeactivate(component: ProductEditComponent): boolean {
        if (component.isDirty) {
            let productName = component.product.productName || 'New Product';
            return confirm(`Navigate will lose all changes to ${productName}?`)
        }
        return true;
    }
}
