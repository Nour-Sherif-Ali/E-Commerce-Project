import { Component, Input, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthonService } from '../../services/authon/authon.service';
import { TranslatePipe } from '@ngx-translate/core';
import { MytranslationService } from './../../services/mytranslation.service';
import { ProductsService } from '../../../products.service';
import { CartService } from '../../../cart.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterLink,RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  // @Input() isLogin: boolean = true;
  _AuthonService= inject(AuthonService);
  _ProductsService = inject(ProductsService);
  _CartService = inject(CartService);
  _Router = inject(Router);
  numOfCart = computed(() => { return this._CartService.getCartItemCount()});

  loggedUserName : string = '';

  _translate = inject(MytranslationService);

  enableNavBar : Boolean = false;
subcategories: any;
ngOnInit(): void {
  this._AuthonService.isLogin.subscribe(
    (val) => {
      this.enableNavBar = val;
      console.log('navbar subscribe');
      if (val === true) {
        
      }
    }
  );
  
  this._AuthonService.userName.subscribe(
    (value) => {
      this.loggedUserName = value;
    }
  );

  // Initialize cart count
  this._CartService.getLoggedUserCart().subscribe({
    next: (res) => {
      if (res.numOfCartItems !== undefined) {
        this._CartService.updateCartCount(res.numOfCartItems);
      }
    },
    error: (err) => {
      console.log('Error fetching cart data:', err);
    }
  });
}
  logOut(){   //dah signout function shelt el token we khalit el user yerga3 le saf7et el login tany
    localStorage.removeItem('token');
    this._AuthonService.isLogin.next(false);
    this._Router.navigate(['/login']);

  }

  change(Lang :any) {
    this._translate.changeLangAndDirection(Lang);
  }

}
 