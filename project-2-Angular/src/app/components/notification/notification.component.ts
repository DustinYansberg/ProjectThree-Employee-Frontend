import { Notification } from 'src/app/Models/notification';
import { NotificationService } from 'src/app/Services/notification.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './notification.component.html',
  providers: [MessageService, UserService],
})
export class NotificationComponent implements OnInit {
  // Grab the string from the observable in the user service
  public identityId: string;

  notifications: Notification[] = [
    {
      notificationId: 1,
      identityId: 'ac160002917a122581917ac7d15d07a3',
      applicationId: 'ac12000290eb1baf8190f0a73ef80926',
      message: 'Gabe Guio has created an account for you in Salesforce.',
      checked: true,
      createdAt: 1724883606000,
    },
    {
      notificationId: 2,
      identityId: 'ac160002917a122581917ac7d15d07a4',
      applicationId: 'ac12000290eb1baf8190f0a73ef80927',
      message: 'Your password has been reset successfully.',
      checked: false,
      createdAt: 1724883607000,
    },
    {
      notificationId: 3,
      identityId: 'ac160002917a122581917ac7d15d07a5',
      applicationId: 'ac12000290eb1baf8190f0a73ef80928',
      message: 'You have a new message from HR.',
      checked: true,
      createdAt: 1724883608000,
    },
  ];

  constructor(
    private messageService: MessageService,
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    /* These stacked subscribe methods populate the 
       identityId by the current gmail for the rest of the user session */
    this.userService.getEmployeeId().subscribe((data) => {
      this.userService.idSubject.next(data.body.id);
      this.userService.idObservable.subscribe((id) => {
        this.identityId = id;
        // ---------------------

        this.notificationService
          .getNotificationsById(this.identityId)
          .subscribe({
            next: (response) => {
              let notificationResponse: any = response.body;
              console.log(notificationResponse);
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
