import { Component, OnInit, Inject } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FeeService } from '../../_services/fee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-addfee',
  templateUrl: './addfee.component.html',
  styleUrls: ['./addfee.component.css']
})
export class AddfeeComponent implements OnInit {

  student_fee: any = {};
  fee_types_id: string;
  fee: string;
  dialog_type: string;
  alert_message: string;

  total_fee;
  paid_fee;
  balance_fee;

  fee_types = [];
  feestructure = [];
  feeDetails:any = {};
  terms = [];

  feeData: boolean = true;

  constructor(
    private service: ServicesService,
    private feeservice: FeeService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddfeeComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.student_fee = data.student_fee;
    this.fee = data.fee;
    this.fee_types_id = data.fee_types_id;
    this.dialog_type = data.dialog_type;
  }

  collectfeeForm: FormGroup = this.fb.group({
    class_id: ['', Validators.required],
    fee_types_id: ['', Validators.required],
    total_fee: ['', Validators.required],
    fee_paid: ['', Validators.required],
    installment: ['', Validators.required],
    payment_mode: ['', Validators.required],
    fee_structure_id: ['', Validators.required],
    // discount: ['', Validators.required],
    // fine: ['', Validators.required],
    phone: ['', Validators.required],
  });

  ngOnInit() {
    console.log({student_fee: this.student_fee})
    console.log(this.fee_types_id)
    console.log(this.fee)
    this.collectfeeForm.patchValue({
      class_id: this.student_fee.class_id,
      fee_types_id: this.fee_types_id,
      total_fee: this.student_fee.total_fee,
      fee_paid: ['', Validators.required],
      installment: ['', Validators.required],
      payment_mode: ['', Validators.required],
      phone: this.student_fee.phone,
    })
    if(this.fee === 'general') {
      this.getFeeStructure();
    } else if(this.fee === 'special') {
      this.getStudent_FeeType();
      this.collectfeeForm.value.installment = '';
      console.log(this.feeDetails)
    }

  }

  close() {
    this.dialogRef.close();
  }

  // getClassFee() {
  //   this.feeservice.getClassFee(this.student_fee.class_id)
  //     .subscribe(
  //       res => { this.fee_types = res.class_fee, console.log(res) }
  //     )
  // }

  getFeeStructure() {
    this.feeservice.getFeeStructure(this.student_fee.installment_type, this.student_fee.class_id, this.fee_types_id)
      .subscribe(
        res => { 
          if(res.feestructure.length > 0) {
            this.feestructure = res.feestructure;
            this.feeData = true;
          } else {
            this.openAlert('Fee Structure is not available for this Fee Type')
            this.close();
          }
          console.log(res) 
        }
      )
  }

  getStudent_FeeType() {
    if(this.collectfeeForm.value.fee_types_id == undefined || this.collectfeeForm.value.fee_types_id == '') {
      this.alert_message = "Please Select Fee-Type";
      this.openAlert(this.alert_message)
    } else {
      this.feeDetails.totalFee = this.collectfeeForm.value.total_fee;
      this.feeDetails.totalStudentFee = this.student_fee.paid_fee;
      this.feeDetails.totalBalanceFee = (this.feeDetails.totalFee - this.feeDetails.totalStudentFee)
    }
  }

  getStudent_installmentFees() {
    if(this.collectfeeForm.value.fee_types_id == undefined || this.collectfeeForm.value.fee_types_id == '' ||
      this.collectfeeForm.value.installment == undefined || this.collectfeeForm.value.installment == '') {
      this.alert_message = "Please Select Fee-Type && Installment";
      this.openAlert(this.alert_message)
    } else {
      this.feeservice.getStudent_installmentFees(this.student_fee.student_id, this.fee_types_id, this.collectfeeForm.value.installment, this.collectfeeForm.value.class_id)
      .subscribe(
        res => { 
          this.feeDetails = res.StudentFeeDetails[0], 
          this.collectfeeForm.value.total_fee = this.feeDetails.totalFee;
          console.log(res) }
      )
    }
  }

  addCollectedFee() {
    if (this.student_fee.student_id == undefined || this.student_fee.student_id == '') {
      this.alert_message = "Please Select Student";
      this.openAlert(this.alert_message)
    } else if(this.feeDetails.totalBalanceFee === "" || this.feeDetails.totalBalanceFee === null || this.feeDetails.totalBalanceFee === undefined ||
     this.feeDetails.totalDiscount === "" || this.feeDetails.totalDiscount === null || this.feeDetails.totalDiscount === undefined) {
      console.log(this.feeDetails.totalBalanceFee)
      console.log(this.feeDetails.totalDiscount)
      this.alert_message = "Fee Structure is incomplete";
      this.openAlert(this.alert_message);
    } else if(this.collectfeeForm.value.fee_paid > this.feeDetails.totalBalanceFee){
      this.alert_message = "Entered Fee is greater than the Balance Fee";
      this.openAlert(this.alert_message);
    } else {
      this.collectfeeForm.value.fee_structure_id = this.feestructure.filter(data => data.payment_instalment === this.collectfeeForm.value.installment)[0].fee_structure_id;
      this.feeservice.addCollectedFee(this.collectfeeForm.value, this.student_fee.student_id)
      .subscribe(
        res => {
          if(res == true) {
            this.alert_message = "Student Fee Collected Successfully";
            this.openAlert(this.alert_message);
            this.dialogRef.close();
          } else {
            this.alert_message = "Student Fee Not Collected";
            this.openAlert(this.alert_message);
            this.dialogRef.close();
          }
        }
      )
    }
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
