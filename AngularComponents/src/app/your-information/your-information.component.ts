import { Component, OnInit, ViewEncapsulation, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import {InfosHotel} from '../../DTO/InfosHotel/infosHotel'
import { CookieService } from 'ngx-cookie-service';
import { ComunicationService } from '../comunication.service';
// import {ElementRef};

@Component({
  selector: 'your-information',
  templateUrl: './your-information.component.html',
  styleUrls: ['./your-information.component.sass'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class YourInformationComponent implements OnInit {

  public infosHotel: InfosHotel;
  @Output() open = new EventEmitter<any>();



  constructor(el: ElementRef, private cookieService: CookieService, private comunicationService: ComunicationService) { 
    this.infosHotel = JSON.parse(el.nativeElement.getAttribute('infosDTO'));
  }

  emitValue(){
  }

  ngOnInit() {
    this.comunicationService.getTestMessage().subscribe(
      x => console.log(x)
    )
  }

  ngAfterViewInit(){
    this.comunicationService.postTestMessage().subscribe(
      x => console.log(x)
    )

  }

}
