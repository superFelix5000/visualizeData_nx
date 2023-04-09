import { Component, OnInit } from '@angular/core';
import { Category, MONTHS } from '@finanzor/types';
import { map, Observable, of } from 'rxjs';
import { BankDataQuery } from '../state/bank.data.query';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent implements OnInit {
    protected currentYear$: Observable<number> = of(0);
    protected currentMonth$: Observable<string> = of(null);
    protected currentCategory$: Observable<Category> = of(null);

    constructor(private bankDataQuery: BankDataQuery) {}

    ngOnInit(): void {
        this.currentYear$ = this.bankDataQuery.selectCurrentYear$;
        this.currentMonth$ = this.bankDataQuery.selectCurrentMonth$.pipe(
            map((monthNumber) => MONTHS[monthNumber - 1])
        );
        this.currentCategory$ = this.bankDataQuery.selectCurrentCategory$;
    }
}
