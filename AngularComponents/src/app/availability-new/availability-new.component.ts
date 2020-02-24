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
  periodsFrom:FormArray =  new FormArray([]);
  periodsTo:FormArray =  new FormArray([]);

  modalForm = this.fb.group({
    nom : ['', Validators.required],
    cognoms: ['', Validators.compose( [Validators.minLength(5),Validators.required])],
    periodsFrom: this.periodsFrom,
    periodsTo: this.periodsTo
  });

  constructor(private availService:AvailabilityService,public dialog: MatDialog,private modalService: ModalService,
    private el: ElementRef, private fb: FormBuilder) { }
  
  ngOnInit() {
    this.test = forkJoin(this.availService.saveOrUpdateAvailabilitiesAdd(new AvailabilityAddPostDTO("room",new Array<PeriodFromTo>())),
    this.availService.getAvailabilitiesByAccom()).subscribe(([res1, res2]) => {
      console.log(res1);
      this.availAdd = res2;
    });

    this.periodsFrom.push(this.fb.control(''));
    this.periodsTo.push(this.fb.control(''));
  }

  ngOnLoad(){
    this.closeDialog();
  }

  getPeriods(){
    return this.modalForm.get('periods') as FormArray;
  }

  addPeriod() {
    //let periods = <FormArray>this.modalForm.controls.periods;
    this.periodsFrom.push(this.fb.control(''));
    this.periodsTo.push(this.fb.control(''));
    console.debug("periodsFrom length: "+this.periodsFrom.length);
    console.debug("periodsTo length: "+this.periodsTo.length);
  }

  deletePeriod(index){
    this.periodsFrom.removeAt(index);
    this.periodsTo.removeAt(index);
  }

  onSubmit() {
    let periodsFromTo = new Array<PeriodFromTo>();
    for (let index = 0; index < this.periodsFrom.length; index++) {
      let periodFromtoDTO = new PeriodFromTo(this.periodsFrom[index].value,this.periodsTo[index].value);
      periodsFromTo.push(periodFromtoDTO);
    }
    let availPost:AvailabilityAddPostDTO = new AvailabilityAddPostDTO(this.modalForm.controls.nom.value,
      periodsFromTo);
    console.debug(availPost);
  }

  showDialog(){
    this.opened = true;
  }

  closeDialog() {
    this.opened = false;
  }
}
