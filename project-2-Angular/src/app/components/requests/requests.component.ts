import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { timeout } from 'rxjs';
import { Email } from 'src/app/Models/email';
import { Employee } from 'src/app/Models/employee';
import { EmployeeDetail } from 'src/app/Models/employeeDetail';
import { Manager } from 'src/app/Models/manager';
import { Name } from 'src/app/Models/name';

import { RequestService } from 'src/app/Services/request.service';
import { Request } from '../../Models/request';
import { Role } from '../../Models/role';
import { UserService } from 'src/app/Services/user.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { Entitlement } from 'src/app/Models/entitlement';

@Component({
  templateUrl: './requests.component.html',
  providers: [MessageService],
})
export class RequestsComponent implements OnInit {
  requests: Request[] = [];

  entitlements: Entitlement[] = [];

  entitlement: Entitlement = new Entitlement('','','','');

  possibleRequests: Request[] = [];

  defaultRequest: Request = new Request('', '', '', '', false, false, '');

  selectedRequest: Request[] = [];

  requestDialog: boolean = false;

  denyRequestDialog: boolean = false;

  denyRequestsDialog: boolean = false;

  approveRequestDialog: boolean = false;

  approveRequestsDialog: boolean = false;

  submitted: boolean = false;

  request: Request = this.defaultRequest;

  cols: any[];

  loading: boolean = false;

  // accounts: string[] = [
	// "Zendesk",
	// "Salesforce",
	// "Appian",
	// "SailPoint",
	// "ServiceNow",
	// "Custom",
  // ] ;

  employee: Employee;

  //get from gianni
  employeeApps: string[] = [
	"Zendesk",
	"Appian",
  "Salesforce"
  ];
  pagingEntitlements: any[] = [];

  identityId: string;

  manId: string;

  //add user service to get the logged user
  constructor(
    private requestService: RequestService,
    private messageService: MessageService,
    private userService: UserService,
	  private employeeService : EmployeeService
  ) {
	this.userService.idObservable.subscribe(id => {
	this.identityId = id});
	console.log(this.identityId)
  }

  ngOnInit() {
    this.loading = true;
    this.requests;
    this.possibleRequests;
    this.entitlements;
    this.employeeService.getEmployeeById(this.identityId).subscribe(
      {next: (response)=>{
        let resource: any = response.body;
        this.manId = resource.manager.value;
        
      }}
    );

	for (let appName of this.employeeApps) {
		//if the user has the account
    console.log(appName);
		  this.requestService.getByApp(appName).subscribe({
			next: (response) => {
			  let body: any = response.body;
			  body.forEach((element: any) => { 
				if (element) {
				  this.entitlements.push(element);
          console.log(element);
				}
			  });
			  this.loading = false;
			},
			error: (err) => {
			  console.error('Error fetching requests:', err);
			  this.loading = false;
			}
		  });
		 
	  }
    
	  this.pagingEntitlements = this.entitlements;
		
  }

  //get manager id by getEmployeeById(this.identityId) 
  //extract managerid from body
  //get note from form
  //user id from this.identityId
  //entitlementId = selectedEnttitlement.id
  
  createRequest()  {
		//if the user has the account
    console.log(this.manId, this.entitlement.name, this.identityId , this.entitlement.note);
		  this.requestService.createRequest(this.manId, this.entitlement.name, this.identityId , this.entitlement.note).subscribe({
			next: (response) => {
			  this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Request Submitted', life: 3000 });
			},
			error: (err) => {
			  console.error('Error fetching requests:', err);
			  this.loading = false;
			}
		  });
      this.requestDialog = false;
		 
	  }

  customSort(event: any) {
    event.data.sort((data1: any, data2: any) => {
      let value1 = this.resolveFieldData(data1, event.field);
      let value2 = this.resolveFieldData(data2, event.field);
      let result = null;

      // Check if value1 and value2 are objects and pull out their 'value' property
      if (typeof value1 === 'object' && value1 !== null) {
        value1 = value1[0].value;
      }
      if (typeof value2 === 'object' && value2 !== null) {
        value2 = value2[0].value;
      }

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }

  resolveFieldData(data: any, field: string): any {
    if (data && field) {
      let fields = field.split('.');
      let value = data;
      for (let i = 0; i < fields.length; i++) {
        if (value == null) {
          return null;
        }
        value = value[fields[i]];
      }
      return value;
    } else {
      return null;
    }
  }




  openNew(value: any) {
    this.entitlement.name =  value.displayableName;
    this.entitlement.application =  value.applicationDisplayName;
    this.submitted = false;
    this.requestDialog = true;
  }

  hideDialog() {
    this.requestDialog = false;
    this.submitted = false;
  }


  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.requests.length; i++) {
      if (this.requests[i].entitlementId === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
