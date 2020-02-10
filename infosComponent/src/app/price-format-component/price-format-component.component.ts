import { Component, OnInit, Input } from '@angular/core';
import { PriceFormat } from 'src/DTO/InfosHotel/priceFormat';
import { TranslateService } from '../translate-service.service';

@Component({
  selector: 'price-format-component',
  templateUrl: './price-format-component.component.html',
  styleUrls: ['./price-format-component.component.sass']
})
export class PriceFormatComponentComponent implements OnInit {

  constructor( private translateService: TranslateService) { }


  @Input() priceFormat : PriceFormat;
  
  ngOnInit() {
  }

  icon: boolean = true;

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
