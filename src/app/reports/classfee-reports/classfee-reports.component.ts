import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-classfee-reports',
  templateUrl: './classfee-reports.component.html',
  styleUrls: ['./classfee-reports.component.css']
})
export class ClassfeeReportsComponent implements OnInit {

  constructor(private service: ServicesService, public dialog: MatDialog) {}

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;
  
  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getFeeTerms();
    this.getFeeTypes();
  }

  pageChange(x) {
    this.pageNo = x;
    this.page_start = (x - 1) * 10;
  } 

  students_fee = [];
  fee_terms = [];
  fee_types = [];
  i;
  totalpaid = 0;
  partialpaid = 0;
  nilpaid = 0;

  list: boolean = true;

  selected_class:string;
  selected_section:string;
  alert_message: string;
  selected_term: any;
  selected_type: any;

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
    this.getClass_fee();
  }

  getFeeTerms() {
    this.service.getFeeTerms()
      .subscribe(
        res => { 
          this.fee_terms = res.fee_term, 
          this.selected_term = this.fee_terms[0],
          console.log(res) 
        }
      )
  }

  getFeeTypes() {
    this.service.getFeeTypes()
      .subscribe(
        res => { 
          this.fee_types = res.fee_type, 
          this.selected_type = this.fee_types[0],
          console.log(res) 
        }
      )
  }

  getClass_fee() {
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else {
      this.service.getClass_fee(this.selected_section, this.selected_type.fee_types_id, this.selected_term.fee_term_id)
      .subscribe(
        res => { 
          this.students_fee = res.studentFee, 
          this.pages = Math.ceil(this.students_fee.length / 10),
          console.log(res) 
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
