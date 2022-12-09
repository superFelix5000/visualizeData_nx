import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { BankDataEntry } from '../shared/bank-data-entry';
import { Injectable } from '@angular/core';
import { YEARS } from '../shared/constants';
import { RecipientCategory } from '../shared/recipient-category';
import { Category } from '../shared/categories';

export interface BankDataState extends EntityState<BankDataEntry, string> {
    selectedYear: number;
    selectedMonth: number;
    recipientCategories: RecipientCategory[];
    selectedCategory: Category;
    searchQuery: string;
}

const initialState: BankDataState = {
    selectedYear: YEARS[YEARS.length - 1],
    recipientCategories: [],
    selectedMonth: null,
    selectedCategory: null,
    searchQuery: '',
};

@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'bankData' })
export class BankDataStore extends EntityStore<BankDataState> {
    constructor() {
        super(initialState);
    }
}
