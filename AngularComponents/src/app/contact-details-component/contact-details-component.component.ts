import { Component, OnInit, Input } from '@angular/core';
import {MatExpansionModule,MatIconModule} from '@angular/material'; 
import { TranslateService } from '../translate-service.service';

@Component({
  selector: 'contact-details-component',
  templateUrl: './contact-details-component.component.html',
  styleUrls: ['./contact-details-component.component.sass']
})
export class ContactDetailsComponentComponent implements OnInit{

  constructor(private translateService: TranslateService) { }

  @Input() accomName : String;
  @Input() accomStars: number;
  @Input() address1: String;
  @Input() address2 : String;
  @Input() zip: String;
  @Input() city: String;
  @Input() faxIndicatifForDirectBooking: number;
  @Input() faxForDirectBooking: String;
  @Input() formattedMailAddress: String;

  icon: boolean = false;
  
  ngOnInit(){
  }

  click(){
    this.icon = !this.icon;
  }

  translate(code: string): string {
    try {
      return this.translateService.getMessageByCode(code); 
    } catch (error) {
      return "Error while retrieving literals from DB"
    }
  }


}
