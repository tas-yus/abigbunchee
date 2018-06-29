import { Component, OnInit } from '@angular/core';
// import { AuthService} from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IMyDpOptions} from 'mydatepicker';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'day-list',
  templateUrl: './day-list.component.html',
  styleUrls: ['./day-list.component.css']
})

export class DayListComponent implements OnInit {
  holidays = [];
  breaks = [];
  deleteDays = false;
  addHoliday = false;
  addBreak = false;
  year:any = new Date().getFullYear();
  months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม'
  , 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
  monthAbbrevs = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.'
  , 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  date = null;
  to = null;
  from = null;
  errorMessage4 = null;
  successMessage = null;

  public myDatePickerOptions: IMyDpOptions = {
      dateFormat: 'dd/mm/yyyy',
   };

  private placeholder: string = " วัน/เดือน/ปี";

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    var month = Number(this.route.snapshot.queryParamMap.get('month'));
    var year = Number(this.route.snapshot.queryParamMap.get('year'));
    year && year >= this.year - 4 && year <= this.year? this.year = year: '';
    this.requestDates();
  }

  requestDates() {
    this.router.navigate([`/days`], {queryParams: {year: this.year}});
    this.http.get<any>(`/api/days?year=${this.year}`).subscribe((data) => {
      this.holidays = data.holidays;
      this.breaks = data.breaks;
    }, (err) => {
      console.log(err);
    });
  }

  getDate(date) {
    var newDate = new Date(date);
    return newDate.toLocaleDateString().split("/")[1];
  }

  getMonth(date) {
    var newDate = new Date(date);
    return newDate.toLocaleDateString().split("/")[0];
  }

  getYear(offset) {
    return (new Date().getFullYear())-Number(offset);
  }

  onDateChanged(e) {
    this.date = e.formatted;
  }

  onDateFromChanged(e) {
    this.from = e.formatted;
  }

  onDateToChanged(e) {
    this.to = e.formatted;
  }

  onAddDate(form: NgForm) {
    var title = form.value.title;
    this.http.post(`/api/holidays`, {title, date: this.date, year: this.year}).subscribe(() => {
      this.date = null;
      this.addHoliday = false;
      this.requestDates();
    }, (err) => {
      this.date = null;
    });
  }

  onAddBreak(form: NgForm) {
    this.http.post<any>(`/api/breaks`, {from: this.from, to: this.to, year: this.year}).subscribe((data) => {
      this.from = null;
      this.to = null;
      this.addBreak = false;
      this.requestDates();
      // this.successMessage = data.message;
      // setTimeout(() => {
      //   this.successMessage = null;
      // }, 5000);
    }, (err) => {
      this.errorMessage4 = err.error.message;
      setTimeout(() => {
        this.errorMessage4 = null;
      }, 3000);
    });
  }

  onDeleteHoliday(id) {
    this.http.delete(`/api/holidays/${id}`).subscribe(() => {
      this.requestDates();
    }, (err) => {
      console.log(err);
    });
  }

  onDeleteBreak(id) {
    this.http.delete(`/api/breaks/${id}`).subscribe(() => {
      this.requestDates();
    }, (err) => {
      console.log(err);
    });
  }
}
