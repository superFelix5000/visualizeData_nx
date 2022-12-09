import { Pipe, PipeTransform } from '@angular/core';
import { RecipientCategory } from '../shared/recipient-category';

@Pipe({ name: 'recipientCategorySort' })
export class RecipientCategorySortPipe implements PipeTransform {
    transform(entries: RecipientCategory[]): RecipientCategory[] {
        return entries.sort((a, b) => a.recipient.localeCompare(b.recipient));
    }
}
