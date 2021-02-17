import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceComponent } from './device/device.component';
import { EmployeeComponent } from './employee/employee.component';
import { HeroComponent } from './hero/hero.component';

const routes: Routes = [
  { path: '', component: HeroComponent },
  { path: 'employees', component: EmployeeComponent },
  { path: 'devices', component: DeviceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
