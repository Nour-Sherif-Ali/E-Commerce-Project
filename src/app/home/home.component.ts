import { CurrencyPipe, isPlatformBrowser, UpperCasePipe } from '@angular/common';
import { afterNextRender, Component, ElementRef, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProductsService } from '../products.service';
import { CategoriesService } from '../categories.service';
import { Observable } from 'rxjs';
import { Category, Product } from '../product';
import { LoaderComponent } from "../loader/loader.component";
import { SliderCategoryComponent } from "../shared/slider-category/slider-category.component";
import { RouterLink } from '@angular/router';
import { CartService } from '../cart.service';
import { AuthonService } from '../core/services/authon/authon.service';
import { ToastrService } from 'ngx-toastr';
import { OnsalePipe } from "../core/pipes/onsale.pipe";
import { SearchPipe } from '../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../wishlist.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ 
    CommonModule,
    FormsModule, 
    SliderCategoryComponent, 
    RouterLink, 
    UpperCasePipe, 
    CurrencyPipe, 
    OnsalePipe, 
    SearchPipe,
    
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  _ProductsService = inject(ProductsService);
  _CategoriesService = inject(CategoriesService);
  _CartService = inject(CartService);
  _AuthonService = inject(AuthonService);
  _ToastrService = inject(ToastrService);
  _WishlistService = inject(WishlistService);

  isLoading: boolean = false;
  searchValue: string = '';
  allProducts: Product[] = [];
  allCategories: Category[] = [];
  wishlistItems: string[] = []; // Store product IDs in wishlist

  ngOnInit(): void {
    this.isLoading = true;
    this.loadProducts();
    this.loadCategories();
    this.loadWishlist();
  }

  loadProducts(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    });
  }

  loadCategories(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (resp: any) => {
        this.allCategories = resp.data;
      },
      error: (err: any) => console.log(err)
    });
  }

  loadWishlist(): void {
    this._WishlistService.getLoggedWishList().subscribe({
      next: (response) => {
        this.wishlistItems = response.data.map((item: any) => item._id);
      },
      error: (err) => console.error('Error fetching wishlist:', err)
    });
  }

  // home.component.ts
  addToCart(id: any): void {
    let myToken = localStorage.getItem('token');
    this._CartService.addProducttoCart(myToken, id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success('Added to cart successfully');
        
        // Update the cart count in the service
        if (res.numOfCartItems !== undefined) {
          this._CartService.updateCartCount(res.numOfCartItems);
        }
      },
      error: (err) => this._ToastrService.error('Failed to add to cart')
    });
  }

  toggleWishlist(productId: string): void {
    if (this.isInWishlist(productId)) {
      this._WishlistService.removeProductFromWishList(productId).subscribe({
        next: () => {
          this.wishlistItems = this.wishlistItems.filter(id => id !== productId);
          this._ToastrService.success('Removed from wishlist');
        },
        error: (err) => {
          console.error('Error removing from wishlist:', err);
          this._ToastrService.error('Failed to remove from wishlist');
        }
      });
    } else {
      this._WishlistService.addProductToWishList(productId).subscribe({
        next: (response) => {
          this.wishlistItems.push(productId);
          this._ToastrService.success('Added to wishlist');
        },
        error: (err) => {
          console.error('Error adding to wishlist:', err);
          this._ToastrService.error('Failed to add to wishlist');
        }
      });
    }
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistItems.includes(productId);
  }
}