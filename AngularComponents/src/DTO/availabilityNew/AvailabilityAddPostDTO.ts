import { AvailabilityRow } from './availabilityRow';
import { PeriodFromTo } from './periodFromTo';
import { RequestPossibleRow } from './requestPossibleRow';
import { AvailabilityRowsByRoomType } from './availabilityRowsByRoomType';

export class AvailabilityAddPostDTO{
    periodsFromTo:Array<PeriodFromTo> = new Array<PeriodFromTo>();
    typeOfLoad:string;
    requestPossibles:Array<RequestPossibleRow>;
    availabilityRows:Array<AvailabilityRow>;
    availabilityRowsByRoomTypes:Array<AvailabilityRowsByRoomType>;

    constructor(typeOfLoad:string,periodsFromTo:Array<PeriodFromTo>,availabilityRows:Array<AvailabilityRow>){
        this.typeOfLoad = typeOfLoad;
        this.periodsFromTo=periodsFromTo;
        this.availabilityRows = availabilityRows;
    }
}