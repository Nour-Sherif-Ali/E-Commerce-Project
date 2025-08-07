import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../../cart.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  cartId !: string ;

 _CartService= inject(CartService);
 _ActivatedRoute= inject(ActivatedRoute);
_Router = inject(Router);

  addressForm = new FormGroup({
    phone : new FormControl(null, [Validators.required]),
    city : new FormControl(null, [Validators.required]),
    details : new FormControl(null, [Validators.required]),
  });

  onlinePayement(formData: any){

    let id = this._ActivatedRoute.snapshot.params?.['cartId'];
    console.log(formData);
    if(formData.valid){
       this._CartService.checkOutSession(id , formData.value).subscribe({
        next: (res) => {console.log(res);
          location.href = res.session.url;
        },
        error: (err) => {console.log(err);}
       })

    }
  }
}
