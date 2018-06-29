import { Component, OnInit } from '@angular/core';
// import { AuthService} from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})

export class ScheduleListComponent implements OnInit {
  fixBreak = [];
  fixUsual = [];
  employee = null;
  dayArray = [1, 2, 3, 4, 5, 6, 0, 7];
  addSchedule = false;
  editSchedule = [];
  ngSchedules = [];
  dayStringArray = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "นขัตฤกษ์"];
  dayStyleArray = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "holiday"];
  branchArray: any = [
    "Admin",
    "BG", "BW", "BB",
    "BC", "BS", "BP",
    "BNG", "BR", "BH",
    "BU", "BPK", "BN",
    "BA", "BQ"
  ];
  schedules = [];
  daySchedule = {
    in: {
      hour: 0,
      minute: 0
    },
    out: {
      hour: 0,
      minute: 0
    }
  }
  newSchedule = {
    usual: {
      0: JSON.parse(JSON.stringify(this.daySchedule)),
      1: JSON.parse(JSON.stringify(this.daySchedule)),
      2: JSON.parse(JSON.stringify(this.daySchedule)),
      3: JSON.parse(JSON.stringify(this.daySchedule)),
      4: JSON.parse(JSON.stringify(this.daySchedule)),
      5: JSON.parse(JSON.stringify(this.daySchedule)),
      6: JSON.parse(JSON.stringify(this.daySchedule)),
      7: JSON.parse(JSON.stringify(this.daySchedule))
    },
    break: {
      0: JSON.parse(JSON.stringify(this.daySchedule)),
      1: JSON.parse(JSON.stringify(this.daySchedule)),
      2: JSON.parse(JSON.stringify(this.daySchedule)),
      3: JSON.parse(JSON.stringify(this.daySchedule)),
      4: JSON.parse(JSON.stringify(this.daySchedule)),
      5: JSON.parse(JSON.stringify(this.daySchedule)),
      6: JSON.parse(JSON.stringify(this.daySchedule)),
      7: JSON.parse(JSON.stringify(this.daySchedule))
    }
  }
  title = null;

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.requestSchedules();
  }

  dayOff(timeObject) {
    return timeObject.in.hour == 0 && timeObject.in.minute == 0 && timeObject.out.hour == 0 && timeObject.out.minute == 0;
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

  requestSchedules() {
    this.http.get<any[]>(`/api/schedules`).subscribe((data) => {
      this.schedules = data;
      this.ngSchedules = JSON.parse(JSON.stringify(this.schedules));
      // this.processReport();
      // if (this.employee.reports.length != 0) {
      //   this.createMonthlyReportArray(this.employee.reports[0].date);
      //   console.log(this.monthlyReport);
      // }
    }, (err) => {
      console.log(err);
    });
  }

  getSchedule(schedules, id) {
    var schedules = schedules.filter((s) => { return s._id == id } );
    return schedules[0];
  }

  onEditSchedule(id) {
    this.http.put<any>(`/api/schedules/${id}`, {schedule: this.getSchedule(this.ngSchedules, id)}).subscribe((data) => {
      this.requestSchedules();
      this.editSchedule = [];
      this.fixUsual = [];
      this.fixBreak = [];
    }, (err) => {
      console.log(err);
    });
  }

  onAddSchedule() {
    this.http.post<any>(`/api/schedules`, {schedule: this.newSchedule, title: this.title}).subscribe((data) => {
      this.requestSchedules();
      this.newSchedule = {
        usual: {
          0: JSON.parse(JSON.stringify(this.daySchedule)),
          1: JSON.parse(JSON.stringify(this.daySchedule)),
          2: JSON.parse(JSON.stringify(this.daySchedule)),
          3: JSON.parse(JSON.stringify(this.daySchedule)),
          4: JSON.parse(JSON.stringify(this.daySchedule)),
          5: JSON.parse(JSON.stringify(this.daySchedule)),
          6: JSON.parse(JSON.stringify(this.daySchedule)),
          7: JSON.parse(JSON.stringify(this.daySchedule))
        },
        break: {
          0: JSON.parse(JSON.stringify(this.daySchedule)),
          1: JSON.parse(JSON.stringify(this.daySchedule)),
          2: JSON.parse(JSON.stringify(this.daySchedule)),
          3: JSON.parse(JSON.stringify(this.daySchedule)),
          4: JSON.parse(JSON.stringify(this.daySchedule)),
          5: JSON.parse(JSON.stringify(this.daySchedule)),
          6: JSON.parse(JSON.stringify(this.daySchedule)),
          7: JSON.parse(JSON.stringify(this.daySchedule))
        }
      }
      this.title = null;
      this.addSchedule = false;
    }, (err) => {
      console.log(err);
    });
  }
}
