import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-subject-reports',
  templateUrl: './subject-reports.component.html',
  styleUrls: ['./subject-reports.component.css']
})
export class SubjectReportsComponent implements OnInit {

  constructor(private service: ServicesService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  evaluations = [];
  all_evaluations = [];
  subjects = [];
  i;

  chartData = [];
  chartType = 'bar';
  chartLabels = ['Student Grades in a Subject'];
  public chartOptions: any = {
    responsive: true
  };
  public chartLegend: true;

  selected_class: string;
  selected_section: string;
  selected_schedule: string;
  selected_subject: string;
  alert_message: string;

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
    this.getSubjects();
  }

  receiveSchedule($event) {
    this.selected_schedule = $event
    console.log(this.selected_schedule);
    this.getSubjectChart();
  }

  getSubjects() {
    if (this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else {
      this.service.getSubjects(this.selected_section)
        .subscribe(
          res => { this.subjects = res.subjects, console.log(res) }
        )
    }
  }

  getSubjectChart() {
    if (this.selected_section == undefined || this.selected_schedule == undefined ||
      this.selected_section == '' || this.selected_schedule == '') {
      this.alert_message = "Please Select Class, Section and Schedule";
      this.openAlert(this.alert_message)
    } else {
      this.service.getSubjectChart(this.selected_section, this.selected_schedule)
        .subscribe(
          res => { 
            if (res == null) {
              this.evaluations == [], this.all_evaluations = [], console.log(res);
            } else {
              this.evaluations = res.students, this.all_evaluations = res.students, console.log(res) 
            }
          }
        )
    }
  } 

  get_chart(event) {
    console.log(event.target.value)
    if(this.all_evaluations.length > 0) {
      this.evaluations = this.all_evaluations.filter(data => data.subject_id === event.target.value);
      this.chartData = [];
      this.chartLabels = [];
      if (this.evaluations[0].totalCount == 0) {
        this.alert_message = "No Results available for this Subject";
        this.openAlert(this.alert_message)
      } else {
        for (this.i = 0; this.i < this.evaluations[0].data.length; this.i++) {
          this.chartData.push(this.evaluations[0].data[this.i].count);
          this.chartLabels.push(this.evaluations[0].data[this.i].grade);
        }
      }
    } else {
      this.alert_message = "No Results available for this Examination";
      this.openAlert(this.alert_message)
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
