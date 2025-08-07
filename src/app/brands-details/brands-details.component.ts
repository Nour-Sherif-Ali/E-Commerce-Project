// // src/app/components/brand-details/brand-details.component.ts
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { BrandsService } from '../brands.service';
// import { CommonModule } from '@angular/common';
// @Component({
//   selector: 'app-brand-details',
//   imports: [CommonModule],
//   templateUrl: './brands-details.component.html',
//   styleUrls: ['./brands-details.component.scss']
// })
// export class BrandDetailsComponent implements OnInit {
//   brand: any = null;
//   isLoading: boolean = true;
//   errorMessage: string = '';

//   constructor(
//     private brandsService: BrandsService,
//     private route: ActivatedRoute
//   ) { }

//   ngOnInit(): void {
//     const brandId = this.route.snapshot.paramMap.get('id');
//     if (brandId) {
//       this.brandsService.getBrandById(brandId).subscribe(
//         (response: any) => {
//           this.brand = response.data;
//           this.isLoading = false;
//         },
//         (error) => {
//           this.errorMessage = 'Failed to load brand details';
//           this.isLoading = false;
//         }
//       );
//     }
//   }
// }