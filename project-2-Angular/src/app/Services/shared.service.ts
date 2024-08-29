// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private unreadNotificationsSubject = new BehaviorSubject<number>(0);
  unreadNotifications$ = this.unreadNotificationsSubject.asObservable();

  constructor(private notificationService: NotificationService) {}

  fetchUnreadNotifications(userId: string): void {
    this.notificationService.getNumberOfUnreadNotificationsById(userId).subscribe(
      unreadCount => this.unreadNotificationsSubject.next(unreadCount)
    );
  }
}