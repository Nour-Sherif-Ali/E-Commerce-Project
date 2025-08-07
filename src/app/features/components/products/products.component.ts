import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Product {
  _id: string;
  title: string;
  description: string;
  imageCover: string;
  images: string[];
  price: number;
  originalPrice?: number;
  discount?: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  brand?: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  stock?: number;
  colors?: string[];
  sizes?: string[];
  material?: string;
  weight?: string;
  dimensions?: string;
}

interface ProductResponse {
  data: Product[];
  results: number;
}

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  activeImageIndex: number = 0;
  viewMode: 'list' | 'details' = 'list';
  activeColor: string = '';
  activeSize: string = '';
  quantity: number = 1;

  private apiUrl = 'https://ecommerce.routemisr.com/api/v1/products';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.viewMode = 'details';
        this.loadProductDetails(params['id']);
      } else {
        this.viewMode = 'list';
        this.loadProducts();
      }
    });
  }

  loadProducts(): void {
    this.isLoading = true;
    this.http.get<ProductResponse>(this.apiUrl).subscribe({
      next: (response) => {
        this.products = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load products. Please try again later.';
        this.isLoading = false;
        console.error('Error loading products:', error);
      }
    });
  }

  loadProductDetails(id: string): void {
    this.isLoading = true;
    this.http.get<{ data: Product }>(`${this.apiUrl}/${id}`).subscribe({
      next: (response) => {
        this.selectedProduct = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load product details. Please try again later.';
        this.isLoading = false;
        console.error('Error loading product:', error);
      }
    });
  }

  changeImage(index: number): void {
    this.activeImageIndex = index;
  }

  navigateToProduct(id: string): void {
    this.router.navigate(['/products', id]);
  }

  navigateToList(): void {
    this.router.navigate(['/products']);
  }

  truncateText(text: string, limit: number = 100): string {
    if (!text) return '';
    if (text.length <= limit) return text;
    return `${text.substr(0, limit)}...`;
  }

  selectColor(color: string): void {
    this.activeColor = color;
  }

  selectSize(size: string): void {
    this.activeSize = size;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  incrementQuantity(): void {
    this.quantity++;
  }

  previousImage(): void {
    if (this.selectedProduct && this.selectedProduct.images.length > 0) {
      this.activeImageIndex = (this.activeImageIndex - 1 + this.selectedProduct.images.length) % this.selectedProduct.images.length;
    }
  }

  nextImage(): void {
    if (this.selectedProduct && this.selectedProduct.images.length > 0) {
      this.activeImageIndex = (this.activeImageIndex + 1) % this.selectedProduct.images.length;
    }
  }

 

  trackByProductId(index: number, product: Product): string {
    return product._id;
  }

  
}
