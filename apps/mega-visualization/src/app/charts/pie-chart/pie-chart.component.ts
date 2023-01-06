import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Chart, registerables } from 'chart.js';
import { CategoryPercentage } from '../../shared/category-percentage';
import { BankDataQuery } from '../../state/bank.data.query';
import { BankDataService } from '../../state/bank.data.service';
import { CategoryColorMap } from '../../shared/category-colors';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
    @ViewChild('canvas', { static: true })
    myCanvas: ElementRef<HTMLCanvasElement>;

    private categoryPercentages: CategoryPercentage[];
    private myChart: Chart;

    constructor(
        private bankDataQuery: BankDataQuery,
        private bankDataService: BankDataService
    ) {
        Chart.register(...registerables);
    }

    ngOnInit(): void {
        this.myChart = new Chart(this.myCanvas.nativeElement.getContext('2d'), {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        data: [],
                        backgroundColor: [],
                        hoverOffset: 4,
                    },
                ],
            },
            options: {
                interaction: {
                    mode: 'index',
                },
                responsive: true,
            },
        });

        this.bankDataQuery.selectAllCategoriesPerSelectedYearAndMonth$
            .pipe(
                map((values) =>
                    values.sort((a, b) =>
                        a.category
                            .toString()
                            .localeCompare(b.category.toString())
                    )
                )
            )
            .subscribe((values) => {
                const labels: string[] = [];
                const colors: string[] = [];
                const dataPoints: number[] = [];
                this.categoryPercentages = [];

                values.map((categoryPercentage) => {
                    this.categoryPercentages.push(categoryPercentage);
                    labels.push(categoryPercentage.category.toString());
                    colors.push(
                        CategoryColorMap.get(categoryPercentage.category)
                    );
                    dataPoints.push(categoryPercentage.totalValue);
                });

                this.myChart.data = {
                    labels: labels,
                    datasets: [
                        {
                            data: dataPoints,
                            backgroundColor: colors,
                            hoverOffset: 4,
                        },
                    ],
                };
                this.myChart.update();
            });
    }

    // TODO: add type for event?
    onChartClick(e) {
        const items = this.myChart.getElementsAtEventForMode(
            e,
            'nearest',
            { intersect: true },
            true
        );
        if (items && items.length === 1) {
            this.bankDataService.setCategory(
                this.categoryPercentages[items[0].index].category
            );
        }
    }
}
