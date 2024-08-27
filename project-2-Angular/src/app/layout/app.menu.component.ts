import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    //Change to /employeedetail/ (pass id from the login)
                    { label: 'My Info', icon: 'pi pi-fw pi-home', routerLink: ['/employeedetail/{id}'] },
                    //Change to view accounts rather than creating your own you must request them
                    { label: 'My Accounts', icon: 'pi pi-fw pi-sitemap', routerLink: ['/accounts'] },
                    // Roles with all role info to fill out the page, can request R and E from here
                    { label: 'My Roles and Entitlements', icon: 'pi pi-fw pi-users', routerLink: ['/requests'] },
                    // some frontend plugin or bonus feature
                    { label: 'Documents', icon: 'pi pi-fw pi-file-edit', routerLink: ['/documents'] },
                    // { label: 'IIQ Plugin', icon: 'pi pi-fw pi-check', routerLink: ['/plugin'] },
                    // { label: 'Profile', routerLink: ['/profile'] },
                ]
            }
        ];
    }
}
