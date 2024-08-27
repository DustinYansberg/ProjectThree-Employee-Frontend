import { Email } from 'src/app/Models/email';
import { EmployeeDetail } from 'src/app/Models/employeeDetail';
import { EmployeeService } from 'src/app/Services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/Services/user.service';
import { Meta } from '../../Models/meta';

@Component({
  templateUrl: './employee-detail.component.html',
  providers: [MessageService],
})
export class EmployeeDetailComponent implements OnInit {
  employeeDetails: EmployeeDetail;

  // Grab the string from the observable in the user service
  public identityId: string;

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private router: Router,
    private userService: UserService
  ) {}
  
  
  ngOnInit() {
    /* These stacked subscribe methods populate the 
       identityId by the current gmail for the rest of the user session */
    this.userService.getEmployeeId().subscribe(data => {
      this.userService.idSubject.next(data.body.id);
      this.userService.idObservable.subscribe(id => {
        this.identityId = id
    // ---------------------

        this.employeeService.getEmployeeById(this.identityId).subscribe({
          next: (response) => {
            let employeeResponse: any = response.body;
            this.employeeDetails = new EmployeeDetail(
              this.identityId || '',
              employeeResponse.userName || '',
              employeeResponse.displayName || '',
              employeeResponse.active || false,
              employeeResponse.emails[0].value
                ? employeeResponse.emails[0].value
                : 'N/A',
              new Meta(new Date(), new Date()),
              employeeResponse.employeeDetails?.isManager || false,
              employeeResponse.riskScore || 0,
              employeeResponse.manager?.displayName || 'N/A'
            );
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
}
