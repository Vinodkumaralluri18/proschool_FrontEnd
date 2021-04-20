import { Component, OnInit, Input } from '@angular/core';
import { HeaderService } from '../../_services/header.service';
import { AuthenticationServiceService } from '../../_services/authentication-service.service';
import { MessageService } from '../../_services/message.service';
import { ServicesService } from '../../services.service';
import { EmployeesService } from '../../_services/employees.service';
import { User } from '../../_models/user';
import { Location } from "@angular/common";
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TaskdetailsComponent} from '../../school/taskdetails/taskdetails.component';
import { Router } from "@angular/router";
import { appConfig } from '../../app.config';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	now: string;

	constructor(private service: HeaderService, private authenticationservice: AuthenticationServiceService, private messageservice: MessageService, private employeeservice: EmployeesService, private serviceService: ServicesService, private router: Router, public dialog: MatDialog) {
		setInterval(() => {
			this.now = new Date().toString().split(' ')[4];
		}, 1);
	}

	today = new Date();
	time;
	weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	viewNotifications: boolean = false;
	viewMailBox: boolean = false;

	private url = appConfig.apiUrl;

	currentModuleTitle: string = "Dashboard";
	user: User;
	heading;
	sent_to;
	notifications = [];
	unread_notifications;
	messages = [];
	unread_messages;
	profileName;

	school_details: any = {};
	employee_details: any = {};
	taskdetails: any = {};
	dialog_type;
	profile_name;
	profileImage;

	private log_id = appConfig.log_id;

	ngOnInit() {
		this.formatAMPM();
		this.user = JSON.parse(localStorage.getItem('currentUser'));
		if (this.user.role === 'admin') {
			this.getAdminNotifications();
			this.sent_to = 'admin';
			this.getInbox();
			this.getSchools();
		} else if (this.user.role === 'teacher') {
			this.sent_to = this.user.employee_id;
			this.getNotifications();
			this.getInbox();
			this.getEmployeeDetails();
		}
		this.getRealTimeNotifications();
		this.getRealTimeMessages();
		this.getAllEmployeeMessages();
		this.getAllTeacherMessages();
	}

	goToProfile(profile: string) {
		profile === "admin"
		  ? this.router.navigate(["main/main/admin/profile"])
		  : this.router.navigate([`main/main/employeeprofile/${this.user.employee_id}`]);
	  }

	time_calculator() {

		setInterval(function () {
			var countDownDate = new Date().getTime();
			// Get today's date and time
			var date = new Date();
			var now = date.getTime();

			// Find the distance between now and the count down date
			var distance = countDownDate - now;

			// Time calculations for days, hours, minutes and seconds
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			var ampm = hours >= 12 ? 'PM' : 'AM';

			var time = hours + ':' + minutes + ':' + seconds + ' ' + ampm;

			// If the count down is over, write some text 
			if (distance < 0) {
				clearInterval(this.time_calculator);
				document.getElementById("demo").innerHTML = "EXPIRED";
			}
		}, 1000);
	};

	formatAMPM() {
		var date = new Date();
		var hours = date.getHours();
		var minutes: any = date.getMinutes();
		var seconds: any = date.getSeconds();
		var ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;
		var strTime: any = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
		this.time = strTime;
	}

	getAdminNotifications() {
		this.service.getAdminNotifications()
			.subscribe(data => {
				this.notifications = data.notifications, this.unread_notifications = data.unread, console.log(data)
			})
	}

	getNotifications() {
		this.service.getNotifications()
			.subscribe(data => {
				this.notifications = data.notifications, this.unread_notifications = data.unread, console.log(data)
			})
	}

	getRealTimeNotifications() {
		this.service.getRealTimeNotifications()
			.subscribe(data => {
				this.notifications.push(data), this.unread_notifications++, console.log(this.unread_notifications)
			})
	}

	openNotification(i) {
		if (this.notifications[i].status === 'unread') {
			this.service.notificationStatus(this.notifications[i].notification_id)
				.subscribe(data => {
					if (data === true) {
						this.unread_notifications--;
						console.log(this.unread_notifications)
					}
				})
		}

		if (this.notifications[i].notification_type === 'task') {
			this.service.getTaskDetails(this.notifications[i].original_id )
			.subscribe(
			  res => { 
				  this.taskdetails = res.tasks[0],
				  console.log(res),
				  this.dialog_type = 'list',
				  this.openListDialog(this.dialog_type)
			  }
			)
		}
	}

	openDetails(i) {
		if (this.notifications[i].notification_type === 'task') {
			this.service.getTaskDetails(this.notifications[i].original_id )
			.subscribe(
			  res => { this.taskdetails = res.tasks[0],console.log(res) 
			  }
			)
			this.dialog_type = 'list';
			this.openListDialog(this.dialog_type);
		}
	}

	getInbox() {
		this.messageservice.getInbox(this.sent_to)
			.subscribe(
				res => { this.messages = res.messages, this.unread_messages = res.unread, console.log(res) }
			)
	}

	getRealTimeMessages() {
		this.service.getRealTimeMessages()
			.subscribe(data => {
				this.messages.push(data), this.unread_messages++, console.log(data)
			})
	}

	getAllEmployeeMessages() {
		this.service.getAllEmployeeMessages()
			.subscribe(data => {
				this.messages.push(data), this.unread_messages++, console.log(data)
			})
	}

	getAllTeacherMessages() {
		this.service.getAllTeacherMessages()
			.subscribe(data => {
				this.messages.push(data), this.unread_messages++, console.log(data)
			})
	}

	getSchools() {
		this.serviceService.getSchools()
			.subscribe(
				res => {
					this.school_details = res.schools[0],
						this.employeeservice.schoolprofile_name = this.school_details.name,
						this.getSchoolImage(),
						console.log(this.profile_name)
				}
			)
	}

	getSchoolImage() {
		this.employeeservice.schoolprofileImage = this.url + '/image/' + this.school_details.SchoolImage[0].filename;
	}

	// getSchoolLogo() {
	// 	this.schoolLogo = this.url + '/image/' + this.schoolprofile.SchoolLogo[0].filename;
	// }


	getEmployeeDetails() {
		this.employeeservice.getEmployeeDetails(this.user.employee_id)
			.subscribe(
				res => {
					this.employee_details = res.employee[0],
						this.employeeservice.profile_name = this.employee_details.first_name + ' ' + this.employee_details.last_name,
						this.getEmployeeImage(),
						console.log(this.profile_name)
				}
			)
	}

	getEmployeeImage() {
		this.employeeservice.profileImage = this.url + '/image/' + this.employee_details.employeeImage.filename;
	}

	logout() {
		localStorage.removeItem('currentUser');
		// this.authenticationservice.logout(this.log_id)
		// 	.subscribe(
		// 		res => {
		// 			console.log(res)
		// 		}
		// 	)
	}

	// getChat() {
	// 	this.service.getChat()
	// 		.subscribe(data => {
	// 			console.log(data)
	// 		})
	// }

	selectActiveModule() {
		if (this.router.url == "/main/main/dashboard/dashboard") {
			this.currentModuleTitle = "Dashboard";
		}

		if (this.router.url == "/main/main/communications/messages") {
			this.currentModuleTitle = "Communications";
		}

		if (this.router.url == "/main/main/admin/notifications") {
			this.currentModuleTitle = "Task Management";
		}

		if (this.router.url == "/main/main/dashboard/teacherdashboard") {
			this.currentModuleTitle = "Dashboard";
		}

		if (this.router.url == "/main/main/admin/addClass") {
			this.currentModuleTitle = "School Classes";
		}

		if (this.router.url == "/main/main/admin/addSection") {
			this.currentModuleTitle = "Class Sections";
		}

		if (this.router.url == "/main/main/admin/examinationPattern") {
			this.currentModuleTitle = "Examination Patterns";
		}

		if (this.router.url == "/main/main/admin/assessmentPattern") {
			this.currentModuleTitle = "Assessment Patterns";
		}

		if (this.router.url == "/main/main/students/information") {
			this.currentModuleTitle = "Students";
		}

		if (this.router.url == "/main/main/employees/information") {
			this.currentModuleTitle = "Employees";
		}

		if (this.router.url == "/main/main/admin/profile") {
			this.currentModuleTitle = "School Profile";
		}

		if (this.router.url == "/main/main/admin/messages") {
			this.currentModuleTitle = "Messenger";
		}

		if (this.router.url == "/main/main/admin/parentinfo") {
			this.currentModuleTitle = "Users Login Info";
		}

		if (this.router.url == "/main/main/admin/pendingTasks") {
			this.currentModuleTitle = "Task Management";
		}

		if (this.router.url == "/main/main/admin/materials") {
			this.currentModuleTitle = "Stock Management";
		}

		if (this.router.url == "/main/main/admin/payments") {
			this.currentModuleTitle = "Payments";
		}

		if (this.router.url == "/main/main/admin/expenses") {
			this.currentModuleTitle = "Expenses";
		}

		if (this.router.url == "/main/main/attendance/studentattendance") {
			this.currentModuleTitle = "Student Attendance";
		}

		if (this.router.url == "/main/main/attendance/employeeattendance") {
			this.currentModuleTitle = "Employee Attendance";
		}

		if (this.router.url == "/main/main/attendance/reports" || this.router.url == "/main/main/attendance/empreports") {
			this.currentModuleTitle = "Attendance Reports";
		}

		if (this.router.url == "/main/main/academics/subjects") {
			this.currentModuleTitle = "Subjects";
		}

		if (this.router.url == "/main/main/academics/chapters") {
			this.currentModuleTitle = "Chapters";
		}

		if (this.router.url == "/main/main/academics/topics") {
			this.currentModuleTitle = "Topics";
		}

		if (this.router.url == "/main/main/academics/assignsubjects") {
			this.currentModuleTitle = "Assigned Teachers";
		}

		if (this.router.url == "/main/main/academics/planner") {
			this.currentModuleTitle = "Academic Planner";
		}

		if (this.router.url == "/main/main/assignments/assignmentsByDate") {
			this.currentModuleTitle = "Assignments";
		}

		if (this.router.url == "/main/main/classtests/CTByDate") {
			this.currentModuleTitle = "Class Tests";
		}

		if (this.router.url == "/main/main/projectworks/PWByDate") {
			this.currentModuleTitle = "Project Works";
		}

		if (this.router.url == "/main/main/reports/assignmentreports") {
			this.currentModuleTitle = "Assessments Report";
		}

		if (this.router.url == "/main/main/examinations/schedules") {
			this.currentModuleTitle = "Examination";
		}

		if (this.router.url == "/main/main/examinations/listPapers") {
			this.currentModuleTitle = "Exam Papers";
		}

		if (this.router.url == "/main/main/evaluations/addMarks") {
			this.currentModuleTitle = "Examination Add Marks";
		}

		if (this.router.url == "/main/main/evaluations/subjectMarks" || this.router.url == "/main/main/evaluations/marksList" || this.router.url == "/main/main/evaluations/cumulativeMarks") {
			this.currentModuleTitle = "Evaluation Reports";
		}

		if (this.router.url == "/main/main/reports/evaluationreports") {
			this.currentModuleTitle = "Evaluation Reports";
		}

		if (this.router.url == "/main/main/timetable/classwise") {
			this.currentModuleTitle = "Timetable";
		}

		if (this.router.url == "/main/main/timetable/events") {
			this.currentModuleTitle = "School Events";
		}

		if (this.router.url == "/main/main/timetable/noticeboard") {
			this.currentModuleTitle = "Notice Board";
		}

		if (this.router.url == "/main/main/fee/studentfee") {
			this.currentModuleTitle = "Student Fees";
		}

		if (this.router.url == "/main/main/fee/feetype") {
			this.currentModuleTitle = "Fee Types";
		}

		if (this.router.url == "/main/main/fee/classfee") {
			this.currentModuleTitle = "Class Fees";
		}

		if (this.router.url == "/main/main/fee/feestructure") {
			this.currentModuleTitle = "Fee Structure";
		}

		if (this.router.url == "/main/transportation/stations" || this.router.url == "/main/transportation/vehicles" ||
			this.router.url == "/main/transportation/routes" || this.router.url == "/main/transportation/addroute" ||
			this.router.url == "/main/transportation/navigation") {
			this.currentModuleTitle = "Transport";
		}

		return this.currentModuleTitle;
	}

	openListDialog(dialog_type): void {

		let dialogConfig = new MatDialogConfig();

		dialogConfig = {
			autoFocus: true,
			maxWidth: '80vw',
			maxHeight: '100vh',
		};

		dialogConfig.data = {
			selected_task: this.taskdetails,
			dialog_type: dialog_type,
		};

		const dialogRef = this.dialog.open(TaskdetailsComponent, dialogConfig);

		dialogRef.afterClosed().subscribe(
			data => {
			}
		);
	}

}
