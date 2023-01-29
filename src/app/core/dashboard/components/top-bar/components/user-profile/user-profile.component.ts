import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../../../authentication/services/login.service";
import {CookieService} from "ngx-cookie";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private cookieService: CookieService,
              private router: Router,) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.cookieService.remove('token');
    this.router.navigate(['/authentication']);
  }

}
