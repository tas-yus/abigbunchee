import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  file = null;
  loading = false;
  disabled = false;
  errorMessage4 = null;
  successMessage = null;
  employees = [];
  branchArray: any = [
    "BL",
    "BG", "BW", "BB",
    "BC", "BS", "BP",
    "BNG", "BR", "BH",
    "BU", "BPK", "BN",
    "BA", "BQ"
  ];
  month:any = new Date().getMonth();
  year:any = new Date().getFullYear();
  months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม'
  , 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
  statusArray = ['Super', 'พนักงานทั่วไป', 'พนักงานพาร์ทไทม์', 'ทดลองงาน'];
  toAddEmployee = false;
  newEmployee = {
    firstname: null,
    lastname: null,
    alias: null,
    code: null,
    status: 1,
    branch: 0,
    schedule: 0
  }
  schedules = [];

  @ViewChild('fileUpload') fileUpload;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    var month = Number(this.route.snapshot.queryParamMap.get('month'));
    var year = Number(this.route.snapshot.queryParamMap.get('year'));
    month && month >= 0 && month <= 11? this.month = month: '';
    year && year >= this.year - 4 && year <= this.year? this.year = year: '';
    this.requestEmployees();
  }

  requestEmployees() {
    this.router.navigate([`/home`], {queryParams: {month: this.month, year: this.year}});
    this.http.get<any[]>(`/api/employees?month=${this.month}&&year=${this.year}`).subscribe((data) => {
      this.employees = data;
    }, (err) => {
      console.log(err);
    });
  }

  canGetExcel() {
    var count = 0;
    var numReport = 0;
    this.employees.forEach((employee) => {
      if (employee.monthlyReports.length != 0) {
        numReport++;
      }
      count++;
      if (count == this.employees.length) {
        if (numReport == this.employees.length) {
          return true;
        } else {
          return false;
        }
      }
    });
  }

  onReset() {
    this.file = null;
    this.fileUpload.nativeElement.value = "";
  }

  updateFile(event) {
    this.file = event.srcElement.files[0];
  }

  getYear(offset) {
    return (new Date().getFullYear())-Number(offset);
  }

  onUpload() {
  const formData: any = new FormData();
    formData.append("file", this.file);
    this.loading = true;
    this.disabled = true;
    this.http.post<any>(`/api/excel/upload`, formData).subscribe((data) =>{
      this.http.post<any>(`/api/excel/parse`, {filename: data.filename}).subscribe((data) => {
        this.loading = false;
        this.disabled = false;
        this.successMessage = data.message;
        this.onReset();
        setTimeout(() => {
          this.successMessage = null;
        }, 10000)
      }, (err) => {
        this.disabled = false;
        this.loading = false;
        this.onReset();
        this.errorMessage4 = err.error.message;
        setTimeout(() => {
          this.errorMessage4 = null;
        }, 3000);
     });
    }, (err) => {
      this.disabled = false;
      this.loading = false;
      this.onReset();
      this.errorMessage4 = err.error.message;
      setTimeout(() => {
        this.errorMessage4 = null;
      }, 3000);
    });
  }

  onGetExcel() {
    this.http.post(`/api/excel/create`, {month: this.month, year: this.year}).subscribe((data) => {
      console.log(data);
    }, (err) => {
      console.log(err);
    });
  }

  addEmployee() {
    this.http.post(`/api/employees`, {employee: this.newEmployee}).subscribe((data) => {
      this.requestEmployees();
      this.newEmployee = {
        firstname: null,
        lastname: null,
        alias: null,
        code: null,
        status: 1,
        branch: 0,
        schedule: 0
      }
    }, (err) => {
      console.log(err);
    });
  }

  getSchedules() {
    this.http.get<any>(`/api/schedules/list`).subscribe((data) => {
      this.schedules = data;
    }, (err) => {
      console.log(err);
    });
  }

  invalidAdd() {
    if (!this.newEmployee.firstname) {
      return true;
    }
    if (!this.newEmployee.lastname) {
      return true
    }
    if (!this.newEmployee.code) {
      return true;
    }
    if (this.newEmployee.schedule == 0) {
      return true;
    }
    return false;
  }
}
