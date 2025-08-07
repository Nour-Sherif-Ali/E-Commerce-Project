// src/app/shared/pipes/shorten-id.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenId'
})
export class ShortenIdPipe implements PipeTransform {
  transform(value: string, maxLength: number = 8): string {
    if (!value) return '';
    if (value.length <= maxLength) return value;
    
    const partLength = Math.floor(maxLength / 2);
    return `${value.substring(0, partLength)}...${value.substring(value.length - partLength)}`;
  }
}