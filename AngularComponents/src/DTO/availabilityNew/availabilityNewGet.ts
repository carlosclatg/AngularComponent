import {ClientProgram} from './clientProgram';
import {RoomType} from './roomType';

export class AvailabilityNewGet {
    public inventoryOfPrograms:Array<ClientProgram>;
	public mapRoomTypeDTOClientProgram:Map<RoomType, Array<number>>;
}
