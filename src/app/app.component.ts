import {Component, OnInit} from '@angular/core';
import {AnimeService} from "./services/animes.service";
import {LoginService} from "./core/authentication/services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'IIMS_FRONTEND';
  showAnime= false;
  routlet= false;

  constructor(private animeService:AnimeService,private authenticationService:LoginService,
              private router:Router) {
    // if (this.authenticationService.verifyLogin()) {
    //   this.router.navigate(['/dashboard']);
    // }else {
    //   this.router.navigate(['/authentication']);
    // }

  }

  ngOnInit(): void {
    this.getAnime()
  }

  getAnime(){
    this.showAnime = true
    this.routlet = false
    this.animeService.getProductDetails().subscribe(res=>{
      this.showAnime = true
      if (res!=null){
        this.showAnime = false
        this.routlet = true
        console.log("res not null")
      }
    })
  }
}
