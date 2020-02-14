import {ClientProgram} from './clientProgram';
import {RoomType} from './roomType';

export class AvailabilityAdd {
    inventoryOfPrograms:Array<ClientProgram>;
	mapRoomTypeDTOClientProgram:Map<RoomType, number>;
}
