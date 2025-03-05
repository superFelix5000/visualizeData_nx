import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import {
    Category,
    CategoryMapSendServerResponse,
    DataEntrySortDirection,
    RecipientCategory,
} from '@finanzor/types';
import { filter, take } from 'rxjs/operators';
import { BankDataQuery } from '../state/bank.data.query';
import { BankDataService } from '../state/bank.data.service';

@Component({
    selector: 'app-entry-category-list',
    templateUrl: './entry-category-list.component.html',
    styleUrls: ['./entry-category-list.component.scss'],
    standalone: false
})
export class EntryCategoryListComponent implements OnInit {
    entryChanged = false;
    entries: RecipientCategory[] = [];

    sortDirection: DataEntrySortDirection;
    columnsToDisplay = ['recipient', 'category'];
    size = 10;
    start = 0;
    end: number = this.start + this.size;
    categoryType = Category;

    constructor(
        private bankDataService: BankDataService,
        private bankDataQuery: BankDataQuery
    ) {}

    ngOnInit(): void {
        this.bankDataQuery.selectRecipientCategories$
            .pipe(
                filter((entries) => entries.length > 0),
                take(1)
            )
            .subscribe((entries) => {
                this.entries = entries;
            });
    }

    updatePageData(event: PageEvent): void {
        this.size = event.pageSize;
        this.start = event.pageIndex * event.pageSize;
        this.end = this.start + event.pageSize;
    }

    onCategorySelectionChange(
        changedEntry: RecipientCategory,
        event: MatSelectChange
    ): void {
        // TODO: update entry to the store?
        this.entries = this.entries.map((entry) => {
            if (entry.recipient === changedEntry.recipient) {
                return {
                    recipient: entry.recipient,
                    category: event.value,
                };
            } else {
                return entry;
            }
        });

        this.entryChanged = true;
    }

    onSave() {
        this.bankDataService
            .uploadRecipientCategories(this.entries)
            .subscribe((response: CategoryMapSendServerResponse) => {
                // TODO: this could be done also somewhere else? Maybe in service if using ngRx
                if (response.success) {
                    this.bankDataService.setRecipientCategories(this.entries);
                }
            });
        this.entryChanged = false;
    }

    onMerge() {
        this.bankDataQuery
            .selectAll()
            .pipe(take(1))
            .subscribe((entries) => {
                for (const entry of entries) {
                    if (
                        !this.entries.find(
                            (localEntry) =>
                                localEntry.recipient === entry.recipientOrPayer
                        ) &&
                        entry.category === Category.OTHER
                    ) {
                        this.entries = [
                            ...this.entries,
                            {
                                category: Category.OTHER,
                                recipient: entry.recipientOrPayer,
                            },
                        ];
                        this.entryChanged = true;
                    }
                }
            });
    }
}
