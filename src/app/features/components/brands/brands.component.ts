// src/app/components/brand/brand.component.ts
import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../../brands.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  productsCount?: number;
  description?: string;
}

interface ApiResponse {
  data: Brand[] | Brand;
  success: boolean;
  message?: string;
}

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandComponent implements OnInit {
  // For list view
  brands: Brand[] = [];
  
  // For detail view
  singleBrand: Brand | null = null;
  
  // State management
  isLoading: boolean = true;
  errorMessage: string = '';
  isListView: boolean = true;

  constructor(
    private brandsService: BrandsService,  
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const brandId = params['id'];
      this.isListView = !brandId;
      
      if (this.isListView) {
        this.loadBrands();
      } else if (brandId) {
        this.loadBrand(brandId);
      }
    });
  }

  retryLoading(): void {
    this.errorMessage = '';
    this.isLoading = true;
    
    const brandId = this.route.snapshot.paramMap.get('id');
    
    if (brandId) {
      this.loadBrand(brandId);
    } else {
      this.loadBrands();
    }
  }

  private loadBrands(): void {
    this.isListView = true;
    this.isLoading = true;
    this.errorMessage = '';
    
    this.brandsService.getAllBrands().subscribe({
      next: (response: ApiResponse) => {
        this.brands = Array.isArray(response.data) ? response.data : [];
        this.isLoading = false;
      },
      error: (err: Error) => {
        this.errorMessage = err.message || 'Failed to load brands. Please try again.';
        this.isLoading = false;
        console.error('Error loading brands:', err);
      }
    });
  }

  private loadBrand(id: string): void {
    this.isListView = false;
    this.isLoading = true;
    this.errorMessage = '';
    
    this.brandsService.getBrandById(id).subscribe({
      next: (response: ApiResponse) => {
        this.singleBrand = response.data as Brand;
        this.isLoading = false;
      },
      error: (err: Error) => {
        this.errorMessage = err.message || 'Failed to load brand details. Please try again.';
        this.isLoading = false;
        console.error('Error loading brand:', err);
      }
    });
  }
}