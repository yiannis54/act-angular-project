import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { DeviceService } from 'src/app/device/device.service';
import { Device } from 'src/app/entities/device';
import { Employee } from 'src/app/entities/employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit {
  @ViewChild('addDevice') myform: NgForm | undefined;

  constructor(private employeeService: EmployeeService, private deviceService: DeviceService) {}

  employee: Employee;
  employeeDevices: Device[] = [];
  showDetails = false;
  showForm = false;
  availableDevices: Device[] = [];

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.employeeService.showForm.subscribe((res: boolean) => {
      this.showForm = res;
    });
  }
  
  ngAfterContentInit() {
    this.employeeService.selectedEmployee.subscribe((res: Employee) => {
      this.employee = res;
      this.getDeviceList(res.id);
      this.showForm = false;
      this.showDetails = true;
    });
  }

  // use one call to fill both employeeDevices and availableDevices
  private getDeviceList(employeeId): void {
    this.employeeService.getEmployeeDevices().subscribe((devices) => {
      // fill the lists in one iteration
      this.employeeDevices = [];
      this.availableDevices = [];

      for (let dev in devices) {
        let tmp = new Device(
          dev,
          devices[dev].serialNumber,
          devices[dev].description,
          devices[dev].type,
          devices[dev].employeeId,
        );

        // employeeDevices
        if (devices[dev].employeeId === employeeId) {
          this.employeeDevices.push(tmp);
        }
        // availableDevices
        if (!devices[dev].employeeId || devices[dev].employeeId === '') {
          this.availableDevices.push(tmp);
        }
      }
    });
  }

  deleteEmployeeDevice(deviceId: string): void {
    this.deviceService.removeEmployee(deviceId).subscribe(() => {
      this.employeeDevices = this.employeeDevices.filter((device) => {
        device.id !== deviceId;
        this.availableDevices.push(device);
      });
    });
  }

  addEmployeeDevice(deviceId: string, employeeId: string): void {
    this.deviceService.addEmployee(deviceId, employeeId).subscribe(() => {
      this.getDeviceList(employeeId);
    });
  }
}
