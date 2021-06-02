import { Component, OnInit, Inject } from '@angular/core';
import { FeeService } from '../../_services/fee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-editfee',
  templateUrl: './editfee.component.html',
  styleUrls: ['./editfee.component.css']
})
export class EditfeeComponent implements OnInit {

  fee_types = {
    fee_types_id: '',
    fee_type: '',
  };
  class_fee = {
    class_fee_id: '',
    class_id: '',
    fee_types_id: '',
    total_fee: '',
  };
  fee_structure:any = [];
  student_fee: any = {};
  classes = [];
  feeTypes = [];
  classFee = [];
  dialog_type: string;
  submit_type: string;
  alert_message: string;
  
  feetypeForm: FormGroup = this.fb.group({
    fee_types_id: '',
    fee_type: ['', Validators.required],
  });
  ClassFeeForm: FormGroup = this.fb.group({
    class_fee_id: '',
    class_id: ['', Validators.required],
    fee_types_id: ['', Validators.required],
    total_fee: ['', Validators.required],
  });
  feeStructureForm: FormGroup = this.fb.group({
    fee_structure_id: '',
    class_id: ['', Validators.required],
    fee_types_id: ['', Validators.required],
    fee_type: ['', Validators.required],
    payment_instalment: ['', Validators.required],
    installment_type: ['', Validators.required],
    fee_amount: ['', Validators.required],
    discount: ['', Validators.required],
    due_date: ['', Validators.required],
  });
  StudentFeeForm: FormGroup = this.fb.group({
    student_Fee_id: '',
    class_id: ['', Validators.required],
    section_id: ['', Validators.required],
    student_id: ['', Validators.required],
    fee_types_id: ['', Validators.required],
    total_fee: ['', Validators.required],
  });

  terms;  

  constructor(
    private service: FeeService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EditfeeComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.fee_types = data.feeType;
    this.class_fee = data.class_fee;
    this.fee_structure = data.feeStructure;
    this.student_fee = data.student_fee;
    this.classes = data.classes;
    this.feeTypes = data.fee_types;
    this.dialog_type = data.dialog_type;
    this.submit_type = data.submit_type;

    console.log(this.class_fee)
  }

  ngOnInit() {
    if(this.dialog_type === 'feeType') {
      this.feetypeForm.patchValue({
        fee_types_id: this.fee_types.fee_types_id,
        fee_type: this.fee_types.fee_type,
      })
    } else if(this.dialog_type === 'ClassFee') {
      this.ClassFeeForm.patchValue({
        class_fee_id: this.class_fee.class_fee_id,
        class_id: this.class_fee.class_id,        
        fee_types_id: this.class_fee.fee_types_id,
        total_fee: this.class_fee.total_fee,
      })
    } else if(this.dialog_type === 'FeeStructure') {
      console.log(this.fee_structure)
      this.feeStructureForm.patchValue({
        fee_structure_id: this.fee_structure.fee_structure_id,
        class_id: this.fee_structure.class_id,
        fee_types_id: this.fee_structure.fee_types_id,
        fee_type: this.fee_structure.fee_type,
        payment_instalment: this.fee_structure.payment_instalment,
        installment_type: this.fee_structure.installment_type,
        fee_amount: this.fee_structure.fee_amount,
        discount: this.fee_structure.discount,
        due_date: this.fee_structure.due_date,
      })

      if(this.fee_structure.installment_type === 'termwise') {
        this.terms = ['Term-1', 'Term-2', 'Term-3', 'Term-4', 'Term-5', 'Term-6', 'Term-7', 'Term-8', 'Term-9', 'Term-10'];
      } else if(this.fee_structure.installment_type === 'monthly') {
        this.terms = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      } else if(this.fee_structure.installment_type === 'quarterly') {
        this.terms = ['Quarter-1', 'Quarter-2', 'Quarter-3', 'Quarter-4'];
      } else if(this.fee_structure.installment_type === 'halfyearly') {
        this.terms = ['Halfyear-1', 'Halfyear-2'];
      } else if(this.fee_structure.installment_type === 'annually') {
        this.terms = ['Annual'];
      }
      
    } else if(this.dialog_type === 'StudentFee') {
      this.StudentFeeForm.patchValue({
        student_Fee_id: this.student_fee.studentFee_id,
        class_id: this.student_fee.class_id,        
        section_id: this.student_fee.section_id,
        student_id: this.student_fee.student_id,
        fee_types_id: this.student_fee.fee_types_id,
        fee_type: this.student_fee.fee_type,
        total_fee: this.student_fee.total_fee,
        installment_type: this.student_fee.installment_type,
      })
      console.log(this.student_fee)
    }
    this.getFeeTypes();
  }

  getFeeTypes() {
    this.service.getFeeTypes()
      .subscribe(
        res => { this.feeTypes = res.fee_type, console.log(res) }
      )
  }

  close() {
    this.dialogRef.close();
  }

  close_feeType() {
    this.dialogRef.close();
  }

  close_feeMaster() {
    this.dialogRef.close();
  }

  submitFeeType() {
    if(this.submit_type === 'add') {
      this.service.addFeeTypes(this.feetypeForm.value)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "FeeType Added Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "FeeType Not Added";
            this.openAlert(this.alert_message)
          }
        }
      ) 
    } else if(this.submit_type === 'edit') {
      this.feetypeForm.value.fee_types_id = this.fee_types.fee_types_id;
      this.dialogRef.close(this.feetypeForm.value);
      this.service.editFeeTypes(this.feetypeForm.value, this.fee_types.fee_types_id)
        .subscribe(
          res => { 
            if(res == true) {
              this.alert_message = "FeeType Edited Successfully";
              this.openAlert(this.alert_message)
            } else {
              this.alert_message = "FeeType Edited Successfully";
              this.openAlert(this.alert_message)
            }
          }
        )
    }
    this.close();
  }

  submitClassFee() {
    if(this.submit_type === 'add') {
      this.ClassFeeForm.value.class_id = this.class_fee.class_id;
      this.service.addClassFee(this.ClassFeeForm.value)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "ClassFee Added Successfully";
            this.openAlert(this.alert_message)
            this.dialogRef.close();
          } else {
            this.alert_message = "ClassFee Not Added";
            this.openAlert(this.alert_message)
          }
        }
      ) 
    } else if(this.submit_type === 'edit') {
      this.ClassFeeForm.value.class_fee_id = this.class_fee.class_fee_id;
      this.service.editClassFee(this.ClassFeeForm.value, this.class_fee.class_fee_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "ClassFee Edited Successfully";
            this.openAlert(this.alert_message);
            this.dialogRef.close();
          } else {
            this.alert_message = "ClassFee Not Edited";
            this.openAlert(this.alert_message)
          }
        }
      )
    }
    this.close();
  }

  submitFeeStructure() {
    if(this.submit_type === 'add') {
      this.service.addFeeStructure(this.feeStructureForm.value)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "FeeStructure Added Successfully";
            this.openAlert(this.alert_message);
            this.dialogRef.close({form:this.feeStructureForm.value});
          } else {
            this.alert_message = "FeeStructure Not Added";
            this.openAlert(this.alert_message)
          }
        }
      ) 
    } else if(this.submit_type === 'edit') {
      this.service.editFeeStructure(this.feeStructureForm.value, this.fee_structure.fee_structure_id)
        .subscribe(
          res => { 
            if(res == true) {
              this.alert_message = "FeeStructure Edited Successfully";
              this.openAlert(this.alert_message);
              this.dialogRef.close({form: this.feeStructureForm.value, feeStructureId: this.fee_structure.fee_structure_id});
            } else {
              this.alert_message = "FeeStructure Edited Successfully";
              this.openAlert(this.alert_message)
            }
          }
        )
    }
    this.close();
  }

  submitStudentFee() {
    if(this.submit_type === 'add') {
      this.StudentFeeForm.value.fee_type = this.feeTypes.filter(data => data.fee_types_id === this.StudentFeeForm.value.fee_types_id)[0].fee_type;
      this.StudentFeeForm.value.installment_type = this.student_fee.installment_type;
      this.service.addStudentFee(this.StudentFeeForm.value)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "StudentFee Added Successfully";
            this.openAlert(this.alert_message)
            this.dialogRef.close();
          } else {
            this.alert_message = "StudentFee Not Added";
            this.openAlert(this.alert_message)
          }
        }
      ) 
    } else if(this.submit_type === 'edit') {
      this.StudentFeeForm.value.fee_type = this.feeTypes.filter(data => data.fee_types_id === this.StudentFeeForm.value.fee_types_id)[0].fee_type;
      this.StudentFeeForm.value.installment_type = this.student_fee.installment_type;
      this.service.editStudentFee(this.StudentFeeForm.value, this.student_fee.studentFee_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "StudentFee Edited Successfully";
            this.openAlert(this.alert_message);
            this.dialogRef.close();
          } else {
            this.alert_message = "StudentFee Not Edited";
            this.openAlert(this.alert_message)
          }
        }
      )
    }
    this.close();
  }

  openAlert(alert_message) {
    const alertConfig = new MatDialogConfig();

    alertConfig.autoFocus = true;
    alertConfig.width = '40%';

    alertConfig.data = {
      message: alert_message,
    };

    const alertRef = this.dialog.open(AlertComponent, alertConfig);

    alertRef.afterClosed().subscribe()
  }

}
