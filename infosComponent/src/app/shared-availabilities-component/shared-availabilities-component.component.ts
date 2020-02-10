import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '../translate-service.service';

@Component({
  selector: 'shared-availabilities-component',
  templateUrl: './shared-availabilities-component.component.html',
  styleUrls: ['./shared-availabilities-component.component.sass']
})
export class SharedAvailabilitiesComponentComponent implements OnInit {


  @Input() sharedAvailList: Map<String, Array<String>>;

  constructor(private translateService: TranslateService) { }

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
