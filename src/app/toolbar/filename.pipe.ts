import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filename',
  standalone: true
})
export class FilenamePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    const parts = value.split('/');
    const fileName = parts[parts.length - 1];
    const fileNameParts = fileName.split('.');
    return fileNameParts[0];
  }
}