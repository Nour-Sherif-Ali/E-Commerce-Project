// services/subcategory.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubCategory, SubCategoryResponse } from './sub-category';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  private apiUrl = 'https://ecommerce.routemisr.com/api/v1';

  constructor(private http: HttpClient) { }

  // Get all subcategories
  getAllSubcategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/subcategories`);
  }

  // Get specific subcategory by ID
  getSubcategoryById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/subcategories/${id}`);
  }

  // Get all subcategories for a specific category
  getSubcategoriesByCategory(categoryId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/${categoryId}/subcategories`);
  }

  
}