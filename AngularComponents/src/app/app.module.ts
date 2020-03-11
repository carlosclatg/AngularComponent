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
import { DatesLoaderComponent } from './availability-new/dates-loader/dates-loader.component';
import { RequestPossibleTableComponent } from './availability-new/request-possible-table/request-possible-table.component';
import { ClientProgramAvailComponent } from './availability-new/client-program-avail/client-program-avail.component';
import { ModalComponent } from './availability-new/modal-avail/modal-avail.component';
import { MaterialModule } from 'material.module';
import { ModalService } from './services/modal.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAvailFormComponent } from './availability-new/create-avail/create-avail-form.component';

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
    AvailabilityNewComponent,
    DatesLoaderComponent,
    RequestPossibleTableComponent,
    ClientProgramAvailComponent,
    ModalComponent,
    CreateAvailFormComponent
  ],
  imports: [
    BrowserModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTooltipModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true  },
    CookieService,
    ModalService
  ],
  entryComponents: [YourInformationComponent,
  AvailabilityNewComponent,
ModalComponent,
CreateAvailFormComponent]
})
export class AppModule { 
  constructor(private injector: Injector){}

  ngDoBootstrap(){
    const customElement= createCustomElement(AvailabilityNewComponent,{injector:this.injector});
    customElements.define('availability-new',customElement);
  }
}
