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
    serialNumber: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
    description: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
    type: new FormControl('', [Validators.required]),
    employeeId: new FormControl({ value: null }),
  });

  submitDeviceForm(form) {
    let id = form.getRawValue().id;
    if (id != null) {
      this.deviceService.updateDevice(this.deviceForm.value);
    } else {
      this.deviceService.createDevice(this.deviceForm.value);
    }
    // this.deviceForm.reset();
  }

  cancel() {
    // this.deviceForm.reset();
    // this.deviceForm.type.setValue("");
    this.deviceService.editMode.emit(false);
  }

  deviceEdit(device: Device) {
    if (!device.employeeId) {
      device.employeeId = null;
    }
    this.deviceForm.controls.id.enable();
    this.deviceForm.setValue({
      id: device.id,
      serialNumber: device.serialNumber,
      description: device.description,
      type: device.type,
      employeeId: device.employeeId,
    });
  }
}
