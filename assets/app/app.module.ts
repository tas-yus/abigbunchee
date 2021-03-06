import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import { ClipboardModule } from 'ngx-clipboard';

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from './header/header.component';
import { ReportListComponent } from "./report/report-list/report-list.component";
import { ReportShowComponent } from "./report/report-show/report-show.component";
import { EmployeeShowComponent } from "./employee-show/employee-show.component";
import { ScheduleListComponent } from "./schedule/schedule-list/schedule-list.component";
import { DayListComponent } from "./day/day-list/day-list.component";
// import { StudentAddComponent } from "./student/student-add/student-add.component";
// import { StudentShowComponent } from "./student/student-show/student-show.component";
// import { StudentEditComponent } from "./student/student-edit/student-edit.component";
// import { StudentListComponent } from "./student/student-list/student-list.component";
// import { StudentSearchComponent } from "./student/student-search/student-search.component";
// import { BookListComponent } from "./book/book-list/book-list.component";
// import { BookShowComponent } from "./book/book-show/book-show.component";
// import { OrderEditComponent } from './order/order-edit/order-edit.component';
// import { OrderListComponent } from './order/order-list/order-list.component';
// import { OrderSearchComponent } from './order/order-search/order-search.component';
// import { LoginComponent } from './login/login.component';
// import { SettingComponent } from './setting/setting.component';
// import { SettingGroupComponent } from './setting/setting-group/setting-group.component';
// import { SettingGroupEditComponent } from './setting/setting-group-edit/setting-group-edit.component';
// import { SettingCourseEditComponent } from './setting/setting-course-edit/setting-course-edit.component';
// import { SettingUserComponent } from './setting/setting-user/setting-user.component';
// import { SettingCourseComponent } from './setting/setting-course/setting-course.component';
// import { SettingBookComponent } from './setting/setting-book/setting-book.component';
// import { MyDatePickerModule } from 'mydatepicker';
//

// import { AuthService } from './auth.service';
// import { AuthGuard } from './auth-guard.service';
// import { AdminGuard } from './admin-guard.service';
// import { SettingGuard } from './setting-guard.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        ReportListComponent,
        ReportShowComponent,
        EmployeeShowComponent,
        ScheduleListComponent,
        DayListComponent
    ],
    imports: [BrowserModule, AppRoutingModule, FormsModule,
      HttpClientModule, MyDatePickerModule, ClipboardModule],
    // providers: [AuthService, AuthGuard, AdminGuard, SettingGuard],
    bootstrap: [AppComponent]
})
export class AppModule {

}
