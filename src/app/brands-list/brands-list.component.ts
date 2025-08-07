// // src/app/components/brands-list/brands-list.component.ts
// import { Component, OnInit } from '@angular/core';
// import { BrandsService } from '../brands.service';
// import {CommonModule} from '@angular/common';
// import { RouterLink } from '@angular/router'; 

// @Component({
//   selector: 'app-brands-list',
//   imports: [CommonModule, RouterLink] ,
//   templateUrl: './brands-list.component.html',
//   styleUrls: ['./brands-list.component.css']
// })
// export class BrandsListComponent implements OnInit {
//   brands: any[] = [];
//   isLoading: boolean = true;
//   errorMessage: string = '';

//   constructor(private brandsService: BrandsService) { }

//   ngOnInit(): void {
//     this.brandsService.getAllBrands().subscribe(
//       (response: any) => {
//         this.brands = response.data;
//         this.isLoading = false;
//       },
//       (error) => {
//         this.errorMessage = 'Failed to load brands';
//         this.isLoading = false;
//       }
//     );
//   }
// }