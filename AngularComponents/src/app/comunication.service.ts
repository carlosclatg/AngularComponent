import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {

  private urli18n: string = "i18n.htm"
  private urlAvail: string = "getAvailability.htm";
  private urlPostAvail : string = "postAvailability.htm";
  private urlAvailInitialData: string = "availInitialData.htm"
  private urlAvailpostData: string = "availpostData.htm"
  

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'JSESSIONID:' + this.cookieService.get('JSESSIONID')
    })
  };
 
  constructor(private httpClient: HttpClient, private cookieService: CookieService) {}

  //translator service
  public getAllMessages(i18Codes: String[]) : Observable<Map<string,string>> {
    console.log(this.httpOptions)
    return this.httpClient.post<Map<string, string>>(this.urli18n, i18Codes, this.httpOptions);
  }

  public getTestMessage() : Observable<any>{
    return this.httpClient.get<any>(this.urlAvail, this.httpOptions);
  }


  public postTestMessage() : Observable<any> {
    let tttt =  {
      heeee: 'abcde',
      hola: 'asasasasasa'
    }
    return this.httpClient.post<any>(this.urlPostAvail,tttt ,this.httpOptions)
  }
}
