import {Component, OnInit, ViewChild} from '@angular/core';
import {StaticsService} from "../../services/statics.service";
import {ChartData, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-sub-statics',
  templateUrl: './sub-statics.component.html',
  styleUrls: ['./sub-statics.component.scss']
})
export class SubStaticsComponent implements OnInit {

  percent = 0;
  Allproducts=0;
  PNatural = 0;
  PChemical = 0;
  PBoth = 0;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(private substaticsservice:StaticsService) { }

  ngOnInit(): void {
    this.getDaughnutTypes()
  }

  public doughnutChartLabels: string[] = ['All-Products', 'Ordered-Products', 'Shipped-Products'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [350, 450, 100],
        backgroundColor: [
          'rgba(20, 80, 219,0.6)',
          'rgba(52, 152, 219,0.6)',
          'rgba(0, 17, 60,0.6)'
        ],
        hoverBackgroundColor:[
          'rgba(52, 152, 219,1)',
        ],
        hoverBorderColor:[
          'rgba(0, 17, 60,0.6)'
        ]
      },

    ]
  };
  public doughnutChartType: ChartType = "doughnut";


  // events
  public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  getDaughnutTypes(){
    this.substaticsservice.Daughpercntage().subscribe(res=>{
      console.log(res)
      this.percent = res.productCount
      this.Allproducts = res.productCount
      this.PNatural = res.productCount
      this.PChemical = res.productCount
      this.PBoth = res.productCount
      this.doughnutChartData.datasets[0].data = [res.productCount, res.productCount, res.productCount];
      this.chart?.update();
    })
  }

}
