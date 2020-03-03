import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { AvailabilityService } from '../services/availability-service.service';
import { AvailabilityNewGet } from 'src/DTO/availabilityNew/availabilityNewGet';
import { catchError, map, first } from 'rxjs/operators';
import { of, Observable, forkJoin, from } from 'rxjs';
import { AvailabilityAddPostDTO } from 'src/DTO/availabilityNew/AvailabilityAddPostDTO';
import { PeriodFromTo } from 'src/DTO/availabilityNew/periodFromTo';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalService } from '../services/modal.service';
import { FormControl, FormGroup, FormBuilder ,FormArray,Validators } from '@angular/forms';
import { Months } from './months-enum';
import { RoomType } from 'src/DTO/availabilityNew/roomType';
import { ClientProgram } from 'src/DTO/availabilityNew/clientProgram';
import { analyzeFileForInjectables } from '@angular/compiler';
import { RoomTypeClientPrograms } from 'src/DTO/availabilityNew/roomTypeClientPrograms';

@Component({
  selector: 'availability-new',
  templateUrl: './availability-new.component.html',
  styleUrls: ['./availability-new.component.sass'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AvailabilityNewComponent implements OnInit {

  availAdd:AvailabilityNewGet;
  test:any;
  opened:boolean = false;
  //booleans for step display control
  showPeriods:boolean = false;
  showAvailType:boolean = false;
  showCreateAvail:boolean = false;
  showChooseRoomStep:boolean = false;
  availIsRoom:boolean = false;
  availIsGlobal:boolean = false;
  //Form management
  periodsFrom:FormArray =  new FormArray([]);
  periodsTo:FormArray =  new FormArray([]);
  roomType:Array<any> = new Array();
  roomsSelected:Array<any> = new Array();
  programsByRoomsSelected:Array<ClientProgram> = new Array();
  roomTypeClientProgramsSelected:Array<RoomTypeClientPrograms> = new Array();
  distributionType:Array<ClientProgram> = new Array();
  activateDistributionSelect:boolean = false;
  //Form step 1 periods
  periodsForm = this.fb.group({
    // nom : ['', Validators.required],
    // cognoms: ['', Validators.compose( [Validators.minLength(5),Validators.required])],
    periodsFrom: this.periodsFrom,
    periodsTo: this.periodsTo
  });
  //Form step 3 create avail
  createAvailForm = this.fb.group({
    roomType: ['',Validators.required],
    distributionType: new FormControl({value:'',disabled: this.activateDistributionSelect},Validators.required),
    availMode: new FormControl(''),
    weekDaysMo:new FormControl(''),
    weekDaysTu:new FormControl(''),
    weekDaysWe:new FormControl(''),
    weekDaysTh:new FormControl(''),
    weekDaysFr:new FormControl(''),
    weekDaysSa:new FormControl(''),
    weekDaysSu:new FormControl(''),
    all:new FormControl(''),
    dayFrom:new FormControl(''),
    hourFrom:new FormControl(''),
    minuteFrom:new FormControl(''),
    dayTo:new FormControl(''),
    hourTo:new FormControl(''),
    minuteTo:new FormControl(''),
    stayMin:new FormControl(''),
    stayMax:new FormControl(''),
  });
  //Form step 2 avail type
  availTypeForm = this.fb.group({
    availType: ['',Validators.required]
  });
  //constructor
  constructor(private availService:AvailabilityService,public dialog: MatDialog,private modalService: ModalService,
    private el: ElementRef, private fb: FormBuilder) { }
  
  ngOnInit() {
    this.test = forkJoin(this.availService.saveOrUpdateAvailabilitiesAdd(new AvailabilityAddPostDTO("room",new Array<PeriodFromTo>())),
    this.availService.getAvailabilitiesByAccom()).subscribe(([res1, res2]) => {
      console.log(res1);
      this.availAdd = res2;
      for(let key of this.availAdd.mapRoomTypeDTOClientProgram.entries()){
        this.roomType.push(key[1][0]);
      }
    });

    this.periodsFrom.push(this.fb.control('',Validators.required));
    this.periodsTo.push(this.fb.control('',Validators.required));

  }

  ngOnLoad(){
    this.closeDialog();
  }

  getPeriods(){
    return this.periodsForm.get('periods') as FormArray;
  }

  addPeriod() {
    //let periods = <FormArray>this.modalForm.controls.periods;
    this.periodsFrom.push(this.fb.control('',Validators.required));
    this.periodsTo.push(this.fb.control('',Validators.required));
    console.debug("periodsFrom length: "+this.periodsFrom.length);
    console.debug("periodsTo length: "+this.periodsTo.length);
  }

  deletePeriod(index){
    this.periodsFrom.removeAt(index);
    this.periodsTo.removeAt(index);
  }

  onSubmit() {
    let periodsFromToDTO = new Array<PeriodFromTo>();
    for (let index = 0; index < this.periodsFrom.length; index++) {
      let periodFromtoDTO = new PeriodFromTo(this.periodsFrom.at(index).value,this.periodsTo.at(index).value);
      periodsFromToDTO.push(periodFromtoDTO);
    }
    console.debug(periodsFromToDTO);
  }

  showDialog(){
    this.opened = true;
    this.showPeriods = true;
    this.showAvailType = false;
    this.showCreateAvail = false;
  }

  closeDialog() {
    this.opened = false;
  }
  

  changeModalStep(step:string,insideroomTypeStep:boolean){
    console.warn("inside changeModalStep")
    console.warn(step);
    if(step == "showPeriods"){
        this.showPeriods = true;
        this.showAvailType = false;
        this.showCreateAvail = false;
        this.showChooseRoomStep = false;
        //console.warn('showPeriods')
    }else if(step == "showAvailType"){
        this.showPeriods = false;
        this.showAvailType = true;
        this.showCreateAvail = false;
        this.showChooseRoomStep = false;
        //console.warn('showAvailType')
    }else if(step == "showCreateAvail"){
      if(this.availTypeForm.controls.availType.value == "room" && insideroomTypeStep == false){
        this.showChooseRoomStep = true;
        this.showPeriods = false;
        this.showAvailType = false;
        this.showCreateAvail = false;
      }else{
        this.showChooseRoomStep = false;
        this.showPeriods = false;
        this.showAvailType = false;
        this.showCreateAvail = true;
      }
        //console.warn('showCreateAvail')
    }
  }

  activatedistributionTypeSelect(){
    //console.warn("this.createAvailForm.controls['roomType'].value: "+this.createAvailForm.controls['roomType'].value)
    this.distributionType = new Array<ClientProgram>();
    
    if(this.createAvailForm.controls['roomType'].value != ""){
      for(let entry of this.availAdd.mapRoomTypeDTOClientProgram.entries()){
        let mappingroomProgramIds:any = entry[1][0];
        //check the roomId selected in the mapping between rooms and programs       
        if(mappingroomProgramIds.id == this.createAvailForm.controls['roomType'].value){
          let programIdList:any = entry[1][1];
          for(let id of programIdList){
            for(let clientProgram of this.availAdd.inventoryOfPrograms){
              if(id == clientProgram.clientProgramId){
                this.distributionType.push(clientProgram);
              }
            }
          }
        }
      }
      this.activateDistributionSelect = true;
    }else{
      this.activateDistributionSelect = false;
    }
  }

  addRoomType(roomId:any){
    console.debug("roomId"+roomId);
    let rTypeClPrg:RoomTypeClientPrograms;
    let contains:boolean;
    for(let key of this.availAdd.mapRoomTypeDTOClientProgram.entries()){
      let roomType:any = key[1][0];
      if(roomType.id == roomId){
        //console.debug("contains Room: "+this.roomsSelected.includes(roomType));
        rTypeClPrg = new RoomTypeClientPrograms;
        rTypeClPrg.roomType = roomType;
        let programIdList:any = key[1][1];
        for(let id of programIdList){
          for(let clientProgram of this.availAdd.inventoryOfPrograms){
            if(id == clientProgram.clientProgramId){
              //this.programsByRoomsSelected.push(clientProgram);
              rTypeClPrg.clientPrograms.push(clientProgram);
              }
            }
          }
        if(!this.roomsSelected.includes(roomType)){
          contains = false;
          this.roomsSelected.push(roomType);
          //console.debug("push if contains: "+JSON.stringify(this.roomsSelected));
        }else{
          contains = true;
          this.roomsSelected.splice(this.roomsSelected.indexOf(roomType),1);
          //console.debug("delete if contains: "+JSON.stringify(this.roomsSelected));
        }      
      }
    }
    if(rTypeClPrg != undefined && !contains){
      this.roomTypeClientProgramsSelected.push(rTypeClPrg);
    }else{
      this.roomTypeClientProgramsSelected.splice(this.roomTypeClientProgramsSelected.indexOf(rTypeClPrg),1);
    }
    //console.debug("this.roomTypeClientProgramsSelected: "+JSON.stringify( this.roomTypeClientProgramsSelected));
  }

  setAvailType(type:string){
    this.availTypeForm.controls.availType.setValue(type);
    console.debug(this.availTypeForm.controls.availType.value);
    if(type == "global"){
      this.availIsGlobal = true;
      this.availIsRoom = false;
    }else{
      this.availIsRoom = true;
      this.availIsGlobal = false;
      
    }
  }
}
