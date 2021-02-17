import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Device } from 'src/app/entities/device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.css'],
})
export class DeviceFormComponent implements OnInit {
  @Input() device: Device;
  @Input() buttonText: string;

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    if (this.device) {
      this.deviceEdit(this.device);
    }
  }

  deviceForm = new FormGroup({
    id: new FormControl({ value: null, disabled: true }),
    serialNumber: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  });

  submitDeviceForm(form) {
    let id = form.getRawValue().id;
    if (id != null) {
      this.deviceService.updateDevice(this.deviceForm.value);
    } else {
      this.deviceService.createDevice(this.deviceForm.value);
    }
    this.deviceForm.reset();
  }

  cancel() {
    this.deviceForm.reset();
    // this.deviceForm.type.setValue("");
    this.deviceService.deviceForm.emit(false);
  }

  deviceEdit(device: Device) {
    this.deviceForm.controls.id.enable();
    this.deviceForm.setValue({
      id: device.id,
      serialNumber: device.serialNumber,
      description: device.description,
      type: device.type,
    });
  }
}
