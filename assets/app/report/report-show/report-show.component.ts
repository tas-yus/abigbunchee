import { Component, OnInit } from '@angular/core';
// import { AuthService} from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'report-show',
  templateUrl: './report-show.component.html',
  styleUrls: ['./report-show.component.css']
})

export class ReportShowComponent implements OnInit {
  report = null;
  lateArray = ["ตรงเวลา", "สาย 1-5 นาที", "สาย 6 นาที", "สาย 11 นาที"];
  absentArray = ["ลากิจ", "ป่วย", "วันหยุด", "พักร้อน", "ท้อง", "ขาด"];
  absentStyleArray = ["text-affair", "text-sick", "text-primary", "text-vacation", "text-pregnant", "text-danger"]
  showOTHours = false;
  showEdit = false;
  showEditStatus = null;
  showComment = false;

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.requestReport(id);
  }

  requestReport(id) {
    this.http.get<any[]>(`/api/reports/${id}`).subscribe((data) => {
      this.report = data;
    }, (err) => {
      console.log(err);
    });
  }

  getDate(date) {
    var newDate = new Date(date).toLocaleDateString();
    var parsedDate = newDate.split("/");
    if (Number(parsedDate[0]) < 10) {
      parsedDate[0] = "0" + parsedDate[0]
    }
    if (Number(parsedDate[1]) < 10) {
      parsedDate[1] = "0" + parsedDate[1]
    }
    return `${parsedDate[1]}-${parsedDate[0]}-${parsedDate[2]}`;
  }

  getTime(date) {
    var newDate = new Date(date).toTimeString();
    return newDate.split(" ")[0];
  }

  approveOT(hours) {
    const id = this.route.snapshot.params['id'];
    this.http.put<any>(`/api/reports/${id}/ot/approve`, {hours}).subscribe((data) => {
      this.requestReport(id);
      this.showOTHours = false;
    }, (err) => {
      console.log(err);
    });
  }
  //
  // dismissOT() {
  //   const id = this.route.snapshot.params['id'];
  //   this.http.delete<any>(`/api/reports/${id}/detectOT`).subscribe((data) => {
  //     this.requestReport(id);
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }

  chooseHalf(days) {
    if (days == 1) {
      var absentDays = 0.5;
    } else {
      var absentDays = 1;
    }
    const id = this.route.snapshot.params['id'];
    this.http.put<any>(`/api/reports/${id}/absentDays`, {absentDays}).subscribe((data) => {
      this.requestReport(id);
    }, (err) => {
      console.log(err);
    });
  }

  updateAbsent(type) {
    const id = this.route.snapshot.params['id'];
    this.http.put<any>(`/api/reports/${id}/absent`, {type}).subscribe((data) => {
      this.requestReport(id);
      this.showEdit = false;
    }, (err) => {
      console.log(err);
    });
  }

  removeSpecial(type) {
    const id = this.route.snapshot.params['id'];
    this.http.delete<any>(`/api/reports/${id}/special?type=${type}`).subscribe((data) => {
      this.requestReport(id);
      this.showEdit = false;
    }, (err) => {
      console.log(err);
    });
  }

  forceAbsent(type) {
    const id = this.route.snapshot.params['id'];
    this.http.put<any>(`/api/reports/${id}/absent/force`, null).subscribe((data) => {
      this.requestReport(id);
    }, (err) => {
      console.log(err);
    });
  }

  onToggleLate() {
    const id = this.route.snapshot.params['id'];
    this.http.put<any>(`/api/reports/${id}/lateStatus`, null).subscribe((data) => {
      this.requestReport(id);
    }, (err) => {
      console.log(err);
    });
  }

  toggleOnHoliday() {
    const id = this.route.snapshot.params['id'];
    this.http.put<any>(`/api/reports/${id}/onHoliday`, null).subscribe((data) => {
      this.requestReport(id);
    }, (err) => {
      console.log(err);
    });
  }

  toggleOnDayOff() {
    const id = this.route.snapshot.params['id'];
    this.http.put<any>(`/api/reports/${id}/onDayOff`, null).subscribe((data) => {
      this.requestReport(id);
    }, (err) => {
      console.log(err);
    });
  }

  dayOff(timeObject) {
    return timeObject.in.hour == 0 && timeObject.in.minute == 0 && timeObject.out.hour == 0 && timeObject.out.minute == 0;
  }

  addComment() {
    const id = this.route.snapshot.params['id'];
    this.http.post<any>(`/api/reports/${id}/comments`, {comment: this.report.comment}).subscribe((data) => {
      this.requestReport(id);
      this.showComment = false;
    }, (err) => {
      console.log(err);
    });
  }
  // onLogoutUser() {
  //   this.authService.logoutUser();
  //   this.router.navigate(['/login']);
  // }

}
