import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:Product[] ,searchsWord: string): Product[] {
    return products.filter(product =>  product.title.toLowerCase().includes(searchsWord.toLowerCase()) )
  }

}
