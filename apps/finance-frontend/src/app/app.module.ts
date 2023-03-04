import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './routing/routing.module';
import { LandingPageComponent } from './landing-page/landing-page/landing-page.component';
import { EntryListPageComponent } from './entry-list-page/entry-list-page.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
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
import { AccountSelectorComponent } from './account-selector/account-selector.component';
import { YearsChartComponent } from './charts/years-chart/years-chart.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { VisualizationComponent } from './visualization-page/visualization/visualization.component';

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
    AccountSelectorComponent,
    YearsChartComponent,
    BreadcrumbsComponent,
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
