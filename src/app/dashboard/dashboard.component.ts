import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { PatientModel } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  formValue !: FormGroup;
  patientModelObj: PatientModel = new PatientModel();
  patientData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formbuilder: FormBuilder,
    private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      age : [''],
    })
    this.getAllPatient();
  }

  clickAddPatient(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postPatientDetails(){
    this.patientModelObj.firstName = this.formValue.value.firstName;
    this.patientModelObj.lastName = this.formValue.value.lastName;
    this.patientModelObj.email = this.formValue.value.email;
    this.patientModelObj.mobile = this.formValue.value.mobile;
    this.patientModelObj.age = this.formValue.value.age;

    this.api.postPatient(this.patientModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Patient Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllPatient();
    },
    err=>{
      alert("Something Went Wrong");
    })
  }

  getAllPatient(){
    this.api.getPatient()
    .subscribe(res=>{
      this.patientData =res;
    })
  }

  deletePatient(row : any){
    this.api.deletePatient(row.id)
    .subscribe(res=>{
      alert("Patient Deleted")
      this.getAllPatient();
    })
  }

  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.patientModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['age'].setValue(row.age);
  }

  updatePatientDetails(){
    this.patientModelObj.firstName = this.formValue.value.firstName;
    this.patientModelObj.lastName = this.formValue.value.lastName;
    this.patientModelObj.email = this.formValue.value.email;
    this.patientModelObj.mobile = this.formValue.value.mobile;
    this.patientModelObj.age = this.formValue.value.age;
    
    this.api.updatePatient(this.patientModelObj,this.patientModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllPatient();
    },
    err=>{
      alert("Something Went Wrong");
    })
  }
}

