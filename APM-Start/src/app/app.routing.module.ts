import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductListResolver } from './products/product-list-resolver.service';
import { AuthGuard } from './user/auth-guard.service';
import { ProductService } from './products/product.service';
import { SelectiveStrategy } from './selective-strategy.service';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent },
            {
                path: 'products',
                canActivate: [AuthGuard],
                data: { pageTitle: 'Product List', preload: false },
                resolve: { products: ProductListResolver },
                loadChildren: 'app/products/product.module#ProductModule'
            },
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: '**', component: PageNotFoundComponent }
        ], { enableTracing: true, preloadingStrategy: SelectiveStrategy })
    ],
    exports: [RouterModule],
    providers: [
        SelectiveStrategy,
        ProductService,
        ProductListResolver,
    ]
})

export class AppRoutingModule {

}

