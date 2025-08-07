import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  baseUrl: string = "https://ecommerce.routemisr.com/api/v1/wishlist";
  numOfWishListItems: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(
    private _HttpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getHeaders() {
    const token = isPlatformBrowser(this.platformId) 
      ? localStorage.getItem("userToken") || "" 
      : "";
    return { token };
  }

  getLoggedWishList(): Observable<any> {
    if (!isPlatformBrowser(this.platformId)) {
      return new Observable(observer => {
        observer.next({ data: [] });
        observer.complete();
      });
    }
    return this._HttpClient.get(this.baseUrl, {
      headers: this.getHeaders()
    });
  }

  addProductToWishList(productId: string): Observable<any> {
    if (!isPlatformBrowser(this.platformId)) {
      return new Observable(observer => {
        observer.next({ success: false });
        observer.complete();
      });
    }
    return this._HttpClient.post(this.baseUrl,
      { productId },
      { headers: this.getHeaders() }
    );
  }

  removeProductFromWishList(productId: string): Observable<any> {
    if (!isPlatformBrowser(this.platformId)) {
      return new Observable(observer => {
        observer.next({ success: false });
        observer.complete();
      });
    }
    return this._HttpClient.delete(`${this.baseUrl}/${productId}`, {
      headers: this.getHeaders()
    });
  }
}
