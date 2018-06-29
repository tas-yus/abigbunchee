import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ReportListComponent } from "./report/report-list/report-list.component";
import { ReportShowComponent } from "./report/report-show/report-show.component";
import { EmployeeShowComponent } from "./employee-show/employee-show.component";
import { ScheduleListComponent } from "./schedule/schedule-list/schedule-list.component";
import { DayListComponent } from "./day/day-list/day-list.component";
// import { StudentEditComponent } from "./student/student-edit/student-edit.component";
// import { StudentListComponent } from "./student/student-list/student-list.component";
// import { BookListComponent } from "./book/book-list/book-list.component";
// import { BookShowComponent } from "./book/book-show/book-show.component";
// import { OrderEditComponent } from './order/order-edit/order-edit.component';
// import { OrderListComponent } from './order/order-list/order-list.component';
// import { OrderSearchComponent } from './order/order-search/order-search.component';
// import { LoginComponent } from './login/login.component';
// import { SettingComponent } from './setting/setting.component';
// import { SettingGroupComponent } from './setting/setting-group/setting-group.component';
// import { SettingCourseEditComponent } from './setting/setting-course-edit/setting-course-edit.component';
// import { SettingCourseComponent } from './setting/setting-course/setting-course.component';
// import { SettingBookComponent } from './setting/setting-book/setting-book.component';
// import { SettingGroupEditComponent } from './setting/setting-group-edit/setting-group-edit.component';
// import { SettingUserComponent } from './setting/setting-user/setting-user.component';
// import { AuthGuard } from './auth-guard.service';
// import { AdminGuard } from './admin-guard.service';
// import { SettingGuard } from './setting-guard.service';


const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'  },
  // { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'reports', component: ReportListComponent },
  { path: 'reports/:id', component: ReportShowComponent },
  { path: 'employees/:id', component: EmployeeShowComponent },
  { path: 'schedules', component: ScheduleListComponent },
  { path: 'days', component: DayListComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
