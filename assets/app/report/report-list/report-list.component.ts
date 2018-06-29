import { Component, OnInit } from '@angular/core';
// import { AuthService} from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})

export class ReportListComponent implements OnInit {
  reports = [];
  lateArray = ["ตรงเวลา", "สาย 1-5 นาที", "สาย 6 นาที", "สาย 11 นาที"];
  showOTHours = [];
  showEdit = [];
  showEditStatus = [];
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.requestReports();
  }

  requestReports() {
    this.http.get<any[]>("/api/reports").subscribe((data) => {
      this.reports = data;
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
    if (!date) {
      return;
    }
    var newDate = new Date(date).toTimeString();
    var time = newDate.split(" ")[0];
    return time.split(":")[0]+":"+time.split(":")[1];
  }

  approveOT(id, hours) {
    this.http.put<any>(`/api/reports/${id}/ot/approve`, {hours}).subscribe((data) => {
      this.requestReports();
    }, (err) => {
      console.log(err);
    });
  }

  dismissOT(id) {
    this.http.delete<any>(`/api/reports/${id}/detectOT`).subscribe((data) => {
      this.requestReports();
    }, (err) => {
      console.log(err);
    });
  }

  updateAbsent(id, type) {
    this.http.put<any>(`/api/reports/${id}/absent`, {type}).subscribe((data) => {
      this.requestReports();
      this.showEdit = [];
      this.showEditStatus = [];
    }, (err) => {
      console.log(err);
    });
  }

  removeSpecial(id, type) {
    this.http.delete<any>(`/api/reports/${id}/special?type=${type}`).subscribe((data) => {
      this.requestReports();
    }, (err) => {
      console.log(err);
    });
  }
  // onLogoutUser() {
  //   this.authService.logoutUser();
  //   this.router.navigate(['/login']);
  // }

}
