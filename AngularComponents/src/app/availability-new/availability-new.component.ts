import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AvailabilityService } from '../services/availability-service.service';
import { AvailabilityNewGet } from 'src/DTO/availabilityNew/availabilityNewGet';
import { catchError, map, first } from 'rxjs/operators';
import { of, Observable, forkJoin } from 'rxjs';
import { AvailabilityAddPostDTO } from 'src/DTO/availabilityNew/AvailabilityAddPostDTO';
import { PeriodFromTo } from 'src/DTO/availabilityNew/periodFromTo';

@Component({
  selector: 'availability-new',
  templateUrl: './availability-new.component.html',
  styleUrls: ['./availability-new.component.sass'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AvailabilityNewComponent implements OnInit {

  availAdd:AvailabilityNewGet;
  availabilityAddPostDTO: AvailabilityAddPostDTO;
  any:any;
  any2:any;
  constructor(private availService:AvailabilityService) { }

  ngOnInit() {
    this.any = forkJoin(this.availService.saveOrUpdateAvailabilitiesAdd(new AvailabilityAddPostDTO("room",new PeriodFromTo("testFrom","testTo"))),
    this.availService.getAvailabilitiesByAccom()).subscribe(([res1, res2]) => {
      console.log(res1);
      this.availAdd = res2;
      });
      
    // this.availService.getAvailabilitiesByAccom().subscribe(
    //   res => this.availAdd = res, 
    //   catchError( error => {
    //     console.log(error);
    //     return of({results: null});
    //   })
    // )
    // this.availService.saveOrUpdateAvailabilitiesAdd(new AvailabilityAddPostDTO("room",new PeriodFromTo("testFrom","testTo"))).subscribe(
    //   res => console.log(res),
    // )
  }

  ngAfterViewChecked(){
    if(this.any != undefined && this.any2 != undefined){
      // console.log("this.availAdd: "+this.availAdd);
      // console.log("test: "+this.availAdd.inventoryOfPrograms[0].accomClientProgamId)
      console.log(this.any);
      console.log(this.any2);
    }
  }

}
