import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Notification } from '../Models/notification';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  //url: String = 'http://localhost:8082/notification/';
  url: String = 'http://4.156.40.62:9001/notification/';

  private unreadNotificationsSubject = new BehaviorSubject<number>(0);
  unreadNotifications$ = this.unreadNotificationsSubject.asObservable();

  notifications: Notification[] = [
    {
      notificationId: 1,
      identityId: 'user1',
      applicationId: 'app1',
      message: 'Notification 1',
      checked: false,
      createdAt: 1633036800000,
    },
    {
      notificationId: 2,
      identityId: 'user2',
      applicationId: 'app2',
      message: 'Notification 2',
      checked: true,
      createdAt: 1633123200000,
    },
    {
      notificationId: 3,
      identityId: 'user3',
      applicationId: 'app3',
      message: 'Notification 3',
      checked: false,
      createdAt: 1633209600000,
    },
  ];

  constructor(private http: HttpClient) {}

  getNotificationsById(id: string): Observable<Notification[]> {
    return of(this.notifications);
  }

  fetchUnreadNotifications(id: string): void {
    this.getNumberOfUnreadNotificationsById(id).subscribe(
      unreadCount => this.unreadNotificationsSubject.next(unreadCount)
    );
  }

  getNumberOfUnreadNotificationsById(id: string): Observable<number> {
    return this.getNotificationsById(id).pipe(
      map(
        (notifications) =>
          notifications.filter((notification) => !notification.checked).length
      )
    );
  }
}

// getNotificationsById(id: string) {
//   return this.http.get(this.url + 'notifications/' + id, { observe: 'response' });
// }

// checkNotifictionsById(id: string) {
//   return this.http.delete(this.url + 'check/' + id, { observe: 'response' });
// }