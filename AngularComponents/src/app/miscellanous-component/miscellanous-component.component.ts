import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '../translate-service.service';

@Component({
  selector: 'miscellanous-component',
  templateUrl: './miscellanous-component.component.html',
  styleUrls: ['./miscellanous-component.component.sass']
})
export class MiscellanousComponentComponent implements OnInit {

  constructor(private translateService: TranslateService) { }

  @Input() infantMaxAgeExcluded : number;
	@Input() childMaxAgeExcluded : number;
	@Input() teenagerMaxAgeExcluded : number;

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
