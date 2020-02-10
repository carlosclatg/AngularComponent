import { PriceFormatData } from './priceFormatData';

export class PriceFormat{
    priceCalculationMode : string;
    currencyCode : string;
    ratesData : Array<PriceFormatData>;
}