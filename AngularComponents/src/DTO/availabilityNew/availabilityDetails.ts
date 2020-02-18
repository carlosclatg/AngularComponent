import { ReleaseRestriction } from './releaseRestriction';

export class AvailabilityDetails {
    weekDays:string;
    inventoryType:string;
    stock:number;
    releaseRestrictions:Array<ReleaseRestriction>
}