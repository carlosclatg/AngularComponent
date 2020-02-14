import { BrowserModule } from '@angular/platform-browser';
import { Injector,NgModule } from '@angular/core';
import {createCustomElement} from '@angular/elements'
import {MatExpansionModule,MatIconModule,MatTooltipModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { YourInformationComponent } from './your-information/your-information.component';
import { ContactDetailsComponentComponent } from './contact-details-component/contact-details-component.component';
import { SalesConditionsComponentComponent } from './sales-conditions-component/sales-conditions-component.component';
import { PrepaymentComponentComponent } from './prepayment-component/prepayment-component.component';
import { PriceFormatComponentComponent } from './price-format-component/price-format-component.component';
import { MiscellanousComponentComponent } from './miscellanous-component/miscellanous-component.component';
import { SharedAvailabilitiesComponentComponent } from './shared-availabilities-component/shared-availabilities-component.component';
import { GlobalHttpInterceptorService } from './global-http-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { RoomsComponent } from './rooms/rooms.component';
import { AvailabilityNewComponent } from './availability-new/availability-new.component';

@NgModule({
  declarations: [
    AppComponent,
    YourInformationComponent,
    ContactDetailsComponentComponent,
    SalesConditionsComponentComponent,
    PrepaymentComponentComponent,
    PriceFormatComponentComponent,
    MiscellanousComponentComponent,
    SharedAvailabilitiesComponentComponent,
    RoomsComponent,
    AvailabilityNewComponent
  ],
  imports: [
    BrowserModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTooltipModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true  },
    CookieService 
  ],
  entryComponents: [YourInformationComponent]
})
export class AppModule { 
  constructor(private injector: Injector){}

  ngDoBootstrap(){
    const customElement= createCustomElement(YourInformationComponent,{injector:this.injector});
    customElements.define('your-information',customElement);
  }
}
