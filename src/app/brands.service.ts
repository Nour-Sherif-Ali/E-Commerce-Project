// src/app/services/brands.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private apiUrl = 'https://ecommerce.routemisr.com/api/v1/brands';

  constructor(private http: HttpClient) { }

  // Get all brands
  getAllBrands(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Get specific brand by ID
  getBrandById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}