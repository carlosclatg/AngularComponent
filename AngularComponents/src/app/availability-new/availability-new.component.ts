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
import { AvailabilityRow } from 'src/DTO/availabilityNew/availabilityRow';
import { AvailabilityRowsByRoomType } from 'src/DTO/availabilityNew/availabilityRowsByRoomType';
import { AvailabilityDetails } from 'src/DTO/availabilityNew/availabilityDetails';
import { ReleaseRestriction } from 'src/DTO/availabilityNew/releaseRestriction';

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
  //form array for periods form
  periodsFrom:FormArray =  new FormArray([]);
  periodsTo:FormArray =  new FormArray([]);
  periodsFromSelected:boolean = false;
  periodsToSelected:boolean = false;
  //formarrays for create avail form
  distributionTypeFormArray:FormArray = new FormArray([]);
  programTypeArray:FormArray = new FormArray([]);
  availModeFormArray:FormArray = new FormArray([]);
  stockFormArray:FormArray = new FormArray([]);
  weekDaysMoFormArray:FormArray = new FormArray([]);
  weekDaysTuFormArray:FormArray = new FormArray([]);
  weekDaysWeFormArray:FormArray = new FormArray([]);
  weekDaysThFormArray:FormArray = new FormArray([]);
  weekDaysFrFormArray:FormArray = new FormArray([]);
  weekDaysSaFormArray:FormArray = new FormArray([]);
  weekDaysSuFormArray:FormArray = new FormArray([]);
  weekDaysMo2FormArray:FormArray = new FormArray([]);
  weekDaysTu2FormArray:FormArray = new FormArray([]);
  weekDaysWe2FormArray:FormArray = new FormArray([]);
  weekDaysTh2FormArray:FormArray = new FormArray([]);
  weekDaysFr2FormArray:FormArray = new FormArray([]);
  weekDaysSa2FormArray:FormArray = new FormArray([]);
  weekDaysSu2FormArray:FormArray = new FormArray([]);
  allFormArray:FormArray = new FormArray([]);
  dayFromFormArray:FormArray = new FormArray([]);
  hourFromFormArray:FormArray = new FormArray([]);
  minuteFromFormArray:FormArray = new FormArray([]);
  dayToFormArray:FormArray = new FormArray([]);
  hourToFormArray:FormArray = new FormArray([]);
  minuteToFormArray:FormArray = new FormArray([]);
  stayMinFormArray:FormArray = new FormArray([]);
  stayMaxFormArray:FormArray = new FormArray([]);
  //
  roomType:Array<any> = new Array();
  roomsSelected:Array<any> = new Array();
  programsByRoomsSelected:Array<ClientProgram> = new Array();
  roomTypeClientProgramsSelected:Array<RoomTypeClientPrograms> = new Array();
  distributionType:Array<ClientProgram> = new Array();
  activateDistributionSelect:boolean = false;
  stockInputDisabled:boolean = true;
  //showSecondCheckRow:boolean = false;
  //Form step 1 periods
  periodsForm = this.fb.group({
    // nom : ["", Validators.required],
    // cognoms: ["", Validators.compose( [Validators.minLength(5),Validators.required])],
    periodsFrom: this.periodsFrom,
    periodsTo: this.periodsTo
  });
  //Form step 2 avail type
  availTypeForm = this.fb.group({
    availType: ["",Validators.required]
  });
  //Form step 3 create avail
  createAvailForm = this.fb.group({
    //roomType: ["",Validators.required],
    //distributionType: new FormControl({value:"",disabled: this.activateDistributionSelect},Validators.required),
    distributionType: this.distributionTypeFormArray,
    programType: this.programTypeArray,
    availMode: this.availModeFormArray,
    stock: this.stockFormArray,
    weekDaysMo:this.weekDaysMoFormArray,
    weekDaysTu:this.weekDaysTuFormArray,
    weekDaysWe:this.weekDaysWeFormArray,
    weekDaysTh:this.weekDaysThFormArray,
    weekDaysFr:this.weekDaysFrFormArray,
    weekDaysSa:this.weekDaysSaFormArray,
    weekDaysSu:this.weekDaysSuFormArray,
    weekDaysMo2:this.weekDaysMo2FormArray,
    weekDaysTu2:this.weekDaysTu2FormArray,
    weekDaysWe2:this.weekDaysWe2FormArray,
    weekDaysTh2:this.weekDaysTh2FormArray,
    weekDaysFr2:this.weekDaysFr2FormArray,
    weekDaysSa2:this.weekDaysSa2FormArray,
    weekDaysSu2:this.weekDaysSu2FormArray,
    all:this.allFormArray,
    dayFrom:this.dayFromFormArray,
    hourFrom:this.hourFromFormArray,
    minuteFrom:this.minuteFromFormArray,
    dayTo:this.dayToFormArray,
    hourTo:this.hourToFormArray,
    minuteTo:this.minuteToFormArray,
    stayMin:this.stayMinFormArray,
    stayMax:this.stayMaxFormArray,
  });

  //constructor
  constructor(private availService:AvailabilityService,public dialog: MatDialog,private modalService: ModalService,
    private el: ElementRef, private fb: FormBuilder) { }
  
  ngOnInit() {
    this.test = forkJoin(this.availService.saveOrUpdateAvailabilitiesAdd(new AvailabilityAddPostDTO("room",new Array<PeriodFromTo>(),
    new Array<AvailabilityRow>())),
    this.availService.getAvailabilitiesByAccom()).subscribe(([res1, res2]) => {
      console.log(res1);
      this.availAdd = res2;
      console.log(res2);
      for(let key of this.availAdd.mapRoomTypeDTOClientProgram.entries()){
        this.roomType.push(key[1][0]);
      }
    });

    this.periodsFrom.push(this.fb.control("",Validators.required));
    this.periodsTo.push(this.fb.control("",Validators.required));

  }

  ngOnLoad(){
    this.closeDialog();
  }

  getPeriods(){
    return this.periodsForm.get('periods') as FormArray;
  }

  addPeriod() {
    //let periods = <FormArray>this.modalForm.controls.periods;
    this.periodsFrom.push(this.fb.control("",Validators.required));
    this.periodsTo.push(this.fb.control("",Validators.required));
    //console.debug("periodsFrom length: "+this.periodsFrom.length);
    //console.debug("periodsTo length: "+this.periodsTo.length);
  }

  deletePeriod(index){
    this.periodsFrom.removeAt(index);
    this.periodsTo.removeAt(index);
  }

  onSubmit() {
    //periods
    let periodsFromToDTO = new Array<PeriodFromTo>();
    for (let index = 0; index < this.periodsFrom.length; index++) {
      let periodFromtoDTO = new PeriodFromTo(this.periodsFrom.at(index).value,this.periodsTo.at(index).value);
      periodsFromToDTO.push(periodFromtoDTO);
    }
    //type of load
    let availType:string = this.availTypeForm.controls.availType.value;
    //avails
    if(availType == "global"){
      let availRows:Array<AvailabilityRow> = new Array<AvailabilityRow>();
      let availDetails:Array<AvailabilityDetails> = new Array<AvailabilityDetails>();
      let releaseRestrictions:Array<ReleaseRestriction> = new Array<ReleaseRestriction>();
      for(let index = 0; index < this.distributionTypeFormArray.length; index++){
        let availRow:AvailabilityRow = new AvailabilityRow();       
        // for(let i = 0; i < this.availModeFormArray.length; i++){
          let availDetail:AvailabilityDetails = new AvailabilityDetails();
          availDetail.inventoryType = this.availModeFormArray.controls[index].value;
          if(availDetail.inventoryType != "freeSale" && availDetail.inventoryType != "request"){
            availDetail.stock = this.stockFormArray.controls[index].value;
          }
          //weekDays
          let weekDays:string = "";
          if(this.allFormArray.controls[index].value){
            weekDays = "monday|tuesday|wednesday|thursday|friday|saturday|sunday"
          }else{
            if(this.weekDaysMoFormArray.controls[index].value){
              weekDays += "monday"
            }
            if(this.weekDaysTuFormArray.controls[index].value){
              weekDays += "|tuesday"
            }
            if(this.weekDaysWeFormArray.controls[index].value){
              weekDays += "|wednesday"
            }
            if(this.weekDaysThFormArray.controls[index].value){
              weekDays += "|thursday"
            }
            if(this.weekDaysFrFormArray.controls[index].value){
              weekDays += "|friday"
            }
            if(this.weekDaysSaFormArray.controls[index].value){
              weekDays += "|saturday"
            }
            if(this.weekDaysSuFormArray.controls[index].value){
              weekDays += "|sunday"
            }
          }
          availDetail.weekDays = weekDays;
          //release restrictions
          let releaseRestriction:ReleaseRestriction = new ReleaseRestriction();
          releaseRestriction.from = this.dayFromFormArray.controls[index].value;
          releaseRestriction.fromH = this.hourFromFormArray.controls[index].value;
          releaseRestriction.fromM = this.minuteFromFormArray.controls[index].value;
          releaseRestriction.to = this.dayToFormArray.controls[index].value;
          releaseRestriction.toH = this.hourToFormArray.controls[index].value;
          releaseRestriction.toM = this.minuteToFormArray.controls[index].value;  
          console.debug(this.programTypeArray.controls[index].value);      
          if(this.programTypeArray.controls[index].value == "private"){           
            releaseRestriction.clientProgramId = this.distributionTypeFormArray.controls[index].value;
          }
          releaseRestrictions.push(releaseRestriction);
          availDetail.releaseRestrictions = releaseRestrictions; 
         
        availDetails.push(availDetail);
        availRow.availabilityDetails = availDetails;
        availRows.push(availRow);
      }
          //post DTO construction
      let availAddPostDTO:AvailabilityAddPostDTO = new AvailabilityAddPostDTO(availType,
      periodsFromToDTO,availRows);
      console.debug(availAddPostDTO);
      this.availService.saveOrUpdateAvailabilitiesAdd(availAddPostDTO);
    }else if(availType == "room"){
      let availRowsByRoom:Array<AvailabilityRowsByRoomType> = new Array<AvailabilityRowsByRoomType>();
    } 
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
      }else if(this.availTypeForm.controls.availType.value == "room" && insideroomTypeStep == true){
        this.showChooseRoomStep = false;
        this.showPeriods = false;
        this.showAvailType = false;
        this.showCreateAvail = true;
        this.createFormControlsForPrograms('room');
      }else{
        this.showChooseRoomStep = false;
        this.showPeriods = false;
        this.showAvailType = false;
        this.showCreateAvail = true;
        this.createFormControlsForPrograms('global');
      }
        //console.warn('showCreateAvail')
    }
  }

  createFormControlsForPrograms(type:string){
    this.distributionTypeFormArray = new FormArray([]);
    this.programTypeArray = new FormArray([]);
    this.availModeFormArray = new FormArray([]);
    this.stockFormArray = new FormArray([])
    this.weekDaysMoFormArray = new FormArray([]);
    this.weekDaysTuFormArray = new FormArray([]);
    this.weekDaysWeFormArray = new FormArray([]);
    this.weekDaysThFormArray = new FormArray([]);
    this.weekDaysFrFormArray = new FormArray([]);
    this.weekDaysSaFormArray = new FormArray([]);
    this.weekDaysSuFormArray = new FormArray([]);
    this.allFormArray = new FormArray([]);
    this.dayFromFormArray = new FormArray([]);
    this.hourFromFormArray = new FormArray([]);
    this.minuteFromFormArray = new FormArray([]);
    this.dayToFormArray = new FormArray([]);
    this.hourToFormArray = new FormArray([]);
    this.minuteToFormArray = new FormArray([]);
    this.stayMinFormArray = new FormArray([]);
    this.stayMaxFormArray = new FormArray([]);
    if(type == "room"){ 
      this.createFormcontrolsForRooms();
    }else{
      this.createFromcontrolsForGlobal();
    }
  }

  createFormcontrolsForRooms(){
    for (let index = 0; index < this.roomTypeClientProgramsSelected.length; index++) {
      this.distributionTypeFormArray.push(new FormControl({value:"",disabled: this.activateDistributionSelect},Validators.required));
      this.programTypeArray.push(new FormControl("",Validators.required));
      this.availModeFormArray.push(new FormControl("",Validators.required));
      this.stockFormArray.push(new FormControl("",Validators.required));
      this.weekDaysMoFormArray.push(new FormControl("true",Validators.required));
      this.weekDaysTuFormArray.push(new FormControl("true",Validators.required)); 
      this.weekDaysWeFormArray.push(new FormControl("true",Validators.required));
      this.weekDaysThFormArray.push(new FormControl("true",Validators.required));
      this.weekDaysFrFormArray.push(new FormControl("true",Validators.required));
      this.weekDaysSaFormArray.push(new FormControl("true",Validators.required));
      this.weekDaysSuFormArray.push(new FormControl("true",Validators.required));
      this.weekDaysMo2FormArray.push(new FormControl("",Validators.required));
      this.weekDaysTu2FormArray.push(new FormControl("",Validators.required)); 
      this.weekDaysWe2FormArray.push(new FormControl("",Validators.required));
      this.weekDaysTh2FormArray.push(new FormControl("",Validators.required));
      this.weekDaysFr2FormArray.push(new FormControl("",Validators.required));
      this.weekDaysSa2FormArray.push(new FormControl("",Validators.required));
      this.weekDaysSu2FormArray.push(new FormControl("",Validators.required));
      this.allFormArray.push(new FormControl("",Validators.required));
      this.dayFromFormArray.push(new FormControl("",Validators.required));
      this.hourFromFormArray.push(new FormControl("",Validators.required));
      this.minuteFromFormArray.push(new FormControl("",Validators.required));
      this.dayToFormArray.push(new FormControl("",Validators.required));
      this.hourToFormArray.push(new FormControl("",Validators.required));
      this.minuteToFormArray.push(new FormControl("",Validators.required));
      this.stayMinFormArray.push(new FormControl("1"));
      this.stayMaxFormArray.push(new FormControl(""));
      
    }
  }

  createFromcontrolsForGlobal(){
    this.distributionTypeFormArray.push(new FormControl({value:"",disabled: this.activateDistributionSelect},Validators.required));
    this.stockFormArray.push(new FormControl("",Validators.required));
    this.programTypeArray.push(new FormControl("",Validators.required));
    this.availModeFormArray.push(new FormControl("",Validators.required));
    this.weekDaysMoFormArray.push(new FormControl("true",Validators.required));
    this.weekDaysTuFormArray.push(new FormControl("true",Validators.required)); 
    this.weekDaysWeFormArray.push(new FormControl("true",Validators.required));
    this.weekDaysThFormArray.push(new FormControl("true",Validators.required));
    this.weekDaysFrFormArray.push(new FormControl("true",Validators.required));
    this.weekDaysSaFormArray.push(new FormControl("true",Validators.required));
    this.weekDaysSuFormArray.push(new FormControl("true",Validators.required));
    this.weekDaysMo2FormArray.push(new FormControl("",Validators.required));
    this.weekDaysTu2FormArray.push(new FormControl("",Validators.required)); 
    this.weekDaysWe2FormArray.push(new FormControl("",Validators.required));
    this.weekDaysTh2FormArray.push(new FormControl("",Validators.required));
    this.weekDaysFr2FormArray.push(new FormControl("",Validators.required));
    this.weekDaysSa2FormArray.push(new FormControl("",Validators.required));
    this.weekDaysSu2FormArray.push(new FormControl("",Validators.required));
    this.allFormArray.push(new FormControl("",Validators.required));
    this.dayFromFormArray.push(new FormControl("",Validators.required));
    this.hourFromFormArray.push(new FormControl("",Validators.required));
    this.minuteFromFormArray.push(new FormControl("",Validators.required));
    this.dayToFormArray.push(new FormControl("",Validators.required));
    this.hourToFormArray.push(new FormControl("",Validators.required));
    this.minuteToFormArray.push(new FormControl("",Validators.required));
    this.stayMinFormArray.push(new FormControl("1"));
    this.stayMaxFormArray.push(new FormControl(""));
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
    //console.debug("roomId"+roomId);
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
      this.distributionTypeFormArray.removeAt(this.distributionTypeFormArray.length-1);
      this.roomTypeClientProgramsSelected.splice(this.roomTypeClientProgramsSelected.indexOf(rTypeClPrg),1);     
      //console.debug("roomTypeClientProgramsSelected: "+this.roomTypeClientProgramsSelected)
    }
    //console.debug("this.roomTypeClientProgramsSelected: "+JSON.stringify( this.roomTypeClientProgramsSelected));
  }

  setAvailType(type:string){
    if(type == "global"){
      this.availTypeForm.controls.availType.setValue("global");
      this.availIsGlobal = true;
      this.availIsRoom = false;
    }else{
      this.availTypeForm.controls.availType.setValue("room");
      this.createFormControlsForPrograms("room");
      this.availIsRoom = true;
      this.availIsGlobal = false;
      
    }
    this.availTypeForm.controls.availType.setValue(type);
  }

  checkIfModeIsStock(mode:string,control:any){
    if(mode == "freeSale" || mode == "request"){
      this.stockInputDisabled = true;
      control.disable();
    }else{
      this.stockInputDisabled = false;
      control.enable();
    }
  }

  changeCheckboxStatus(checkboxName:string,checkboxOppositeName:string,index:number){
    this[checkboxName].controls[index].setValue(!this[checkboxName].controls[index].value)
    this[checkboxOppositeName].controls[index].setValue(!this[checkboxOppositeName].controls[index].value)
  }

}
