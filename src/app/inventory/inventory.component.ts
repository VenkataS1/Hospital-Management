import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { InventoryModel } from './inventory.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  formValue !: FormGroup;
  inventoryModelObj: InventoryModel = new InventoryModel();
  inventoryData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formbuilder: FormBuilder,
    private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      item : [''],
      quantity : [''],
      reorder : [''],
      cost : [''],
      value : [''],
    })
    this.getAllInventory();
  }

  clickAddInventory(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postInventoryDetails(){
    this.inventoryModelObj.item = this.formValue.value.item;
    this.inventoryModelObj.quantity = this.formValue.value.quantity;
    this.inventoryModelObj.reorder = this.formValue.value.reorder;
    this.inventoryModelObj.cost = this.formValue.value.cost;
    this.inventoryModelObj.value = this.formValue.value.value;

    this.api.postInventory(this.inventoryModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Inventory Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllInventory();
    },
    err=>{
      alert("Something Went Wrong");
    })
  }

  getAllInventory(){
    this.api.getInventory()
    .subscribe(res=>{
      this.inventoryData =res;
    })
  }

  deleteInventory(row : any){
    this.api.deleteInventory(row.id)
    .subscribe(res=>{
      alert("Inventory Deleted")
      this.getAllInventory();
    })
  }

  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.inventoryModelObj.id = row.id;
    this.formValue.controls['item'].setValue(row.item);
    this.formValue.controls['quantity'].setValue(row.quantity);
    this.formValue.controls['reorder'].setValue(row.reorder);
    this.formValue.controls['cost'].setValue(row.cost);
    this.formValue.controls['value'].setValue(row.value);
  }

  updateInventoryDetails(){
    this.inventoryModelObj.item = this.formValue.value.item;
    this.inventoryModelObj.quantity = this.formValue.value.quantity;
    this.inventoryModelObj.reorder = this.formValue.value.reorder;
    this.inventoryModelObj.cost = this.formValue.value.cost;
    this.inventoryModelObj.value = this.formValue.value.value;
    
    this.api.updateInventory(this.inventoryModelObj,this.inventoryModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully"); 
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllInventory();
    },
    err=>{
      alert("Something Went Wrong");
    })
  }
}


