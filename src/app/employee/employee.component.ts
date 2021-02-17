import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../entities/employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employees: Employee[];
  showForm = false;
  showDetails = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employees = this.employeeService.employees;
  }

  ngDoCheck(): void {
    this.employeeService.showForm.subscribe((res: boolean) => {
      this.showForm = res;
    });
  }
  
  viewEmployeeDetails(employee: Employee) {
    this.employeeService.selectedEmployee.emit(employee);
  }

  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      // this.employees = this.employees.filter((emp) => {
      //   return emp.id !== id;
      // })
      this.employeeService.getEmployees();
      this.employees = this.employeeService.employees;
    });
  }
}
