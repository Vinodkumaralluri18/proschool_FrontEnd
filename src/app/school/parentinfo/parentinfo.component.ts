import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-parentinfo',
  templateUrl: './parentinfo.component.html',
  styleUrls: ['./parentinfo.component.css']
})
export class ParentinfoComponent implements OnInit {

  constructor(private service: ServicesService, public dialog: MatDialog) {}

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  ngOnInit() {
  }

  pageChange(x) {
    this.pageNo = x;
    this.page_start = (x - 1) * 10;
  } 

  nextPage() {
    if(this.pageNo < this.pages) {
      this.pageNo++;
      this.page_start = (this.pageNo - 1) * 10;
    } else {
      return;
    }
  } 

  previousPage() {
    if(this.pageNo > 1) {
      this.pageNo--;
      this.page_start = this.page_start - 10;
    } else {
      return;
    }
  } 

  parents = [];
  selected_class:string;
  selected_section:string;
  alert_message: string;

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
    this.getParentsInfo();
  }

  getParentsInfo() {
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else {
      this.service.getParentsInfo(this.selected_section)
      .subscribe(
        res => { this.parents = res.parents, 
          this.pageNo = 1;
          this.page_start = 0;
          this.pages = Math.ceil(this.parents.length / 10),
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
