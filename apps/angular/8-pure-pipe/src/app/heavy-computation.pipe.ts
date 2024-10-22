import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appHeavyComputation',
  standalone: true,
})
export class HeavyComputationPipe implements PipeTransform {
  transform(name: string, index: number): unknown {
    return `${name} - ${index}`;
  }
}
