import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { StudentsService } from '../../_services/students.service';
import { FeeService } from '../../_services/fee.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { appConfig } from '../../app.config';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {

  constructor(private service: ServicesService, private studentservice: StudentsService, private feeservice: FeeService, private route: ActivatedRoute, public dialog: MatDialog) { }

  student_details: any = {};
  profileImage;
  showFeeList: any = false
  private url = appConfig.apiUrl;

  ngOnInit() {
    this.getStudentFees();
    this.getStudentDetails();
  }

  barProgress = [80, 70, 60, 100, 70, 30, 65, 30, 10];
  student_id = this.route.snapshot.paramMap.get('id');
  section_id = this.route.snapshot.paramMap.get('sec_id');
  i;

  allFees:boolean = true;
  alert_message: string;

  fees:any = [];
  payments : any = [];

  selected_Feetype: any = '';

  getStudentDetails() {    
    this.studentservice.getStudentDetails(this.student_id)      
    .subscribe(        
      res => { this.student_details = res.students[0], this.getStudentImage(), console.log(res) 
      }      
    )  
  }

  getStudentImage() {
    this.profileImage = this.url + '/image/' + this.student_details.studentImage.filename;
  }

  getStudentFees() {
    this.allFees = true;
    this.feeservice.getCollectedFee(this.student_id)
    .subscribe(
      res => { 
        if(res.StudentFeeDetails.length > 0) {
          this.fees = res.StudentFeeDetails, 
          // this.pages = Math.ceil(this.collected_fee.length / 10);
          console.log(this.fees) 
        } else {
          this.openAlert('No Student Fees are Available', false);
        }
      }
    )
  }

  getInstallmentFees() {
    this.feeservice.getInstallmentFees(this.student_id, this.student_details.class_id, this.student_details.payment_mode, this.selected_Feetype.fee_types_id)
    .subscribe(
      res => { 
        if(res.StudentFeeDetails.length > 0) {
          this.payments = res.StudentFeeDetails, 
          // this.pages = Math.ceil(this.collected_fee.length / 10);
          console.log(this.payments) 
        } else {
          this.openAlert('No Fees details are Available', false);
        }
      }
    )
  }

  getPayments() {
    if(this.selected_Feetype === 'All Feetypes') {
      this.allFees = true;
    } else {
      this.allFees = false;
      console.log(this.allFees)
      this.getInstallmentFees();
    }
  }

  // getStudentFees() {
  //   if (this.student_id == undefined || this.student_id == '') {
  //     this.alert_message = "Please Select the Student";
  //     this.openAlert(this.alert_message)
  //   } else {
  //     if(this.selected_term.FeeTerm == 'All TermFees' || this.selected_term.FeeTerm == undefined || this.selected_term.FeeTerm == '') {
  //       this.allFees = true;
  //       this.service.getStudentFees(this.student_id)
  //         .subscribe(
  //           res => { this.fees = res.TermFeeDetails, console.log(res) }
  //         )
  //     } else {
  //       this.allFees = false;
  //       this.service.getStudentTermFees(this.student_id, this.selected_term.fee_term_id)
  //         .subscribe(
  //           res => { this.termwiseFee = res.TermFeeDetails, console.log(res) }
  //         )
  //     }
      
  //   }
  // }

  openAlert(alert_message, status) {
    const alertConfig = new MatDialogConfig();

    alertConfig.autoFocus = true;
    alertConfig.width = '40%';

    alertConfig.data = {
      message: alert_message,
      confirm_status: status,
    };

    const alertRef = this.dialog.open(AlertComponent, alertConfig);

    alertRef.afterClosed().subscribe()
  }

}
