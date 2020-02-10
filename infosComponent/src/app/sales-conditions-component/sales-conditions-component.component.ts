import { Component, OnInit, Input } from '@angular/core';
import { SalesConditions } from 'src/DTO/InfosHotel/salesConditions';
import { TranslateService } from '../translate-service.service';

@Component({
  selector: 'sales-conditions-component',
  templateUrl: './sales-conditions-component.component.html',
  styleUrls: ['./sales-conditions-component.component.sass']
})
export class SalesConditionsComponentComponent implements OnInit {

  constructor(private translateService: TranslateService) { }


  @Input() salesConditions : Array<SalesConditions>;


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
