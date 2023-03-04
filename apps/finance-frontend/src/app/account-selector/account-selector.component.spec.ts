import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSelectorComponent } from './account-selector.component';

describe('AccountSelectorComponent', () => {
    let component: AccountSelectorComponent;
    let fixture: ComponentFixture<AccountSelectorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AccountSelectorComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AccountSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
