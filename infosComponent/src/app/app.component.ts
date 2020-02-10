import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    console.log(this.cookieService.getAll())
  }

  constructor (private cookieService: CookieService){}
  title = 'infosComponent';
}
