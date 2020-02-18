import { AvailabilityDetails } from './availabilityDetails';

export class AvailabilityRow {
    distributionId:number;
    isSharedGroupId:boolean;
    availabilityDetails:Array<AvailabilityDetails>;
}