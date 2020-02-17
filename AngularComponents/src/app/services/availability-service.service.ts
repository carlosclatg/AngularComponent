import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { AvailabilityAdd } from 'src/DTO/availabilityNew/availabilityAdd';
import { ComunicationService } from '../comunication.service';

@Injectable({
    providedIn: 'root'
  })
export class AvailabilityService {




    constructor(private cookieService: CookieService, private comService:ComunicationService) {}

    public getAvailabilitiesByAccom():Observable<AvailabilityAdd>{ 
        return this.comService.getAvailByAccom();
    }

}