import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { VisualizationComponent } from './visualization-page/visualization/visualization.component';
import { AppRoutingModule } from './routing/routing.module';
import { LandingPageComponent } from './landing-page/landing-page/landing-page.component';
import { EntryListPageComponent } from './entry-list-page/entry-list-page.component';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatSortModule } from '@angular/material/sort';
import { BankDataSortPipe } from './pipes/bank.data.sort.pipe';
import { UploadComponent } from './upload-page/upload-component/upload.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { PrintSimpleDatePipe } from './pipes/print.simple.date.pipe';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { EntryCategoryListComponent } from './entry-category-list/entry-category-list.component';
import { RecipientCategorySortPipe } from './pipes/recipient.category.sort.pipe';
import { StackedComponent } from './charts/stacked/stacked.component';
import { YearBarchartComponent } from './charts/year-barchart/year-barchart.component';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
    declarations: [
        AppComponent,
        VisualizationComponent,
        LandingPageComponent,
        EntryListComponent,
        EntryCategoryListComponent,
        EntryListPageComponent,
        BankDataSortPipe,
        SearchPipe,
        PrintSimpleDatePipe,
        UploadComponent,
        PieChartComponent,
        RecipientCategorySortPipe,
        StackedComponent,
        YearBarchartComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgxCsvParserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatButtonModule,
        MatTabsModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        MatInputModule,
        environment.production ? [] : AkitaNgDevtools.forRoot(),
    ],
    providers: [SearchPipe],
    bootstrap: [AppComponent],
})
export class AppModule {}
