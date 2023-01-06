import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Category } from '../shared/categories';
import { MONTHS } from '../shared/constants';
import { BankDataQuery } from '../state/bank.data.query';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
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
