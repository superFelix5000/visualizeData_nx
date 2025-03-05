import { Pipe, PipeTransform } from '@angular/core';
import { RecipientCategory } from '@finanzor/types';

@Pipe({
    name: 'recipientCategorySort',
    standalone: false
})
export class RecipientCategorySortPipe implements PipeTransform {
    transform(entries: RecipientCategory[]): RecipientCategory[] {
        return entries.sort((a, b) => a.recipient.localeCompare(b.recipient));
    }
}
