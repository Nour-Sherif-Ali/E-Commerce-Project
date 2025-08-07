import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private _HttpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // Get cart item count as observable
  getCartItemCount(): Observable<number> {
    return this.cartItemCount.asObservable();
  }

  // Update cart item count
  updateCartCount(count: number): void {
    this.cartItemCount.next(count);
  }

  getAllProducts(): Observable <any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  private getToken(): string {
    return isPlatformBrowser(this.platformId) 
      ? localStorage.getItem('token') || '' 
      : '';
  }

  addProducttoCart(mytoken: any, pId: any): Observable <any> {
    const token = mytoken || this.getToken();
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/cart', 
      {productId: pId},
      {headers: {  
        token: token
      }})
  }

  getLoggedUserCart(): Observable <any> {
    if (!isPlatformBrowser(this.platformId)) {
      return new Observable(observer => {
        observer.next({ data: [] });
        observer.complete();
      });
    }
    const token = this.getToken();
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: { token }
    });
  }

  updateItemQuantity(myCount: any, id: any): Observable <any> {
    if (!isPlatformBrowser(this.platformId)) {
      return new Observable(observer => {
        observer.next({ success: false });
        observer.complete();
      });
    }
    const token = this.getToken();
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count: myCount }, {
      headers: { token }
    });
  }

  removeItem(id: any): Observable <any> {
    if (!isPlatformBrowser(this.platformId)) {
      return new Observable(observer => {
        observer.next({ success: false });
        observer.complete();
      });
    }
    const token = this.getToken();
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      headers: { token }
    });
  }

  clearItem(id: any): Observable <any> {
    if (!isPlatformBrowser(this.platformId)) {
      return new Observable(observer => {
        observer.next({ success: false });
        observer.complete();
      });
    }
    const token = this.getToken();
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      headers: { token }
    });
  }

  checkOutSession(cartId: any, addressData: any): Observable <any> {
    if (!isPlatformBrowser(this.platformId)) {
      return new Observable(observer => {
        observer.next({ success: false });
        observer.complete();
      });
    }
    const token = this.getToken();
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`, {
      shippingAddress: addressData
    }, { 
      headers: { token }
    });
  }
}

