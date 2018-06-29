import { Component, OnInit } from '@angular/core';
// import { AuthService} from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'employee-show',
  templateUrl: './employee-show.component.html',
  styleUrls: ['./employee-show.component.css']
})

export class EmployeeShowComponent implements OnInit {
  lateArray = ["ตรงเวลา", "สาย 1-5 นาที", "สาย 6 นาที", "สาย 11 นาที"];
  showOTHours = [];
  showEdit = [];
  showEditStatus = [];
  monthlyReport = [];
  fixBreak = [];
  fixUsual = [];
  employee = null;
  checked = false;
  dayArray = [1, 2, 3, 4, 5, 6, 0, 7];
  editSchedule = false;
  reportIds = [];
  dayStringArray = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "นขัตฤกษ์"];
  dayStringArray2 = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์"];
  dayStyleArray = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "holiday"];
  branchArray: any = [
    "BL",
    "BG", "BW", "BB",
    "BC", "BS", "BP",
    "BNG", "BR", "BH",
    "BU", "BPK", "BN",
    "BA", "BQ"
  ];
  scheduleId = null;
  schedules = [];
  month:any = new Date().getMonth();
  year:any = new Date().getFullYear();
  months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม'
  , 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
  result: any = {numLate1: 0, numLate2:0, numLate3: 0, numOT: 0, numHoliday: 0, numDayOff: 0,
  numSick: 0, numAffair: 0, numVacation: 0, numAbsent: 0, others: 0, bonus: 0, returnVacation: 0, offset: 0, tax: 0};
  errorMessage2 = null;
  hoveredDay = null;
  statusArray = ['Super', 'พนักงานทั่วไป', 'พนักงานพาร์ทไทม์', 'ทดลองงาน'];
  toEditEmployee = false;
  ngEmployee = null;

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    var month = Number(this.route.snapshot.queryParamMap.get('month'));
    var year = Number(this.route.snapshot.queryParamMap.get('year'));
    month && month >= 0 && month <= 11? this.month = month: '';
    year && year >= this.year - 4 && year <= this.year? this.year = year: '';
    this.requestEmployee().then(() => {
      if (this.employee.reports.length != 0) {
        this.processReport();
        this.createMonthly();
      }
    }).catch((err) => {
      console.log(err);
    });
    this.getSchedules();
    this.route.queryParams.subscribe(params => {
      this.hoveredDay = null;
      this.requestEmployee().then(() => {
        if (this.employee.reports.length != 0) {
          this.processReport();
          this.createMonthly();
        }
      }).catch((err) => {
        console.log(err);
      });
      this.getSchedules();
    });
  }

  requestEmployee() {
    return new Promise ((resolve, reject) => {
      const id = this.route.snapshot.params['id'];
      this.router.navigate([`/employees/${id}`], {queryParams: {month: this.month, year: this.year}});
      this.http.get<any>(`/api/employees/${id}?month=${this.month}&&year=${this.year}`).subscribe((data) => {
        this.employee = data;
        this.ngEmployee = JSON.parse(JSON.stringify(this.employee));
        this.scheduleId = this.employee.schedule._id;
        resolve();
      }, (err) => {
        this.router.navigate(['/home']);
        reject(err);
      });
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

  getDay(date) {
    return new Date(date).getDay();
  }

  dayOff(timeObject) {
    return timeObject.in.hour == 0 && timeObject.in.minute == 0 && timeObject.out.hour == 0 && timeObject.out.minute == 0;
  }

  approveOT(id, hours) {
    this.http.put<any>(`/api/reports/${id}/ot/approve`, {hours}).subscribe((data) => {
      this.requestEmployee().then(() => {
        this.processReport();
        this.updateMonthly();
        this.checked = false;
      }).catch((err) => {
        console.log(err);
      });
    }, (err) => {
      console.log(err);
    });
  }

  dismissOT(id) {
    this.http.delete<any>(`/api/reports/${id}/detectOT`).subscribe((data) => {
      this.requestEmployee();
      this.checked = false;
    }, (err) => {
      console.log(err);
    });
  }

  updateAbsent(id, type) {
    this.http.put<any>(`/api/reports/${id}/absent`, {type}).subscribe((data) => {
      this.requestEmployee().then(() => {
        this.processReport();
        this.updateMonthly();
        this.checked = false;
      }).catch((err) => {
        console.log(err);
      });
      this.showEdit = [];
      this.showEditStatus = [];
    }, (err) => {
      console.log(err);
    });
  }

  removeSpecial(id, type) {
    this.http.delete<any>(`/api/reports/${id}/special?type=${type}`).subscribe((data) => {
      this.requestEmployee().then(() => {
        this.processReport();
        this.updateMonthly();
        this.checked = false;
      }).catch((err) => {
        console.log(err);
      });
    }, (err) => {
      console.log(err);
    });
  }

  showReadableDate(timeObject) {
    var hour = timeObject.hour;
    var minute = timeObject.minute;
    var output = "" + hour;
    if (Number(minute) <= 9) {
      minute = "0" + minute;
    }
    if (Number(minute) != 0) {
      output += `:${minute}`;
    }
    return output;
  }

  getMonth() {
    return this.months[new Date().getMonth()];
  }

  getYear(offset) {
    return (new Date().getFullYear())-Number(offset);
  }

  processReport() {
    this.result = {numLate1: 0, numLate2: 0, numLate3: 0, numOT: 0, numHoliday: 0, numDayOff: 0,
    numSick: 0, numAffair: 0, numVacation: 0, numAbsent: 0, others: 0, bonus: 0, returnVacation: 0, offset: 0, tax: 0};
    var count = 0;
    this.employee.reports.forEach((report) => {
      if (report.lateStatus == 1) {
        this.result.numLate1++;
      } else if (report.lateStatus == 2) {
        this.result.numLate2++;
      } else if (report.lateStatus == 3) {
        this.result.numLate3++;
      }
      if (report.ot) {
        this.result.numOT += report.otHours;
      }
      if (report.onDayOff) {
        this.result.numDayOff++;
      }
      if (report.onHoliday) {
        this.result.numHoliday++;
      }
      if (report.absent) {
        if (report.absentStatus == 1) {
          this.result.numSick += report.absentDays;
        }
        if (report.absentStatus == 0) {
          this.result.numAffair += report.absentDays;
        }
        if (report.absentStatus == 3) {
          this.result.numVacation += report.absentDays;
        }
        if (report.absentStatus == 5) {
          this.result.numAbsent += report.absentDays;
        }
      }
      if (this.employee.monthlyReports[0]) {
        this.result.others = this.employee.monthlyReports[0].result.others;
        this.result.bonus = this.employee.monthlyReports[0].result.bonus;
        this.result.offset = this.employee.monthlyReports[0].result.offset;
        this.result.returnVacation = this.employee.monthlyReports[0].result.returnVacation;
        this.result.tax = this.employee.monthlyReports[0].result.tax;
      }
      this.reportIds.push(report._id);
    });
  }

  createMonthly() {
    var body = {
      result: this.result,
      reportIds: this.reportIds,
      month: this.month,
      year: this.year
    }
    const id = this.route.snapshot.params['id'];
    this.http.post<any>(`/api/employees/${id}/monthlies`, body).subscribe((data) => {
      this.checked = data.checked;
    }, (err) => {
      console.log(err);
    });
  }

  updateMonthly() {
    var body = {
      result: this.result,
      month: this.month,
      year: this.year
    }
    const id = this.route.snapshot.params['id'];
    this.http.put<any>(`/api/employees/${id}/monthlies`, body).subscribe((data) => {
      this.requestEmployee();
    }, (err) => {
      console.log(err);
    });
  }

  updateForm(e) {
    this.scheduleId = e.srcElement.value;
  }

  getSchedules() {
    this.http.get<any>(`/api/schedules/list`).subscribe((data) => {
      this.schedules = data;
    }, (err) => {
      console.log(err);
    });
  }

  onEditSchedule() {
    const id = this.route.snapshot.params['id'];
    this.http.put<any>(`/api/employees/${id}/schedule`, {scheduleId: this.scheduleId}).subscribe((data) => {
      this.editSchedule = false;
      this.requestEmployee();
    }, (err) => {
      console.log(err);
    });
  }

  approve() {
    const id = this.route.snapshot.params['id'];
    this.http.put<any>(`/api/employees/${id}/monthlies/approve`, {month: this.month, year: this.year, result: this.result}).subscribe((data) => {
      this.requestEmployee().then(() => {
        this.processReport();
        this.checked = true;
      }).catch((err) => {
        console.log(err);
      });
    }, (err) => {
      this.errorMessage2 = err.error.message;
      setTimeout(() => {
        this.errorMessage2 = null;
      }, 3000);
    });
  }

  onHover(date, holiday, br) {
    var day:any;
    if (this.hoveredDay) {
      if (this.getDay(date) == this.hoveredDay.day) {
        return this.hoveredDay = null;
      }
    }
    if (holiday) {
      day = "7";
    } else {
      day = this.getDay(date);
    }
    this.hoveredDay = {day, holiday, break: br};
  }

  invalidEdit() {
    if (!this.ngEmployee.firstname) {
      return true;
    }
    if (!this.ngEmployee.lastname) {
      return true
    }
    if (!this.ngEmployee.code) {
      return true;
    }
    return false;
  }

  onEditEmployee() {
    const id = this.route.snapshot.params['id'];
    this.http.put(`/api/employees/${id}`, {employee: this.ngEmployee}).subscribe((data) => {
      this.requestEmployee();
      this.toEditEmployee = false;
    }, (err) => {
      console.log(err);
    });
  }

  onToggleLate(id) {
    this.http.put<any>(`/api/reports/${id}/lateStatus`, null).subscribe((data) => {
      this.requestEmployee().then(() => {
        this.processReport();
        this.updateMonthly();
        this.checked = false;
      }).catch((err) => {
        console.log(err);
      });
    }, (err) => {
      console.log(err);
    });
  }
}
