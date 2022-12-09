import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core';
import {
    LegacyPageEvent as PageEvent,
} from '@angular/material/legacy-paginator';
import {
    MatLegacySelectChange as MatSelectChange,
} from '@angular/material/legacy-select';
import { Sort } from '@angular/material/sort';
import { map, Observable } from 'rxjs';
import { SearchPipe } from '../pipes/search.pipe';
import { BankDataEntry } from '../shared/bank-data-entry';
import { Category } from '../shared/categories';
import { DataEntrySort } from '../shared/data-entry-sort';
import { DataEntrySortDirection } from '../shared/data-entry-sort-direction';
import { BankDataQuery } from '../state/bank.data.query';
import { BankDataService } from '../state/bank.data.service';

@Component({
    selector: 'app-entry-list',
    templateUrl: './entry-list.component.html',
    styleUrls: ['./entry-list.component.scss'],
})
export class EntryListComponent implements OnChanges {
    @Input() entries: BankDataEntry[] = [];
    @Output() onEntryChanged = new EventEmitter<Partial<BankDataEntry>>();
    @Output() onUpload = new EventEmitter();

    protected filteredEntries$: Observable<BankDataEntry[]>;
    protected filteredEntriesSearchValue$: Observable<number>;

    protected entryChanged = false;

    protected columnsToDisplay = [
        'date',
        'recipient',
        'amount',
        'event',
        'message',
        'category',
    ];
    protected size = 10;
    protected start = 0;
    protected end: number = this.start + this.size;
    protected sort: DataEntrySort;
    protected sortDirection: DataEntrySortDirection;
    protected categoryType = Category;
    protected searchFieldValue = '';

    constructor(
        private bankDataService: BankDataService,
        private bankDataQuery: BankDataQuery,
        private searchPipe: SearchPipe
    ) {}

    // todo: this is not the best way to do this
    ngOnChanges(): void {
        this.filteredEntries$ = this.searchPipe.transform(this.entries);
        this.filteredEntriesSearchValue$ = this.filteredEntries$.pipe(
            map((entries) => entries.reduce((a, b) => a + b.amount, 0))
        );
    }

    updatePageData(event: PageEvent): void {
        this.size = event.pageSize;
        this.start = event.pageIndex * event.pageSize;
        this.end = this.start + event.pageSize;
    }

    onSortChange(event: Sort): void {
        this.sort = DataEntrySort[event.active as keyof typeof DataEntrySort];
        this.sortDirection =
            DataEntrySortDirection[
                event.direction as keyof typeof DataEntrySortDirection
            ];
    }

    onCategorySelectionChange(
        entry: BankDataEntry,
        event: MatSelectChange
    ): void {
        this.onEntryChanged.emit({ id: entry.id, category: event.value });
        // TODO: move flag to store and have global "sync" button
        this.entryChanged = true;
    }

    onUploadClicked(): void {
        this.onUpload.emit();
        this.entryChanged = false;
    }

    onInputChange(e: string): void {
        this.bankDataService.setSearchQuery(e);
    }

    onSearchClear(): void {
        this.searchFieldValue = '';
        this.bankDataService.setSearchQuery(this.searchFieldValue);
    }
}
