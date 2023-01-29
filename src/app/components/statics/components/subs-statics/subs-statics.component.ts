import {Component, OnInit, ViewChild} from '@angular/core';
import {StaticsService} from "../../services/statics.service";
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-subs-statics',
  templateUrl: './subs-statics.component.html',
  styleUrls: ['./subs-statics.component.scss']
})
export class SubsStaticsComponent implements OnInit {

  AllFarmers=0;

  Fnatural = 0;
  FChemical = 0;
  FBoth = 0;


  constructor(private substaticsservice:StaticsService) {
  }

  ngOnInit(): void {
    this.getBarTypes()
  }


  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 1,
        max:100
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }

  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'>  = {
    labels: [ 'Organic', 'Chemical', 'Both' ],
    datasets: [
      { data: [ 20, 20, 20], label: 'Item Usage ', backgroundColor: ['rgba(20, 80, 219,0.6)','rgba(52, 152, 219,0.6)',], hoverBackgroundColor:['rgba(0, 17, 60,1)',]}
    ]
  };

  getBarTypes(){
    this.substaticsservice.Barpercentage().subscribe(res=>{
      console.log(res)

      this.Fnatural = res.productCount
      this.FChemical = res.productCount
      this.FBoth = res.productCount
      this.AllFarmers = res.productCount
      this.barChartData.datasets[0].data = [res.productCount, res.productCount, res.productCount];
      this.chart?.update();
    })

  }

}
