import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee';

@Injectable()
export class EmployeeService {
  constructor(private http: HttpClient) {}

  url: string = 'http://4.156.40.62:9001/employee';
  // url: string = 'http://localhost:9001/employee';

  getAllEmployees() {
    return this.http.get(this.url, {
      observe: 'response',
    });
  }

  getEmployeeById(id: string) {
    return this.http.get(this.url + '/' + id, {
      observe: 'response',
    });
  }

  getEmployeeByEmail(email: string) {
    return this.http.get(this.url + '/email/' + email, {
      observe: 'response',
    });
  }

  createEmployee(employee: Employee) {
    return this.http.post(this.url + 'api/users', employee, {
      observe: 'response',
    });
  }

  updateEmployee(employee: Employee) {
    return this.http.put(this.url + 'api/users/' + employee.id, employee, {
      observe: 'response',
    });
  }

  deleteEmployee(id: string) {
    return this.http.delete(this.url + 'api/users/' + id, {
      observe: 'response',
    });
  }
}
