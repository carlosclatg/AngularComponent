import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { AvailabilityNewGet } from 'src/DTO/availabilityNew/availabilityNewGet';
import { ComunicationService } from '../comunication.service';
import { AvailabilityAddPostDTO } from 'src/DTO/availabilityNew/AvailabilityAddPostDTO';

@Injectable({
    providedIn: 'root'
})
export class AvailabilityService {




    constructor(private cookieService: CookieService, private comService:ComunicationService) {}

    public getAvailabilitiesByAccom():Observable<AvailabilityNewGet>{ 
        return this.comService.getAvailByAccom();
    }

    public saveOrUpdateAvailabilitiesAdd(availabilityAddPostDTO:AvailabilityAddPostDTO):Observable<any>{
        return this.comService.saveOrUpdateAvailabilitiesAdd(availabilityAddPostDTO);
    }

}