import { EventEmitter, Injectable, Output } from '@angular/core';
import { Employee } from '../entities/employee';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CreateEmployee } from '../entities/createEmployee.interface';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Device } from '../entities/device';
import { DeviceService } from '../device/device.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl = environment.baseUrl;
  @Output() selectedEmployee = new EventEmitter();
  @Output() showForm = new EventEmitter<boolean>();
  employees: Employee[] = [];
  employeeDevices: Device[] = [];

  constructor(private http: HttpClient, private deviceService: DeviceService) {
    this.getEmployees();    
  }

  createEmployee(employee: CreateEmployee) {
    this.http
      .post(`${this.baseUrl}/Employees.json`, employee)
      .pipe(retry(3))
      .subscribe((res) => {
        this.employees.push(
          new Employee(res['name'], employee.name, employee.email, employee.image),
        );
        this.showForm.emit(false);
      });
  }

  getEmployees() {
    this.employees = [];
    return this.http.get(`${this.baseUrl}/Employees.json`).subscribe((res) => {
      for (let key in res) {
        this.employees.push(
          new Employee(
            key,
            res[key].name,
            res[key].email,
            res[key].image,
          ),
        );
      }
    });
  }

  getEmployeeById(id: string) {
    return this.http.get(`${this.baseUrl}/Employees/${id}.json`)
      .pipe(catchError(this.processError))
  }

  editEmployee(employee: Employee) {
    this.http
      .put(`${this.baseUrl}/Employees/${employee.id}.json`, employee)
      .pipe(retry(3))
      .subscribe((res: any) => {
        for (let i = 0; i < this.employees.length; i++) {
          if (this.employees[i].id === res.id) {
            this.employees[i].name = res.name;
            this.employees[i].email = res.email;
            this.employees[i].image = res.image;
          }
        }
        this.showForm.emit(false);
      });
  }

  deleteEmployee(employeeId: string): Observable<{}> {
    this.getEmployeeDevices().subscribe((devices) => {
      for (let device in devices) {
        if (devices[device].employeeId === employeeId) {
          this.deviceService.removeEmployee(device).subscribe(() => {
            console.log(`employee removed from device ${device}`);
          });
        }
      }
    })
    return this.http
      .delete(`${this.baseUrl}/Employees/${employeeId}.json`)
      .pipe(catchError(this.processError));
  }

  getEmployeeDevices(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Devices.json`).pipe(catchError(this.processError));
  }

  private processError(err) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(message);
  }
}
