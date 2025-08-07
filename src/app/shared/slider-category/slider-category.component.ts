import { Component, inject, Input } from '@angular/core';
import { ProductsService } from '../../products.service';
import { Category } from '../../product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-slider-category',
  imports: [CarouselModule],
templateUrl: './slider-category.component.html',
  styleUrl: './slider-category.component.scss'
})
export class SliderCategoryComponent {
  @Input() categories!: Category[];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }

    },
    nav: true
  }

_ProductsService = inject(ProductsService);
ngOnInit():void {
  console.log(this.categories);
}
}
