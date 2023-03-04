import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    BankDataEntry,
    BankDataFetchServerData,
    Category,
    CategoryMapFetchServerData,
    createBankDataEntry,
    RecipientCategory,
    SimpleDate,
} from '@finanzor/types';
import { NgxCsvParser } from 'ngx-csv-parser';
import { map, Observable } from 'rxjs';
import { BankDataQuery } from './bank.data.query';
import { BankDataStore } from './bank.data.store';

@Injectable({ providedIn: 'root' })
export class BankDataService {
    private readonly baseUrl = 'http://localhost:8000';

    constructor(
        private bankDataStore: BankDataStore,
        private bankDataQuery: BankDataQuery,
        private http: HttpClient,
        private ngxCsvParser: NgxCsvParser
    ) {}

    init(): void {
        this.reloadData();
    }

    setSelectedBankAccount(bankAccount: number): void {
        this.bankDataStore.update(() => ({ selectedBankAccount: bankAccount }));
    }

    setSearchQuery(searchQuery: string): void {
        this.bankDataStore.update(() => ({ searchQuery: searchQuery }));
    }

    setYear(year: number): void {
        this.bankDataStore.update((state) => ({ selectedYear: year }));
    }

    setMonth(month: number): void {
        this.bankDataStore.update((state) => ({ selectedMonth: month }));
    }

    setCategory(category: Category): void {
        this.bankDataStore.update((state) => ({ selectedCategory: category }));
    }

    setRecipientCategories(entries: RecipientCategory[]) {
        this.bankDataStore.update((state) => ({
            recipientCategories: entries,
        }));
    }

    reloadData(): void {
        this.bankDataStore.remove();
        this.bankDataStore.reset();
        this.downloadAll().subscribe((data: BankDataFetchServerData) => {
            this.bankDataStore.add(data.data);
        });
        this.downloadRecipientCategories().subscribe(
            (data: CategoryMapFetchServerData) => {
                this.setRecipientCategories(data.data);
            }
        );
    }

    uploadAll(entries: BankDataEntry[]): Observable<Object> {
        return this.http.post(`${this.baseUrl}/api/v1/saveAll`, entries);
    }

    appendAll(entries: BankDataEntry[]): Observable<Object> {
        return this.http.post(`${this.baseUrl}/api/v1/appendAll`, entries);
    }

    downloadAll(): Observable<BankDataFetchServerData> {
        return this.http.get<BankDataFetchServerData>(
            `${this.baseUrl}/api/v1/fetchAll`
        );
    }

    uploadRecipientCategories(
        entries: RecipientCategory[]
    ): Observable<Object> {
        return this.http.post(
            `${this.baseUrl}/api/v1/saveCategoryMap`,
            entries
        );
    }

    downloadRecipientCategories(): Observable<CategoryMapFetchServerData> {
        return this.http.get<CategoryMapFetchServerData>(
            `${this.baseUrl}/api/v1/fetchCategoryMap`
        );
    }

    //ALT: 29.04.2022	29.04.2022	29.04.2022	3225,62	SITOWISE OY			Pano		T20220426-133295	Palkka kaudelta 4/2022 		E
    //NEU: 2022/08/01;-12,39;FI52 1012 3500 3547 31;;;ADOBE PHOTOGPHY PLAN;;EUR
    //NEU:
    /*
        0 Kirjauspäivä;
        1 Määrä;
        2 Maksaja;
        3 Maksunsaaja;
        4 Nimi;
        5 Otsikko;
        6 Viitenumero;
        7 Valuutta
    */
    readBankDataEntriesFromData(data: string): Observable<BankDataEntry[]> {
        const bankDataEntries: BankDataEntry[] = [];
        const entries: any[][] = this.ngxCsvParser.csvStringToArray(data, ';');
        return this.bankDataQuery.selectCurrentBankAccount$.pipe(
            map((bankAccountId) => {
                entries
                    .filter((entry) => entry.length > 3)
                    .forEach((entry) => {
                        bankDataEntries.push(
                            createBankDataEntry(
                                this.convertStringToDate(entry[0]), //postingdate
                                bankAccountId,
                                this.convertStringToDate(entry[0]), // valuedate
                                this.convertStringToDate(entry[0]), // paymentdate
                                parseFloat(entry[1].replace(',', '.')), // amount
                                (entry[5] as string).toLowerCase(), // recipientorpayer
                                entry[2], //accountnumber
                                0, // entry[6], // bic
                                '', //entry[7], // event
                                '', //entry[8], // reference
                                '', //entry[9], // payerreference
                                '', //entry[10], // message
                                0, //entry[11], // cardnumber
                                '' //entry[12] // receipt
                            )
                        );
                    });
                return bankDataEntries;
            })
        );
    }

    updateEntry(id: string, entry: Partial<BankDataEntry>): void {
        this.bankDataStore.update(id, entry);
    }

    private convertStringToDate(stringDate: string): SimpleDate {
        const day = parseInt(stringDate.substring(8, 10));
        const month = parseInt(stringDate.substring(5, 7));
        const year = parseInt(stringDate.substring(0, 4));
        return new SimpleDate(day, month, year);
    }
}
