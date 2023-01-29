import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {faHome, faLaptopHouse, faChartBar, faComment, faShoppingCart, faMoneyBill, faTruck} from '@fortawesome/free-solid-svg-icons';
import {RouterOutlet} from "@angular/router";
import { fader } from './route-animations'

@Component({
  selector: 'app-left-side-nav-bar',
  templateUrl: './left-side-nav-bar.component.html',
  styleUrls: ['./left-side-nav-bar.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('true', style({
      })),
      state('false', style({
        width: '0px',
      })),
      transition('true => false', animate('500ms')),
      transition('false => true', animate('500ms'))
    ]),
    fader
  ]
})
export class LeftSideNavBarComponent implements OnInit {

  faHome= faHome;
  faLaptopHouse= faLaptopHouse;
  faChartBar= faChartBar;
  faComment=faComment
  faShoppingCart=faShoppingCart
  faMoneyBill=faMoneyBill
  faTruck=faTruck


  constructor() { }

  @Input() navState = true;
  title!: string;

  ngOnInit(): void {
  }

  getRouteAnimationData(oulet: RouterOutlet) {
    return oulet && oulet.activatedRouteData && oulet.activatedRouteData['animation'];
  }
}
