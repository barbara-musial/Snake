import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fill',
  standalone: true
})
export class FillPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): number[] {
    const indexesArray = []
    for(let i = 0; i < value; i++){
      indexesArray.push(i);
    }
    return indexesArray
  }

}
