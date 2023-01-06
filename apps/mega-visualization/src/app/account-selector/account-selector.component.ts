import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Observable } from 'rxjs';
import { BankDataQuery } from '../state/bank.data.query';
import { BankDataService } from '../state/bank.data.service';

@Component({
  selector: 'app-account-selector',
  templateUrl: './account-selector.component.html',
  styleUrls: ['./account-selector.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountSelectorComponent implements OnInit {
    selectedBankAccount$: Observable<number>;

    constructor(
        private bankDataQuery: BankDataQuery,
        private bankDataService: BankDataService
    ) {}

    ngOnInit(): void {
        this.selectedBankAccount$ =
            this.bankDataQuery.selectCurrentBankAccount$;
    }

    onSelectionChange(event: MatSelectChange) {
        this.bankDataService.setSelectedBankAccount(event.value);
    }
}
