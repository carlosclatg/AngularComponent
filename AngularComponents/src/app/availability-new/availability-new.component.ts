import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AvailabilityService } from '../services/availability-service.service';
import { AvailabilityAdd } from 'src/DTO/availabilityNew/availabilityAdd';

@Component({
  selector: 'availability-new',
  templateUrl: './availability-new.component.html',
  styleUrls: ['./availability-new.component.sass'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AvailabilityNewComponent implements OnInit {

  availAdd:AvailabilityAdd;

  constructor(private availService:AvailabilityService) { }

  ngOnInit() {
    // this.availService.getAvailabilitiesByAccom().subscribe(
    //   res => this.availAdd = res, 
    //   catchError( error => {
    //     return of({results: null});
    //   })
    // )
  }

}
