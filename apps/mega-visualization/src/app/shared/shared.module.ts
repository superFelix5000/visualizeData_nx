import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceDataService } from './financeDataService';

@NgModule({
    declarations: [FinanceDataService],
    imports: [CommonModule],
})
export class SharedModule {}
