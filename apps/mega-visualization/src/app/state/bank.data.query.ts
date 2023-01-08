import { QueryEntity } from '@datorama/akita';
import { combineLatest, Observable } from 'rxjs';
import { BankDataState, BankDataStore } from './bank.data.store';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
    BankDataEntry,
    Category,
    CategoryPercentage,
    RecipientCategory,
    YEARS,
    YearTotals,
} from '@finanzor/types';

@Injectable({
    providedIn: 'root',
})
export class BankDataQuery extends QueryEntity<BankDataState> {
    constructor(protected override store: BankDataStore) {
        super(store);
    }

    selectSearchQuery$: Observable<string> = this.select(
        (state) => state.searchQuery
    );

    selectCurrentBankAccount$: Observable<number> = this.select(
        (state) => state.selectedBankAccount
    );

    selectCurrentYear$: Observable<number> = this.select(
        (state) => state.selectedYear
    );

    selectCurrentMonth$: Observable<number> = this.select(
        (state) => state.selectedMonth
    );

    selectCurrentCategory$: Observable<Category> = this.select(
        (state) => state.selectedCategory
    );

    selectRecipientCategories$: Observable<RecipientCategory[]> = this.select(
        (state) => state.recipientCategories
    );

    selectAllFromCurrentBankAccount$: Observable<BankDataEntry[]> =
        combineLatest([this.selectAll(), this.selectCurrentBankAccount$]).pipe(
            map(([entries, bankAccountId]) =>
                entries.filter((entry) => entry.bankaccountid === bankAccountId)
            )
        );

    /**
     * @returns the month values for the currently selected year
     */
    selectCurrentMonthValues$: Observable<number[]> = combineLatest([
        this.selectAllFromCurrentBankAccount$,
        this.selectCurrentYear$,
    ]).pipe(map(([entries, year]) => this.getMonthValues(entries, year)));

    /**
     * @returns the total balance of each year, separated in plus and minus
     */
    selectYearTotals$: Observable<YearTotals[]> =
        this.selectAllFromCurrentBankAccount$.pipe(
            map((entries) =>
                YEARS.map((year) => {
                    const plus = entries
                        .filter((entry) => entry.paymentDate.year === year)
                        .filter((entry) => entry.amount > 0)
                        .map((entry) => entry.amount)
                        .reduce((a, b) => a + b, 0);
                    const minus = entries
                        .filter((entry) => entry.paymentDate.year === year)
                        .filter((entry) => entry.amount <= 0)
                        .map((entry) => entry.amount)
                        .reduce((a, b) => a + b, 0);
                    return { plus, minus };
                })
            )
        );

    private getMonthValues(entries: BankDataEntry[], year: number): number[] {
        const returnArray: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < 12; i++) {
            returnArray[i] = entries
                .filter((entry) => entry.paymentDate.year === year)
                .filter((entry) => entry.paymentDate.month === i + 1)
                .map((entry) => entry.amount)
                .reduce((a, b) => a + b, 0);
        }
        return returnArray;
    }

    /**
     * select all entries and fill in their categories from the recipient category map IF available
     */
    selectAllEntriesWithMatchedCategories$: Observable<BankDataEntry[]> =
        combineLatest([
            this.selectAllFromCurrentBankAccount$,
            this.selectRecipientCategories$,
        ]).pipe(
            map(([entries, recipentCategories]) => {
                const rcMap: Map<string, Category> = new Map<
                    string,
                    Category
                >();
                recipentCategories.forEach((rc) =>
                    rcMap.set(rc.recipient, rc.category)
                );

                return entries.map((entry) => {
                    const category =
                        entry.category !== Category.OTHER
                            ? entry.category
                            : rcMap.has(entry.recipientOrPayer)
                            ? rcMap.get(entry.recipientOrPayer)
                            : Category.OTHER;
                    return {
                        ...entry,
                        category,
                    };
                });
            })
        );

    selectAllEntriesPerSelectedYear$: Observable<BankDataEntry[]> =
        combineLatest([
            this.selectAllEntriesWithMatchedCategories$,
            this.selectCurrentYear$,
        ]).pipe(
            map(([entries, year]) =>
                entries.filter((entries) => entries.paymentDate.year === year)
            )
        );

    selectAllEntriesPerSelectedYearAndMonth$: Observable<BankDataEntry[]> =
        combineLatest([
            this.selectAllEntriesWithMatchedCategories$,
            this.selectCurrentYear$,
            this.selectCurrentMonth$,
        ]).pipe(
            map(([entries, year, month]) =>
                entries
                    .filter((entry) => entry.paymentDate.year === year)
                    .filter((entry) =>
                        month != null ? entry.paymentDate.month === month : true
                    )
            )
        );

    selectAllEntriesPerSelectedYearAndMonthAndCategory$: Observable<
        BankDataEntry[]
    > = combineLatest([
        this.selectAllEntriesPerSelectedYearAndMonth$,
        this.selectCurrentCategory$,
    ]).pipe(
        map(([entries, category]) =>
            entries.filter((entry) =>
                category != null ? entry.category === category : true
            )
        )
    );

    /**
     * @returns the total amount for the selected year that I payed
     */
    selectTotalPaymentAmountForSelectedYear$: Observable<number> =
        this.selectAllEntriesPerSelectedYearAndMonth$.pipe(
            map((entries) => entries.filter((entry) => entry.amount < 0)),
            map((entries) => entries.reduce((a, b) => a + b.amount, 0))
        );

    // TODO: refactor this - now this is getting called multiple times because of calculation logic
    /**
     * @returns all the categories for the selected year and their percentage of the total amount to pay
     */
    selectAllCategoriesPerSelectedYearAndMonth$: Observable<
        CategoryPercentage[]
    > = combineLatest([
        this.selectTotalPaymentAmountForSelectedYear$,
        this.selectAllEntriesPerSelectedYearAndMonth$,
    ]).pipe(
        map(([totalYearAmount, yearEntries]) =>
            this.getCategoryValues(yearEntries, totalYearAmount)
        )
    );

    private getCategoryValues(
        entries: BankDataEntry[],
        totalYearAmount: number
    ): CategoryPercentage[] {
        const categoryPercentages: CategoryPercentage[] = [];
        for (const cat in Category) {
            const category = Category[cat];
            const totalCategoryAmount = entries
                .filter((entry) => entry.amount < 0)
                .filter((entry) => entry.category === category)
                .reduce((a, b) => a + Math.abs(b.amount), 0);
            if (totalCategoryAmount > 0) {
                categoryPercentages.push({
                    category,
                    percentage: totalCategoryAmount / Math.abs(totalYearAmount),
                    totalValue: totalCategoryAmount,
                });
            }
        }
        return categoryPercentages;
    }
}
