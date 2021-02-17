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
  editMode = false;
  deviceIndexToEdit:number;

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceService.getDevices().subscribe((res) => {
      this.devices = res;
    });
  }

  ngDoCheck(): void {
    this.deviceService.editMode.subscribe((res: boolean) => {
      this.editMode = res;
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

  editDevice(index: number) {
    this.deviceIndexToEdit = index;
    this.editMode = !this.editMode;
  }
}
