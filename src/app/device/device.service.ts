import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, retry, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Device } from '../entities/device';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  baseUrl = environment.baseUrl;
  @Output() selectedDevice = new EventEmitter();
  @Output() editMode = new EventEmitter<boolean>();
  devices: Device[] = [];

  constructor(private http: HttpClient) {
    this.getDevices();
  }

  createDevice(device: Device) {
    this.http
      .post(`${this.baseUrl}/Devices.json`, device)
      .pipe(retry(3))
      .subscribe((res) => {
        this.devices.push(
          new Device(res['name'], device.serialNumber, device.description, device.type),
        );
        this.editMode.emit(false);
      });
  }

  getDevices(): Observable<Device[]> {
    this.devices = [];
    return this.http.get(`${this.baseUrl}/Devices.json`).pipe(
      map((res) => {
        for (let key in res) {
          this.devices.push(
            new Device(
              key,
              res[key].serialNumber,
              res[key].description,
              res[key].type,
              res[key].employeeId,
            ),
          );
        }
        return this.devices;
      }),
    );
  }

  updateDevice(device: Device) {
    this.http.put(`${this.baseUrl}/Devices/${device.id}.json`, device).subscribe((res: any) => {
      for (let i = 0; i < this.devices.length; i++) {
        // console.log(res);
        if (this.devices[i].id === res.id) {
          this.devices[i].serialNumber = res.serialNumber;
          this.devices[i].description = res.description;
          this.devices[i].type = res.type;
        }
      }
      this.editMode.emit(false);
    });
  }

  deleteDevice(deviceId: string): Observable<{}> {
    return this.http
      .delete(`${this.baseUrl}/Devices/${deviceId}.json`)
      .pipe(catchError(this.processError));
  }

  removeEmployee(deviceId: string): Observable<{}> {
    return this.http
      .patch(`${this.baseUrl}/Devices/${deviceId}.json`, { employeeId: '' })
      .pipe(catchError(this.processError));
  }

  addEmployee(deviceId: string, employeeId: string): Observable<{}> {
    return this.http
      .patch(`${this.baseUrl}/Devices/${deviceId}.json`, { employeeId: `${employeeId}` })
      .pipe(catchError(this.processError));
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
