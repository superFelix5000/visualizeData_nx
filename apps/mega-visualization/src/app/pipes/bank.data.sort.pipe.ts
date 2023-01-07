import { Pipe, PipeTransform } from '@angular/core';
import { BankDataEntry, DataEntrySort, DataEntrySortDirection } from '@finanzor/types';

@Pipe({ name: 'bankDataSort' })
export class BankDataSortPipe implements PipeTransform {
    transform(
        value: BankDataEntry[],
        sort: DataEntrySort,
        sortDirection: DataEntrySortDirection
    ): BankDataEntry[] {
        if (
            sortDirection != null &&
            sortDirection !== DataEntrySortDirection.NONE
        ) {
            switch (sort) {
                case DataEntrySort.amount:
                    return value.sort((a, b) =>
                        this.sortByNumberValue(a, b, sortDirection)
                    );
                case DataEntrySort.recipient:
                    return value.sort((a, b) =>
                        this.sortByRecipient(a, b, sortDirection)
                    );
                case DataEntrySort.date:
                    return value.sort((a, b) =>
                        this.sortByDate(a, b, sortDirection)
                    );
            }
        }
        return value;
    }

    sortByDate(
        a: BankDataEntry,
        b: BankDataEntry,
        direction: DataEntrySortDirection
    ): number {
        const dateA = a.paymentDate;
        const dateB = b.paymentDate;

        if (dateA.year > dateB.year) {
            return direction === DataEntrySortDirection.asc ? 1 : -1;
        }
        if (dateA.year < dateB.year) {
            return direction === DataEntrySortDirection.asc ? -1 : 1;
        }
        if (dateA.month > dateB.month) {
            return direction === DataEntrySortDirection.asc ? 1 : -1;
        }
        if (dateA.month < dateB.month) {
            return direction === DataEntrySortDirection.asc ? -1 : 1;
        }
        if (dateA.day > dateB.day) {
            return direction === DataEntrySortDirection.asc ? 1 : -1;
        }
        if (dateA.day < dateB.day) {
            return direction === DataEntrySortDirection.asc ? -1 : 1;
        }
        return 0;
    }

    sortByNumberValue(
        a: BankDataEntry,
        b: BankDataEntry,
        direction: DataEntrySortDirection
    ): number {
        const numberA = a.amount;
        const numberB = b.amount;
        if (numberA < numberB) {
            return direction === DataEntrySortDirection.asc ? -1 : 1;
        }
        if (numberA > numberB) {
            return direction === DataEntrySortDirection.asc ? 1 : -1;
        }
        return 0;
    }

    sortByRecipient(
        a: BankDataEntry,
        b: BankDataEntry,
        direction: DataEntrySortDirection
    ): number {
        const nameA = a.recipientOrPayer;
        const nameB = b.recipientOrPayer;
        if (nameA < nameB) {
            return direction === DataEntrySortDirection.asc ? -1 : 1;
        }
        if (nameA > nameB) {
            return direction === DataEntrySortDirection.asc ? 1 : -1;
        }

        return 0;
    }
}
