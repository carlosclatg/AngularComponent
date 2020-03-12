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
import { CreateAvailFormComponent } from './create-avail/create-avail-form.component';

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

  @ViewChild('CreateAvailFormComponent',null) createAvail:CreateAvailFormComponent;
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
    if(step == "showPeriods"){
        this.showPeriods = true;
        this.showAvailType = false;
        this.showCreateAvail = false;
        this.showChooseRoomStep = false;

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
        //this.createFormControlsForPrograms('room');
      }else{
        this.showChooseRoomStep = false;
        this.showPeriods = false;
        this.showAvailType = false;
        this.showCreateAvail = true;
        //this.createFormControlsForPrograms('global');
      }
        //console.warn('showCreateAvail')
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
      //this.distributionTypeFormArray.removeAt(this.distributionTypeFormArray.length-1);
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
      //this.createFormControlsForPrograms("room");
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

  addNewForm(){
    
  }

  resetRoomTypeClientProgramsSelected(){
    this.roomTypeClientProgramsSelected = new Array<RoomTypeClientPrograms>();
    this.roomsSelected = new Array<any>();
  }

}
