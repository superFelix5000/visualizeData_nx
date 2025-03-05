import { Pipe, PipeTransform } from '@angular/core';
import { SimpleDate } from '@finanzor/types';

@Pipe({
    name: 'printSimpleDate',
    standalone: false
})
export class PrintSimpleDatePipe implements PipeTransform {
    transform(date: SimpleDate): string {
        return `${date.day.toString()}.${date.month.toString()}.${date.year.toString()}`;
    }
}
