import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee';
import { AuthService } from './auth.service';

@Injectable()
export class EmployeeService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  url: string = 'http://4.156.40.62:9001/employee';
  // url: string = 'http://localhost:9001/employee';

  private getHeaders() {
    return this.authService.getHeaders();
  }

  getAllEmployees() {
    return this.http.get(this.url, {
      headers: this.getHeaders(),
      observe: 'response',
    });
  }

  getEmployeeById(id: string) {
    return this.http.get(this.url + '/' + id, {
      headers: this.getHeaders(),
      observe: 'response',
    });
  }
  getEmployeeByEmail(email: string) {
    return this.http.get(this.url + '/email/' + email, {
      headers: this.getHeaders(),
      observe: 'response',
    });
  }

  createEmployee(employee: Employee) {
    return this.http.post(this.url + 'api/users', employee, {
      headers: this.getHeaders(),
      observe: 'response',
    });
  }

  updateEmployee(employee: Employee) {
    return this.http.put(this.url + 'api/users/' + employee.id, employee, {
      headers: this.getHeaders(),
      observe: 'response',
    });
  }

  deleteEmployee(id: string) {
    return this.http.delete(this.url + 'api/users/' + id, {
      headers: this.getHeaders(),
      observe: 'response',
    });
  }
}
