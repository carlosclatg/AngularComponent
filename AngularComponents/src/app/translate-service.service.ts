import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { ComunicationService } from './comunication.service';
import { catchError } from 'rxjs/operators';

//to fullfill every new word to translate.
const i18Codes: Array<string> = ["CONTACT_1", "NAME", "CHAIN", "ADDRESS", "POSTAL_CODE", "PHONE_LONG", 
"EMAIL", "CATEGORY", "BRAND", "CITY", "FAX", "MISCELLANEOUS",
"FAMILY_AND_CHILDREN", "BABY", "CHILD", "TEENAGER", "CHANNEL_MANAGER", "PREPAYMENT", "TARIFF_PLAN", "APPLICATION",
"AMOUNT", "FROM_DATE", "TO_DATE", "REFUNDABLE", "RATES_CALCULATION_BASE", "PRICE_FORMAT", "PERIOD", "CODE", "TAX", "INCLUDED", "CLIENT_PROGRAM",
"TO", "SALES_CONDITION", "TARIFF_PLAN", "CANCELLATION", "PENALTY", "SHARED_AVAILABILITIES", "RATE_ACCESS_CODE_LABEL", "RATE_ACCESS_CODE",
"" ];


@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  data: Map<string, string> = null;

  constructor(private comunicationService: ComunicationService) { 
     this.getAllMessages()
        .subscribe(
          data => { 
            this.data = new Map(Object.entries(data));
          },
        catchError((error => { //always data = null in case there is a mistake
          this.data = null;
          return of({results: null})
        }))
     )
  }

  private getAllMessages() : Observable<Map<string,string>> {
    return this.comunicationService.getAllMessages(i18Codes);
  }

  public getMessageByCode(code: string){
    if(this.data == null) throwError('Error getting literals from DB');
    if(!this.data.get(code)) return "No translation available for " + code;
    return this.data.get(code);
  }
}

