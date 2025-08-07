import { Component, inject } from '@angular/core';
import { CartService } from '../../../cart.service';
import { cartData } from '../../../product';
import { LoaderComponent } from "../../../loader/loader.component";
import { error } from 'node:console';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { ProductsService } from './../../../products.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe, CommonModule],
  
templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  _ProductsService = inject(ProductsService);
  _CartService = inject(CartService);
  _ToastrService=inject(ToastrService);
  cartData: any;
  products : cartData[] =[];
  isLoading : boolean = true;

ngOnInit():void {
  this.isLoading = true;
  this._CartService.getLoggedUserCart().subscribe({
    next: (res) => {
      console.log(res);
      this.isLoading = false;
      this.cartData = res;
      this.products = res.data.products;
      
      // Update cart count
      if (res.numOfCartItems !== undefined) {
        this._CartService.updateCartCount(res.numOfCartItems);
      }

    },
    error:(err) => {
      console.log(err)
    }
  })
  
}

  updateQuantity(count:any, id:any){
    this._CartService.updateItemQuantity(count, id). subscribe({
      next: (res) =>{console.log(res);
        this.cartData = res;
        this.products = res.data.products;

        this._ToastrService.success('product count updated');
       
      },
      error: (err) => {console.log(err);
        this._ToastrService.error('failed to update');
      },
    });
  }

removeCartItem(id: any) {
  this._CartService.removeItem(id).subscribe({
    next: (res) => {
      console.log(res);
      this.cartData = res;
      this.products = res.data.products;
      this._CartService.updateCartCount(res.numOfCartItems);
      this._ToastrService.success('Deleted Successfully');
    },
    error: (err) => { console.log(err); }
  });
}

  clearCartItem(id:any){
    this._CartService.clearItem(id).subscribe({
      next: (res) => {console.log(res);},
      error: (err) => {console.log(err);}
    });
  }
 
}
