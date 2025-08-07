// import { Component, inject } from '@angular/core';
// import { ProductsService } from '../../../products.service';
// import {ActivatedRoute} from '@angular/router';
// import { Product } from '../../../product';

// @Component({
//   selector: 'app-single-product',
//   imports: [],
//   templateUrl: './single-product.component.html',
//   styleUrl: './single-product.component.scss'
// })
// export class SingleProductComponent {
//   _ProductsService = inject(ProductsService);
//   _ActivateRoute = inject(ActivatedRoute);
//   productdetails !: Product;

// ngOnInit(): void{
  
//   let productId = this._ActivateRoute.snapshot.params?.['pid'];
  
//   this._ProductsService.getSpecificProduct(productId).subscribe({
//     next:(res) =>{
//       this.productdetails = res.data;

//     },
//     error: () => {

//     },
//   });
// }

// }
