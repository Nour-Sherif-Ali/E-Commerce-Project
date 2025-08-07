import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './features/components/cart/cart.component';
import { CategoriesComponent } from './features/components/categories/categories.component';
import { BrandComponent } from './features/components/brands/brands.component';
import {ProductsComponent} from './features/components/products/products.component';
import { LoginComponent } from './features/components/login/login.component';
import { RegisterComponent } from './features/components/register/register.component';
import { NotfoundComponent } from './features/components/notfound/notfound.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { notLoginGuard } from './core/guards/auth/notlogin.guard';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
// import { SingleProductComponent } from './features/components/single-product/single-product.component';
import { CheckoutComponent } from './features/components/checkout/checkout.component';
import { SubCategory } from './sub-category';
import { SubcategoryListComponent } from './sub-category-list/sub-category-list.component';
import { WishlistComponent } from './wisihlist/wisihlist.component';

export const routes: Routes = [
    {path:'',redirectTo:'/login', pathMatch:'full'},
    {path:'home' ,component:HomeComponent , title:'Home', canActivate: [authGuard]},
    // {path:'single/:pid/:pname /:pcategory' ,component:SingleProductComponent , title:'Product', canActivate: [authGuard]},
    {path:'cart' , component: CartComponent,title:'Cart' , canActivate: [authGuard]},
    {path:'wishlist' , component: WishlistComponent,title:'WishList' , canActivate: [authGuard]},
    {path:'checkout/:cartId' , component: CheckoutComponent,title:'Checkout' , canActivate: [authGuard]},
    {path:'categories' , component:CategoriesComponent ,title:'Categories', canActivate: [authGuard] },
    {path:'brand' , component:BrandComponent ,title:'Brands', canActivate: [authGuard] },
    {path:'Subcategory' , component:SubcategoryListComponent ,title:'Subcategory', canActivate: [authGuard] },
    { path: 'brand/:id', component: BrandComponent },

    {path:'products' , component:ProductsComponent ,title:'Product', canActivate: [authGuard] },
    {path:'login' , component: LoginComponent,title:'Login',canActivate:[notLoginGuard] },
    {path:'forgetPassword', component:ForgetPasswordComponent, title:'Reset Password'},
    {path:'register', component: RegisterComponent, title:'Registration',canActivate:[notLoginGuard]},
    {path:'**', component:NotfoundComponent,title:'404 error'},
];
