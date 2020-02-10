import { Component, OnInit, Input } from '@angular/core';
import { Chambres } from "src/DTO/InfosHotel/chambres";
import { TranslateService } from '../translate-service.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.sass']
})
export class RoomsComponent implements OnInit {

  @Input() chambres : Array<Chambres>;

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
  }

  icon: boolean = true;

  click(){
      this.icon = !this.icon;
  }

  translate(code: string): string {
    try {
      return code;
      //return this.translateService.getMessageByCode(code); 
    } catch (error) {
      return "Error while retrieving literals from DB";
    }
  }

}
