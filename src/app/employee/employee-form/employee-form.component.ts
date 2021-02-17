import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/entities/employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {

	@Input() employee:Employee;

  constructor(private employeeService: EmployeeService) {}

  employeeForm = new FormGroup({
    id: new FormControl({ value: null, disabled: true }),
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    image: new FormControl(''),
  });

  submitEmployeeForm(form) {
    let id = form.getRawValue().id;
    if (id != null) {
      this.employeeService.editEmployee(this.employeeForm.value);
    } else {
      this.employeeService.createEmployee(this.employeeForm.value);
    }
    this.employeeForm.reset();
  }

  cancel() {
    this.employeeForm.reset();
    this.employeeService.showForm.emit(false);
  }

  employeeEdit(employee) {
    this.employeeForm.controls.id.enable();
    this.employeeForm.setValue({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      image: employee.image,
    });
  }

  ngOnInit(): void {
    if (this.employee) {
      this.employeeEdit(this.employee);
    }
    this.employeeForm.setErrors(null);
  }
  ngAfterViewInit() {}
}
