import { Pipe, PipeTransform } from '@angular/core';
import { SimpleDate } from '../shared/simple-date';

@Pipe({ name: 'printSimpleDate' })
export class PrintSimpleDatePipe implements PipeTransform {
    transform(date: SimpleDate): string {
        return `${date.day.toString()}.${date.month.toString()}.${date.year.toString()}`;
    }
}
