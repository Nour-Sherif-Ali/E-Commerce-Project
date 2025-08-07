// components/subcategory-list.component.ts
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SubcategoryService } from '../sub-category.service';
import { SubCategory } from '../sub-category';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-subcategory-list',
  imports: [CommonModule, RouterModule, MatIconModule, MatFormFieldModule, MatChipsModule, MatInputModule],
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SubcategoryListComponent implements OnInit {
  allSubcategories: SubCategory[] = [];
  filteredSubcategories: SubCategory[] = [];
  categorySubcategories: SubCategory[] = [];
  specificSubcategory: SubCategory | null = null;
  loading = false;
  error: string | null = null;

  // Example category ID - replace with your actual category ID
  categoryId = '6407ea3d5bbc6e43516931df';
  // Example subcategory ID - replace with your actual subcategory ID
  subcategoryId = '6407f40db575d3b90bf957fa';

  constructor(private subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
    this.loadAllSubcategories();
    this.loadSubcategoriesByCategory();
    this.loadSpecificSubcategory();
  }

  loadAllSubcategories(): void {
    this.loading = true;
    this.subcategoryService.getAllSubcategories().subscribe({
      next: (response) => {
        this.allSubcategories = response.data;
        this.filteredSubcategories = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load subcategories';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadSubcategoriesByCategory(): void {
    this.subcategoryService.getSubcategoriesByCategory(this.categoryId).subscribe({
      next: (response) => {
        this.categorySubcategories = response.data;
      },
      error: (err) => {
        console.error('Failed to load category subcategories', err);
      }
    });
  }

  loadSpecificSubcategory(): void {
    this.subcategoryService.getSubcategoryById(this.subcategoryId).subscribe({
      next: (response) => {
        this.specificSubcategory = response.data;
      },
      error: (err) => {
        console.error('Failed to load specific subcategory', err);
      }
    });
  }

  filterSubcategories(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredSubcategories = this.allSubcategories.filter(subcat =>
      subcat.name.toLowerCase().includes(filterValue)
    );
  }

  getCategoryName(categoryId: string): string {
    // Assuming categorySubcategories have a category name property or you can map categoryId to name
    // For demonstration, returning categoryId itself or you can implement a proper lookup
    return categoryId;
  }
}