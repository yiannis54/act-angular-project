import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeviceComponent } from './device/device.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { EmployeeFormComponent } from './employee/employee-form/employee-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeviceFormComponent } from './device/device-form/device-form.component';
import { HeroComponent } from './hero/hero.component';

@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    EmployeeComponent,
    EmployeeDetailComponent,
    EmployeeFormComponent,
    DeviceFormComponent,
    HeroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
