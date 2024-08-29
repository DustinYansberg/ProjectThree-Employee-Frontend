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

  notifications: Notification[];

  constructor(
    private messageService: MessageService,
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.userService.idObservable.subscribe((id) => {
      this.identityId = id;
    });
    console.log(this.identityId);
  }

  // this.notificationService.getNotificationsById('abc123').subscribe({
  //   next: (response: any) => {
  //     let notificationResponse: any = response.body;
  //     console.log(notificationResponse);

  //     // Assuming notificationResponse is an array of notification objects
  //     let notifications: Notification[] = notificationResponse.map(
  //       (notification: any) => ({
  //         notificationId: notification.notificationId,
  //         identityId: notification.identityId,
  //         applicationId: notification.applicationId,
  //         message: notification.message,
  //         checked: notification.checked,
  //         createdAt: notification.createdAt,
  //       })
  //     );
  ngOnInit() {
    this.notificationService.getNotificationsById('abc123').subscribe({
      next: (notifications: Notification[]) => {
        this.notifications = notifications;
        console.log(this.notifications);
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
  }
}
