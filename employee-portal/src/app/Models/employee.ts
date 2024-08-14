export class Employee {

    id: string;
    userName: string;
    name: {}; // TODO: Placeholder for Name Object
    displayName: string;
    userType: string;
    active: boolean;
    password: string;
    emails: any[]; // TODO: Placeholder for Email Object
    employeeDetails: {}; // TODO: Placeholder for EmployeeDetails Object
    manager: {}; // TODO: Placeholder for Manager Object


    constructor(id: string, userName: string, name: {}, displayName: string, userType: string, active: boolean, password: string, emails: any[], employeeDetails: {}, manager: {}) {
        this.id = id;
        this.userName = userName;
        this.name = name;
        this.displayName = displayName;
        this.userType = userType;
        this.active = active;
        this.password = password;
        this.emails = emails;
        this.employeeDetails = employeeDetails;
        this.manager = manager;
    }

}
