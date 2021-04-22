import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-evaluation-reports',
  templateUrl: './evaluation-reports.component.html',
  styleUrls: ['./evaluation-reports.component.css']
})
export class EvaluationReportsComponent implements OnInit {

  constructor(private service: ServicesService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getassessment_patterns();
  }

  evaluations = [];
  all_evaluations = [];
  assessment_patterns = [];
  i;

  chartData = [];
  chartType = 'bar';
  chartLabels = ['Student Grades in an Examination'];
  public chartOptions: any = {
    responsive: true
  };
  public chartLegend: true;

  selected_class: string;
  selected_section: string;
  selected_schedule: string;
  alert_message: string;

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
    this.getEvaluationChart();
  }

  getassessment_patterns() {
    this.service.getassessment_patterns()
      .subscribe(
        res => { this.assessment_patterns = res.assessment, console.log(res) }
      )
  }

  getEvaluationChart() {
    if (this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class, Section and Schedule";
      this.openAlert(this.alert_message)
    } else {
      this.service.getEvaluationChart(this.selected_section)
        .subscribe(
          res => { this.evaluations = res.students, this.all_evaluations = res.students, console.log(res) }
        )
    }
  }

  get_chart(event) {
    console.log(event.target.value)
    this.evaluations = this.all_evaluations.filter(data => data.exam_title === this.selected_schedule);
    console.log(this.evaluations)
    this.chartData = [];
    this.chartLabels = [];
    for (this.i = 0; this.i < this.evaluations[0].data.length; this.i++) {
      if (this.evaluations[0].data[this.i].grade == "N/A" && this.evaluations[0].data[this.i].count > 0) {
        this.alert_message = "No Results available for this Examination";
        this.openAlert(this.alert_message)
      } else {
        this.chartData.push(this.evaluations[0].data[this.i].count);
        this.chartLabels.push(this.evaluations[0].data[this.i].grade);
      }
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
