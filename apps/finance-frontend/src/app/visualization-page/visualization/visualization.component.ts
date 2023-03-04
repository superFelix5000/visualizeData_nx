import { Component, OnInit } from '@angular/core';
import { BankDataEntry, YEARS, YearTotals } from '@finanzor/types';
import { Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { BankDataQuery } from '../../state/bank.data.query';
import { BankDataService } from '../../state/bank.data.service';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss'],
})
export class VisualizationComponent implements OnInit {
    years = YEARS;

    // TODO: not used atm
    selectedYear$: Observable<number>;

    yearTotals$: Observable<YearTotals[]> = of([]);
    filteredBankDataEntries$: Observable<BankDataEntry[]>;

    constructor(
        private bankDataQuery: BankDataQuery,
        private bankDataService: BankDataService
    ) {}

    ngOnInit(): void {
        this.bankDataService.init();

        this.yearTotals$ = this.bankDataQuery.selectYearTotals$;
        this.selectedYear$ = this.bankDataQuery.selectCurrentYear$;
        this.filteredBankDataEntries$ =
            this.bankDataQuery.selectAllEntriesPerSelectedYearAndMonthAndCategory$;
    }

    onYearSelectionChange(year: number): void {
        this.bankDataService.setYear(year);
        this.bankDataService.setMonth(null);
        this.bankDataService.setCategory(null);
    }

    reloadData(): void {
        this.bankDataService.reloadData();
    }

    // TODO: type for ev
    nodeClicked(ev): void {
        this.bankDataService.setMonth(ev.nodeindex + 1);
        this.bankDataService.setCategory(null);
    }

    onEntryChanged(entry: Partial<BankDataEntry>) {
        this.bankDataService.updateEntry(entry.id, entry);
    }

    onUpload() {
        this.bankDataQuery
            .selectAll()
            .pipe(
                take(1),
                mergeMap((entries) => this.bankDataService.uploadAll(entries))
            )
            .subscribe((obj) => {
                console.log(`data saved? ${JSON.stringify(obj)}`);
            });
    }
}
