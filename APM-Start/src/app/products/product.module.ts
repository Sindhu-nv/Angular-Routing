import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit.component';

import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service';

import { SharedModule } from '../shared/shared.module';
import { ProductResolver } from './product-resolver.service';
import { ProductListResolver } from './product-list-resolver.service';
import { ProductEditInfoComponent } from './product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit-tags.component';
import { ProductChildComponent } from './product-child.component';
//import { AuthGuard } from '../user/auth-guard.service';
import { ProductChildEditGuard } from './product-child-guard.service';
import { ProductEditGuard } from './product-edit-guard.service';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      /*   {
           path: 'products',
           canActivate: [AuthGuard],
           data: { pageTitle: 'Product List' },
           resolve: { products: ProductListResolver },
           children: [ */
      { path: '', component: ProductListComponent },
      {
        path: ':id',
        component: ProductDetailComponent,
        resolve: { product: ProductResolver }
      },
      {
        path: ':id/edit',
        component: ProductEditComponent,
        canDeactivate: [ProductEditGuard],
        resolve: { product: ProductResolver },
      },
      {
        path: ':id/childEdit',
        component: ProductChildComponent,
        canDeactivate: [ProductChildEditGuard],
        resolve: { product: ProductResolver },
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: ProductEditInfoComponent },
          { path: 'tags', component: ProductEditTagsComponent }
        ]
      }
    ])
    // }
    // ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductFilterPipe,
    ProductChildComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent
  ],
  providers: [
    ProductService,
    ProductResolver,
    ProductListResolver,
    ProductEditGuard,
    ProductChildEditGuard
  ]
})
export class ProductModule { }
