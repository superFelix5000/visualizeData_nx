import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { BankDataEntry, Category, RecipientCategory, YEARS } from '@finanzor/types';

export interface BankDataState extends EntityState<BankDataEntry, string> {
    selectedYear: number;
    selectedMonth: number;
    recipientCategories: RecipientCategory[];
    selectedCategory: Category;
    searchQuery: string;
    selectedBankAccount: number;
}

const initialState: BankDataState = {
    selectedYear: YEARS[YEARS.length - 1],
    recipientCategories: [],
    selectedMonth: null,
    selectedCategory: null,
    searchQuery: '',
    selectedBankAccount: 1,
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
