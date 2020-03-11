import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RoomTypeClientPrograms } from 'src/DTO/availabilityNew/roomTypeClientPrograms';
import { ClientProgram } from 'src/DTO/availabilityNew/clientProgram';
import { AvailabilityNewGet } from 'src/DTO/availabilityNew/availabilityNewGet';
import { PeriodFromTo } from 'src/DTO/availabilityNew/periodFromTo';
import { AvailabilityRow } from 'src/DTO/availabilityNew/availabilityRow';
import { AvailabilityDetails } from 'src/DTO/availabilityNew/availabilityDetails';
import { ReleaseRestriction } from 'src/DTO/availabilityNew/releaseRestriction';
import { AvailabilityAddPostDTO } from 'src/DTO/availabilityNew/AvailabilityAddPostDTO';
import { AvailabilityRowsByRoomType } from 'src/DTO/availabilityNew/availabilityRowsByRoomType';

@Component({
  selector: 'create-avail-form',
  templateUrl: './create-avail-form.component.html',
  styleUrls: ['./create-avail-form.component.sass']
})
export class CreateAvailFormComponent implements OnInit {

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
    roomTypeClientProgramsSelected:Array<RoomTypeClientPrograms> = new Array();
    @Input() roomTypeClientProgram:RoomTypeClientPrograms = new RoomTypeClientPrograms();
    @Input() availIsRoom:boolean = false;
    @Input() availIsGlobal:boolean = false;
    @Input() availAdd:AvailabilityNewGet;
    @Input() availType:string;
    distributionType:Array<ClientProgram> = new Array();
    activateDistributionSelect:boolean = false;
    stockInputDisabled:boolean = true;
    roomsSelected:Array<any> = new Array();

  //Form step 3 create avail
  createAvailForm = this.fb.group({
    roomId:["",Validators.required],
    distributionType: ["",Validators.required],
    programType: ["",Validators.required],
    availMode: ["",Validators.required],
    stock: ["",Validators.required],
    weekDaysMo:["true",Validators.required],
    weekDaysTu:["true",Validators.required],
    weekDaysWe:["true",Validators.required],
    weekDaysTh:["true",Validators.required],
    weekDaysFr:["true",Validators.required],
    weekDaysSa:["true",Validators.required],
    weekDaysSu:["true",Validators.required],
    weekDaysMo2:["",Validators.required],
    weekDaysTu2:["",Validators.required],
    weekDaysWe2:["",Validators.required],
    weekDaysTh2:["",Validators.required],
    weekDaysFr2:["",Validators.required],
    weekDaysSa2:["",Validators.required],
    weekDaysSu2:["",Validators.required],
    all:["",Validators.required],
    dayFrom:["",Validators.required],
    hourFrom:["",Validators.required],
    minuteFrom:["",Validators.required],
    dayTo:["",Validators.required],
    hourTo:["",Validators.required],
    minuteTo:["",Validators.required],
    stayMin:["",Validators.required],
    stayMax:["",Validators.required],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    // //periods
    // let periodsFromToDTO = new Array<PeriodFromTo>();
    // for (let index = 0; index < this.periodsFrom.length; index++) {
    //   let periodFromtoDTO = new PeriodFromTo(this.periodsFrom.at(index).value,this.periodsTo.at(index).value);
    //   periodsFromToDTO.push(periodFromtoDTO);
    // }
    // //type of load
    // let availType:string = this.availTypeForm.controls.availType.value;
    //avails
    if(this.availType == "global"){
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
      // let availAddPostDTO:AvailabilityAddPostDTO = new AvailabilityAddPostDTO(availType,
      // periodsFromToDTO,availRows);
      // console.debug(availAddPostDTO);
      // this.availService.saveOrUpdateAvailabilitiesAdd(availAddPostDTO);
    }else if(this.availType == "room"){
      let availRowsByRoom:Array<AvailabilityRowsByRoomType> = new Array<AvailabilityRowsByRoomType>();
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



  checkIfModeIsStock(mode:string,control:any){
    if(mode == "freeSale" || mode == "request"){
      this.stockInputDisabled = true;
      control.disable();
    }else{
      this.stockInputDisabled = false;
      control.enable();
    }
  }

  changeCheckboxStatus(checkboxName:string,checkboxOppositeName:string){
    if(checkboxName == "weekDaysMo" || checkboxName == "weekDaysMo2"){
      this.createAvailForm.controls.weekDaysMo.setValue(!this.createAvailForm.controls.weekDaysMo.value);
      this.createAvailForm.controls.weekDaysMo2.setValue(!this.createAvailForm.controls.weekDaysMo2.value);
    }

    if(checkboxName == "weekDaysTu" || checkboxName == "weekDaysTu2"){
      this.createAvailForm.controls.weekDaysTu.setValue(!this.createAvailForm.controls.weekDaysTu.value);
      this.createAvailForm.controls.weekDaysTu2.setValue(!this.createAvailForm.controls.weekDaysTu2.value);
    }
    //console.debug("dynamic variable name: "+this["weekDaysTu"].value);
    if(checkboxName == "weekDaysWe" || checkboxName == "weekDaysWe2"){
      this.createAvailForm.controls.weekDaysWe.setValue(!this.createAvailForm.controls.weekDaysWe.value);
      this.createAvailForm.controls.weekDaysWe2.setValue(!this.createAvailForm.controls.weekDaysWe2.value);
    }

    if(checkboxName == "weekDaysTh" || checkboxName == "weekDaysTh2"){
      this.createAvailForm.controls.weekDaysTh.setValue(!this.createAvailForm.controls.weekDaysTh.value);
      this.createAvailForm.controls.weekDaysTh2.setValue(!this.createAvailForm.controls.weekDaysTh2.value);
    }

    if(checkboxName == "weekDaysFr" || checkboxName == "weekDaysFr2"){
      this.createAvailForm.controls.weekDaysFr.setValue(!this.createAvailForm.controls.weekDaysFr.value);
      this.createAvailForm.controls.weekDaysFr2.setValue(!this.createAvailForm.controls.weekDaysFr2.value);
    }
    if(checkboxName == "weekDaysSa" || checkboxName == "weekDaysSa2"){
      this.createAvailForm.controls.weekDaysSa.setValue(!this.createAvailForm.controls.weekDaysSa.value);
      this.createAvailForm.controls.weekDaysSa2.setValue(!this.createAvailForm.controls.weekDaysSa2.value);
    }

    if(checkboxName == "weekDaysSu" || checkboxName == "weekDaysSu2"){
      this.createAvailForm.controls.weekDaysSu.setValue(!this.createAvailForm.controls.weekDaysSu.value);
      this.createAvailForm.controls.weekDaysSu2.setValue(!this.createAvailForm.controls.weekDaysSu2.value);
    }
    this.createAvailForm.controls.this[checkboxName].setValue(!this.createAvailForm.controls.this[checkboxName].value);
    this.createAvailForm.controls.this[checkboxOppositeName].setValue(!this.createAvailForm.controls.this[checkboxOppositeName].value);
  }

  resetCheckboxes(){
    for(let index = 0; index < this.weekDaysMoFormArray.length; index++){
      this.weekDaysMoFormArray.controls[index].setValue(true);
      this.weekDaysTuFormArray.controls[index].setValue(true); 
      this.weekDaysWeFormArray.controls[index].setValue(true);
      this.weekDaysThFormArray.controls[index].setValue(true);
      this.weekDaysFrFormArray.controls[index].setValue(true);
      this.weekDaysSaFormArray.controls[index].setValue(true);
      this.weekDaysSuFormArray.controls[index].setValue(true);
      this.weekDaysMo2FormArray.controls[index].setValue(false);
      this.weekDaysTu2FormArray.controls[index].setValue(false); 
      this.weekDaysWe2FormArray.controls[index].setValue(false);
      this.weekDaysTh2FormArray.controls[index].setValue(false);
      this.weekDaysFr2FormArray.controls[index].setValue(false);
      this.weekDaysSa2FormArray.controls[index].setValue(false);
      this.weekDaysSu2FormArray.controls[index].setValue(false);
    }
  }

}
