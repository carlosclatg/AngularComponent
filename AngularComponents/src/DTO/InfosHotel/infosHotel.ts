import { SalesConditions } from './salesConditions';
import { PriceFormatComponentComponent } from 'src/app/price-format-component/price-format-component.component';
import { PriceFormat } from './priceFormat';
import { Chambres } from "./chambres";

export class InfosHotel {
	allowRemunerationView: boolean;
	//static final long serialVersionUID = -4281940308335317171L;
	/*Contact Details*/
	accomName : String;
	accomStars: number;
	address1: String;
	address2 : String;
	zip: String;
	city: String;
	faxIndicatifForDirectBooking: number;
	faxForDirectBooking: String;
	formattedMailAddress: String;
	/*Sales Conditions*/
	salesConditions : Array<SalesConditions>;
	/*Prepayment*/
    prePaymentConditions: Array<any>;
	/*Price format*/
	priceFormat: PriceFormat;
	/*Miscellanous*/
	infantMaxAgeExcluded : number;
	childMaxAgeExcluded : number;
	teenagerMaxAgeExcluded : number;
	/*Shared availabilities*/
	sharedAvailList: any;

	/**Chambres */
	chambres: Array<Chambres>

     
}