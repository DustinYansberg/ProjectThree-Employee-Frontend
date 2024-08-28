import { Email } from 'src/app/Models/email';
import { EmployeeDetail } from 'src/app/Models/employeeDetail';
import { EmployeeService } from 'src/app/Services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/Services/user.service';
import { Meta } from '../../Models/meta';
import { Employee } from 'src/app/Models/employee';
import { Manager } from 'src/app/Models/manager';
import { Name } from 'src/app/Models/name';

@Component({
  templateUrl: './employee-detail.component.html',
  providers: [MessageService],
})
export class EmployeeDetailComponent implements OnInit {
  employeeDetails: EmployeeDetail;

  // Grab the string from the observable in the user service
  public identityId: string;

  employee: Employee;

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private router: Router,
    private userService: UserService
  ) {}

  employeeDialog: boolean = false;
  editMode: boolean = false; 
  // editedEmployee: Employee = new Employee("", "", new Name("", "", ""), "", "employee", false, "", [new Email("", "", true)],
  //  new EmployeeDetail("","","",false,"",new Meta(new Date(), new Date()),"",), new Manager("", "", ""));

  ngOnInit() {
    /* These stacked subscribe methods populate the 
       identityId by the current gmail for the rest of the user session */
    this.userService.getEmployeeId().subscribe((data) => {
      this.userService.idSubject.next(data.body.id);
      this.userService.idObservable.subscribe((id) => {
        this.identityId = id;
        // ---------------------

        this.employeeService.getEmployeeById(this.identityId).subscribe({
          next: (response) => {
            let employeeResponse: any = response.body;
            console.log(employeeResponse);
            if (
              !employeeResponse.emails ||
              !employeeResponse.emails[0] ||
              !employeeResponse.emails[0].value
            ) {
              employeeResponse.emails = [new Email('', ' ', true)];
            }
            if (
              !employeeResponse.manager ||
              !employeeResponse.manager.displayName
            ) {
              employeeResponse.manager = new Manager('N/A', 'N/A', 'N/A');
            }
            this.employee = new Employee(
              employeeResponse.id,
              employeeResponse.userName,
              employeeResponse.name,
              employeeResponse.displayName,
              employeeResponse.userType,
              employeeResponse.active,
              employeeResponse.password,
              employeeResponse.emails,
              employeeResponse.employeeDetails,
              employeeResponse.manager
            );
            console.log(this.employee);
            console.log(this.employee.emails);
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.message,
              life: 3000,
            });
            this.router.navigate(['/notfound']);
          },
        });
      });
    });
  }

  editEmployee() {
    this.employeeDialog = true;
    this.editMode = !this.editMode;
  }

  toggleEditMode(){
    this.editMode = !this.editMode;
  }
}
