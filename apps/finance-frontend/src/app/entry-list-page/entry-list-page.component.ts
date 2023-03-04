import { Component, OnInit } from '@angular/core';
import { BankDataEntry } from '@finanzor/types';
import { Observable } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { BankDataQuery } from '../state/bank.data.query';
import { BankDataService } from '../state/bank.data.service';

@Component({
  selector: 'app-entry-list-page',
  templateUrl: './entry-list-page.component.html',
  styleUrls: ['./entry-list-page.component.scss'],
})
export class EntryListPageComponent implements OnInit {
  entries$: Observable<BankDataEntry[]>;

  constructor(
    private bankDataQuery: BankDataQuery,
    private bankDataService: BankDataService
  ) {}

  ngOnInit(): void {
    this.entries$ = this.bankDataQuery.selectAllFromCurrentBankAccount$;
  }

  onEntryChanged(entry: Partial<BankDataEntry>) {
    this.bankDataService.updateEntry(entry.id, entry);
  }

  onUpload() {
    this.bankDataQuery.selectAllFromCurrentBankAccount$
      .pipe(
        take(1),
        mergeMap((entries) => this.bankDataService.uploadAll(entries))
      )
      .subscribe((obj) => {
        console.log(`data saved? ${JSON.stringify(obj)}`);
      });
  }
}
