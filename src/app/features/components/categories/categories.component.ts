// src/app/categories/categories.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { ShortenIdPipe } from '../../../shorten-id.pipe';
interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

interface ApiResponse<T> {
  status: string;
  results?: number;
  data: T;
}

@Component({
  selector: 'app-categories',
  standalone: true, // Add this for standalone component
  imports: [CommonModule , FormsModule],
  
templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  // Use more flexible ID management
  categoryId: string | null = '6407ebf65bbc6e43516931ec';
  subcategoryParentId: string | null = '6407ea3d5bbc6e43516931df';
  
  category: Category | null = null;
  subcategories: Subcategory[] = [];
  allCategories: Category[] = [];
  
  isLoading = {
    category: false,
    subcategories: false,
    allCategories: false
  };
  
  errors = {
    category: '',
    subcategories: '',
    allCategories: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAllCategories(); // Load all categories first
  }

  fetchAllCategories() {
    this.isLoading.allCategories = true;
    this.errors.allCategories = '';
    
    this.http.get<ApiResponse<Category[]>>(
      'https://ecommerce.routemisr.com/api/v1/categories'
    ).subscribe({
      next: (response) => {
        this.allCategories = response.data;
        this.isLoading.allCategories = false;
        
        // Validate our IDs against available categories
        this.validateCategoryIds();
        
        // Load specific data if we have valid IDs
        if (this.categoryId) this.loadCategory();
        if (this.subcategoryParentId) this.loadSubcategories();
      },
      error: (err: HttpErrorResponse) => {
        this.handleError('allCategories', err);
        this.isLoading.allCategories = false;
      }
    });
  }

  private validateCategoryIds() {
    // Check if our hardcoded IDs exist
    if (this.categoryId && !this.allCategories.some(c => c._id === this.categoryId)) {
      console.warn(`Category ID ${this.categoryId} not found in available categories`);
      this.categoryId = this.allCategories[0]?._id || null;
    }
    
    if (this.subcategoryParentId && !this.allCategories.some(c => c._id === this.subcategoryParentId)) {
      console.warn(`Subcategory parent ID ${this.subcategoryParentId} not found`);
      this.subcategoryParentId = this.allCategories[0]?._id || null;
    }
  }

  loadCategory() {
    if (!this.categoryId) return;
    
    this.isLoading.category = true;
    this.errors.category = '';
    
    this.http.get<ApiResponse<Category>>(
      `https://ecommerce.routemisr.com/api/v1/categories/${this.categoryId}`
    ).subscribe({
      next: (response) => {
        this.category = response.data;
        this.isLoading.category = false;
      },
      error: (err: HttpErrorResponse) => {
        this.handleError('category', err);
        this.isLoading.category = false;
        this.categoryId = null; // Invalidate the ID if it fails
      }
    });
  }

  loadSubcategories() {
    if (!this.subcategoryParentId) return;
    
    this.isLoading.subcategories = true;
    this.errors.subcategories = '';
    
    this.http.get<ApiResponse<Subcategory[]>>(
      `https://ecommerce.routemisr.com/api/v1/categories/${this.subcategoryParentId}/subcategories`
    ).subscribe({
      next: (response) => {
        this.subcategories = response.data;
        this.isLoading.subcategories = false;
      },
      error: (err: HttpErrorResponse) => {
        this.handleError('subcategories', err);
        this.isLoading.subcategories = false;
        this.subcategoryParentId = null; // Invalidate the ID if it fails
      }
    });
  }

  private handleError(context: 'category' | 'subcategories' | 'allCategories', err: HttpErrorResponse) {
    let errorMessage = '';
    
    switch (err.status) {
      case 0:
        errorMessage = 'Network error. Please check your internet connection.';
        break;
      case 404:
        errorMessage = 'Resource not found. The requested data is unavailable.';
        // Suggest alternative categories if available
        if (context !== 'allCategories' && this.allCategories.length > 0) {
          errorMessage += ' Please try selecting another category.';
        }
        break;
      case 401:
        errorMessage = 'Authentication required. Please check if you need API keys.';
        break;
      case 500:
        errorMessage = 'Server error. Please try again later.';
        break;
      default:
        errorMessage = `An unexpected error occurred (${err.status}).`;
    }
    
    this.errors[context] = errorMessage;
    console.error(`${context} load error:`, err);
  }

  selectCategory(categoryId: string) {
    this.categoryId = categoryId;
    this.loadCategory();
  }

  selectSubcategoryParent(categoryId: string) {
    this.subcategoryParentId = categoryId;
    this.loadSubcategories();
  }

  refreshAll() {
    this.fetchAllCategories();
  }
}