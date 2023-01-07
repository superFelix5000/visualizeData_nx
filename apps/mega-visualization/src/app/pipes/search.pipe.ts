import { Pipe, PipeTransform } from '@angular/core';
import { BankDataEntry } from '@finanzor/types';
import { map, Observable } from 'rxjs';
import { BankDataQuery } from '../state/bank.data.query';

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
    constructor(private bankdataQuery: BankDataQuery) {}

    transform(values: BankDataEntry[]): Observable<BankDataEntry[]> {
        return this.bankdataQuery.selectSearchQuery$.pipe(
            map((query) => {
                if (query != null && query.length !== 0) {
                    const returnValues = values.filter((value) =>
                        value.recipientOrPayer
                            .toLowerCase()
                            .includes(query.toLowerCase())
                    );
                    return returnValues;
                } else {
                    return values;
                }
            })
        );
    }
}
