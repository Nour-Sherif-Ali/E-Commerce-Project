// src/app/api/categories.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseUrl = 'https://ecommerce.routemisr.com/api/v1/categories';

  constructor(private http: HttpClient) { }

  // Get all categories
  getAllCategories(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Get all subcategories for a specific category
  getAllSubcategories(categoryId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${categoryId}/subcategories`);
  }

  // Get a specific category
  getCategory(categoryId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${categoryId}`);
  }
}
