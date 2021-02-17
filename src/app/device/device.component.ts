import { Component, OnInit } from '@angular/core';
import { Device } from '../entities/device';
import { DeviceService } from './device.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css'],
})
export class DeviceComponent implements OnInit {
  devices: Device[];
  deviceForm = false;
  editMode = false;

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceService.getDevices().subscribe((res) => {
      this.devices = res;
    });
  }

  ngDoCheck(): void {
    this.deviceService.deviceForm.subscribe((res: boolean) => {
      this.deviceForm = res;
    });
  }

  deleteDevice(id: string) {
    this.deviceService.deleteDevice(id).subscribe(() => {
      //filter out device
      this.devices = this.devices.filter((dev) => {
        return dev.id !== id;
      });
      this.deviceService.devices = this.devices;
    });
  }

  editDevice(device: Device) {
    this.editMode = !this.editMode;
    // this.deviceService.selectedDevice.emit(device);
  }
}
