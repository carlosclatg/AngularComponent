import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '../translate-service.service';

@Component({
  selector: 'prepayment-component',
  templateUrl: './prepayment-component.component.html',
  styleUrls: ['./prepayment-component.component.sass']
})
export class PrepaymentComponentComponent implements OnInit {

  constructor(private translateService: TranslateService) { }

  @Input() prePaymentConditions : Array<any>

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
