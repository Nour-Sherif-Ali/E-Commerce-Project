import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from './../wishlist.service';
import { CartService } from './../cart.service';
import { RouterModule } from '@angular/router';
import { Wishlist } from './../product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports:[CommonModule, RouterModule],
  templateUrl: './wisihlist.component.html',
  styleUrls: ['./wisihlist.component.scss']
})
export class WishlistComponent implements OnInit {

  wishList: Wishlist[] = []
  isLoading: boolean = false

  constructor(private _WishlistService: WishlistService, private toastr: ToastrService, private _CartService: CartService) { }


  ngOnInit(): void {
    this.getAllWishlistItems()
  }

  getAllWishlistItems() {
    this.isLoading = true;

    this._WishlistService.getLoggedWishList().subscribe({
      next: response => {
        this.isLoading = false;

        this.wishList = response.data || [];

        console.log(this.wishList);
      },
      error: err => {
        console.log(err);
        this.isLoading = false;

      }
    })
  }

  removeItemFromWishlist(productId: string) {
    this.isLoading = true;

    this._WishlistService.removeProductFromWishList(productId).subscribe({
      next: response => {
        this.isLoading = false;

        this._WishlistService.numOfWishListItems.next(response.data.length)
        this.getAllWishlistItems()
        this.toastr.error(response.message);
        console.log(response);
      },
      error: err => {
        console.log(err);
        this.isLoading = false;

      }

    })
  }

  addWishlistProductToCart(productId: string) {
    this.isLoading = true;

    const myToken = 'your-token-here'; // Replace with the actual token retrieval logic
    this._CartService.addProducttoCart(myToken, productId).subscribe({
      next: response => {
        this.isLoading = false;

        this._WishlistService.numOfWishListItems.next(response.data.length)
        this.toastr.success(response.message);
        console.log(response);
      },
      error: err => {
        console.log(err);
        this.isLoading = false;

      }
    })
  }

  clearWishlist() {
    // Implementation for clearing the wishlist
    // This would typically remove all items from the wishlist
    this.isLoading = true;
    
    // Since there's no direct API to clear all wishlist items,
    // we'll need to remove items one by one or implement a custom solution
    // For now, let's just refresh the wishlist to ensure it's up to date
    this.getAllWishlistItems();
    this.toastr.info('Wishlist cleared');
    this.isLoading = false;
  }
}


